# Generated by Django 5.0.9 on 2024-10-17 22:01

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("commerce", "0005_order_total_price"),
    ]

    operations = [
        migrations.AddField(
            model_name="product",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="products/"),
        ),
        migrations.AlterField(
            model_name="auction",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="auction/"),
        ),
    ]
