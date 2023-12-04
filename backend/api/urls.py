from django.urls import path
from .views import Containers, Container


urlpatterns = [
    path('containers', Containers.as_view()),
    path('container/<slug:container_id>', Container.as_view(), name="container-details")
]