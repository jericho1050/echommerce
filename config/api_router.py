from django.conf import settings
from rest_framework.routers import DefaultRouter
from rest_framework.routers import SimpleRouter

from echommerce.users.api.views import UserViewSet
from echommerce.commerce.views import WatchlistViewSet, CategoryViewSet, AuctionViewSet, BidsViewSet, CommentsViewSet, ProductViewSet, OrderViewSet

router = DefaultRouter() if settings.DEBUG else SimpleRouter()

router.register("users", UserViewSet)
router.register("watchlists", WatchlistViewSet)
router.register("categories", CategoryViewSet)
router.register("auctions", AuctionViewSet)
router.register("bids", BidsViewSet)
router.register("comments", CommentsViewSet)
router.register("products", ProductViewSet)
router.register("orders", OrderViewSet)

app_name = "api"
urlpatterns = router.urls