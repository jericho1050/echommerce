from django.test import TestCase
from echommerce.users.models import User
from echommerce.commerce.models import Product, Order
from django.core.exceptions import ValidationError

class OrderTestCase(TestCase):

    def setUp(self):
        # Create a shopper user
        self.shopper_user = User.objects.create(username="shopper", role="shopper")
        # Create a non-shopper user
        self.non_shopper_user = User.objects.create(username="non_shopper", role="non_shopper")
        # Create a product
        self.product = Product.objects.create(name="Test Product", description="Test Description", price=10.00, quantity=10, seller=self.shopper_user)

    def test_order_creation_by_shopper(self):
        order = Order(product=self.product, buyer=self.shopper_user, quantity=2)
        order.save()
        self.product.refresh_from_db()
        self.assertEqual(self.product.quantity, 8)

    def test_order_creation_by_non_shopper(self):
        order = Order(product=self.product, buyer=self.non_shopper_user, quantity=2)
        with self.assertRaisesMessage(ValidationError, "Only users with the role 'shopper' can place orders."):
            order.clean()

    def test_order_creation_insufficient_quantity(self):
        order = Order(product=self.product, buyer=self.shopper_user, quantity=20)
        with self.assertRaisesMessage(ValidationError, "Not enough stock available."):
            order.save()