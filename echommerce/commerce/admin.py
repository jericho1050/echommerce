from django.contrib import admin
from .models import Watchlist, Category, Auction, Bids, Comments, Product, Order

# Register your models here.
admin.site.register(Watchlist)
admin.site.register(Category)
admin.site.register(Auction)
admin.site.register(Bids)
admin.site.register(Comments)
admin.site.register(Product)
admin.site.register(Order)