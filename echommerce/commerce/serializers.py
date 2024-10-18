from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import Watchlist, Category, Auction, Bids, Comments, Order, Product


class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ["user", "auction"]
        read_only_fields = ["user"]

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["user"] = request.user
        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "category"]
        read_only_fields = ["id"]


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = [
            "id",
            "title",
            "image",
            "description",
            "starting_price",
            "listed_by",
            "active",
            "winner",
            "created",
            "listed_on",
            "categories",
        ]
        read_only_fields = ["id", "listed_by", "created", "listed_on"]

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["listed_by"] = request.user
        return super().create(validated_data)


class BidsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bids
        fields = ["id", "bid_amount", "bid_date", "bid_by", "auction"]
        read_only_fields = ["id", "bid_date", "bid_by"]

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["bid_by"] = request.user
        return super().create(validated_data)


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["id", "comment_text", "comment_date", "comment_by", "auction"]
        read_only_fields = ["id", "comment_date", "comment_by"]

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["comment_by"] = request.user
        return super().create(validated_data)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "description", "price", "quantity", "seller", "image"]
        read_only_fields = ["id", "seller"]

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["seller"] = request.user
        return super().create(validated_data)


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields =  "__all__"
        read_only_fields = ["id", "order_date", "buyer"]

    def create(self, validated_data):
        request = self.context.get("request")
        validated_data["buyer"] = request.user
        product = validated_data["product"]
        order_quantity = validated_data["quantity"]  # Fix typo here

        if product.quantity < order_quantity:
            raise ValidationError("Not enough stock available.")

        product.quantity -= order_quantity
        product.save()

        return super().create(validated_data)
