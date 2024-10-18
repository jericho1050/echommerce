import pytest

from echommerce.users.models import User


@pytest.fixture(autouse=True)
def _media_storage(settings, tmpdir) -> None:
    settings.MEDIA_ROOT = tmpdir.strpath


# @pytest.fixture
# def user(db) -> User:
#     return UserFactory()
