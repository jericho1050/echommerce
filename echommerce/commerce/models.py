from django.db import models
from echommerce.users.models import User


# Create your models here.
class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    auction = models.ForeignKey('Auction', on_delete=models.CASCADE)

class Category(models.Model):
    category = models.CharField(max_length=250)

    def __str__(self):
        return self.category
    
class Auction(models.Model):
    title = models.CharField(max_length=120)
    image = models.ImageField(upload_to='images/', height_field=None, width_field=None, null=True, blank=True)
    description = models.TextField()
    starting_price = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    listed_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="auction_listed")
    active = models.BooleanField(default=True)
    winner = models.ForeignKey(User, null=True, blank=True,on_delete=models.CASCADE, related_name="auctions_won")
    created = models.DateTimeField(auto_now_add=True)
    listed_on = models.DateField(auto_now_add=True)
    categories = models.ManyToManyField(Category, blank=True)

    def __str__(self):
        return f"Title: {self.title} Listed by:{self.listed_by} Price:{self.starting_price}"
    
class Bids(models.Model):
    bid_amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Bid Amount $")
    bid_date = models.DateField(auto_now_add=True)
    bid_by = models.ForeignKey(User, on_delete=models.CASCADE)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)

    def __str__(self):
        return f"Bid Amount: {self.bid_amount} Bid By: {self.bid_by} Auction: {self.auction}"


class Comments(models.Model):
    comment_text = models.TextField(verbose_name="", blank=True)
    comment_date = models.DateField(auto_now_add=True)
    comment_by = models.ForeignKey(User, on_delete=models.CASCADE)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)

    def __str__(self):
        return f"Comment: {self.comment_text} Comment By: {self.comment_by} Auction: {self.auction}"
    
    

class Product(models.Model):
    name = models.CharField(max_length=120)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products")

    def __str__(self):
        return f"Product: {self.name} Seller: {self.seller} Price: {self.price} Quantity: {self.quantity}"

class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    quantity = models.PositiveIntegerField()
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order: {self.product.name} Buyer: {self.buyer} Quantity: {self.quantity} Date: {self.order_date}"