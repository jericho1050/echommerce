from rest_framework import serializers
from .models import Watchlist, Category, Auction, Bids, Comments, Order, Product

class WatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ['user', 'auction']
        read_only_fields = ['user']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category']
        read_only_fields = ['id']

class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = [
            'id', 'title', 'image', 'description', 'starting_price', 'listed_by', 
            'active', 'winner', 'created', 'listed_on', 'categories'
        ]
        read_only_fields = ['id', 'listed_by', 'created', 'listed_on']

class BidsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bids
        fields = ['id', 'bid_amount', 'bid_date', 'bid_by', 'auction']
        read_only_fields = ['id', 'bid_date', 'bid_by']

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id', 'comment_text', 'comment_date', 'comment_by', 'auction']
        read_only_fields = ['id', 'comment_date', 'comment_by']
        
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'quantity', 'seller']
        read_only_fields = ['id', 'seller']
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'product', 'quantity', 'order_date', 'buyer']
        read_only_fields = ['id', 'order_date', 'buyer']