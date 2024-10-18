from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import generics
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from echommerce.users.models import User
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from .serializers import UserSerializer, RegisterSerializer, CustomAuthTokenSerializer


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    
    def get_permissions(self):
        if self.action == "list" or self.action == "retrieve":
            return [AllowAny()]
        return super().get_permissions() 


    # new route to get the current user details at /users/me/
    @action(detail=False)
    def me(self, request):
        serializer = UserSerializer(request.user)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        token, created = Token.objects.get_or_create(user=serializer.instance)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "token": token.key,
                "user_id": serializer.instance.pk,
                "email": serializer.instance.email,
                "role": serializer.instance.role,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class CustomAuthToken(ObtainAuthToken):
    serializer_class = CustomAuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "token": token.key,
                "user_id": user.pk,
                "email": user.email,
                "role": user.role,
            }

        )