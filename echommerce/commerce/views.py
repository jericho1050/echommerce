from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Watchlist, Category, Auction, Bids, Comments, Order, Product
from .serializers import WatchlistSerializer, CategorySerializer, AuctionSerializer, BidsSerializer, CommentsSerializer, ProductSerializer, OrderSerializer
from .permissions import IsSeller, IsShopper
from rest_framework.permissions import AllowAny
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
        if user.is_authenticated and user.role == 'seller':
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
        if self.request.user.is_authenticated and self.request.user.role == 'shopper':
            return Order.objects.filter(user=self.request.user) # shopper can see all their orders
        return Order.objects.filter(product__seller=self.request.user) # seller can see all orders for their products

    
    