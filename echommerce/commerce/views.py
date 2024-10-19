import os
import logging
import json
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from paypalserversdk.paypalserversdk_client import PaypalserversdkClient
from paypalserversdk.http.auth.o_auth_2 import ClientCredentialsAuthCredentials
from paypalserversdk.logging.configuration.api_logging_configuration import (
    LoggingConfiguration,
    RequestLoggingConfiguration,
    ResponseLoggingConfiguration,
)
from paypalserversdk.paypalserversdk_client import PaypalserversdkClient
from paypalserversdk.controllers.orders_controller import OrdersController
from paypalserversdk.controllers.payments_controller import PaymentsController
from paypalserversdk.models.amount_with_breakdown import AmountWithBreakdown
from paypalserversdk.models.checkout_payment_intent import CheckoutPaymentIntent
from paypalserversdk.models.order_request import OrderRequest
from paypalserversdk.models.purchase_unit_request import PurchaseUnitRequest
from paypalserversdk.api_helper import ApiHelper

from .models import Watchlist, Category, Auction, Bids, Comments, Order, Product
from .serializers import (
    WatchlistSerializer,
    CategorySerializer,
    AuctionSerializer,
    BidsSerializer,
    CommentsSerializer,
    ProductSerializer,
    OrderSerializer,
)
from .permissions import IsSeller, IsShopper

from config.settings.base import PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET

logging.info("PAYPAL_CLIENT_ID: %s", PAYPAL_CLIENT_ID)
logging.info("PAYPAL_CLIENT_SECRET: %s", PAYPAL_CLIENT_SECRET)

# PayPal SDK client
paypal_client: PaypalserversdkClient = PaypalserversdkClient(
    client_credentials_auth_credentials=ClientCredentialsAuthCredentials(
        o_auth_client_id=PAYPAL_CLIENT_ID, o_auth_client_secret=PAYPAL_CLIENT_SECRET
    ),
    logging_configuration=LoggingConfiguration(
        log_level=logging.INFO,
        # Disable masking of sensitive headers for Sandbox testing.
        # This should be set to True (the default if unset)in production.
        mask_sensitive_headers=False,
        request_logging_config=RequestLoggingConfiguration(
            log_headers=True, log_body=True
        ),
        response_logging_config=ResponseLoggingConfiguration(
            log_headers=True, log_body=True
        ),
    ),
)
orders_controller: OrdersController = paypal_client.orders
payments_controller: PaymentsController = paypal_client.payments


class WatchlistViewSet(viewsets.ModelViewSet):
    queryset = Watchlist.objects.all()
    serializer_class = WatchlistSerializer
    permission_classes = [IsAuthenticated, IsShopper]


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class AuctionViewSet(viewsets.ModelViewSet):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer
    permission_classes = [IsAuthenticated, IsSeller]


class BidsViewSet(viewsets.ModelViewSet):
    queryset = Bids.objects.all()
    serializer_class = BidsSerializer
    permission_classes = [IsAuthenticated, IsShopper]


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated, IsShopper]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticated(), IsSeller()]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == "seller":
            return Product.objects.filter(seller=user)
        return Product.objects.all()


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            return [AllowAny()]
        return [IsAuthenticated(), IsShopper()]

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.role == "shopper":
            return Order.objects.filter(
                buyer=self.request.user
            )  # shopper can see all their orders
        return Order.objects.filter(
            product__seller=self.request.user
        )  # seller can see all orders for their products

    def create(self, request):
        order_data = request.data.get("order", {})
        total_price = int(order_data["quantity"]) * float(order_data["price"])
        product = get_object_or_404(Product, id=order_data["id"])

        try:
            order = orders_controller.orders_create({
            "body": OrderRequest(
                intent=CheckoutPaymentIntent.CAPTURE,
                purchase_units=[
                PurchaseUnitRequest(
                    AmountWithBreakdown(
                        currency_code='USD',
                        value=total_price
                    ) 
                )
                ]
            ),
            "prefer": 'return=representation'
            }
            )
            if order.status_code != 201:
                return Response(
                    {"error": "Order creation failed"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        
            order_data["order_id"] = order.body.id
            order_data["product"] = product.id
            order_data["total_price"] = total_price
            order_data["payment_status"] = "pending"
            serializer = self.get_serializer(data=order_data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                ApiHelper.json_serialize(order.body),
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["post"])
    def capture(self, request, pk=None):
        order_id = pk
        try:
            paypal_order = orders_controller.orders_capture(
                {"id": order_id, "prefer": "return=representation"}
            )

            if paypal_order.body.status == "COMPLETED":
                delivery_address = paypal_order.body.purchase_units[0].shipping.address
                
                id = request.data.get("productId", ())
                product = get_object_or_404(Product, id=id)
                order_obj = get_object_or_404(
                    Order, product=product, buyer=request.user, order_id=order_id
                )
                order_obj.delivery_address = delivery_address
                order_obj.payment_status = "completed"
                order_obj.save()
                return Response(
                    ApiHelper.json_serialize(paypal_order.body),
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Payment not completed"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
