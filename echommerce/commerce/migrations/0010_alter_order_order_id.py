# Generated by Django 5.0.9 on 2024-10-19 04:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerce', '0009_remove_order_unique_order_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='order_id',
            field=models.TextField(primary_key=True, serialize=False, unique=True),
        ),
    ]
