# your_app/pagination.py
from rest_framework.pagination import PageNumberPagination

class PageNumberWithPageSizePagination(PageNumberPagination):
    page_size_query_param = 'page_size'