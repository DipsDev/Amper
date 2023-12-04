from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import docker
import docker.errors as derrors

# Create your views here.
client = docker.from_env()

class Containers(APIView):
    def get(self, request):
        '''

        Get all avaliable containers
        '''

        containers = client.containers.list(all=True)
        return Response([c.attrs for c in containers], status=status.HTTP_200_OK)


class Container(APIView):
    def get(self, request, *args, **kwargs):
        '''

        Get specific container info
        '''
        try:
            container = client.containers.get(kwargs.get("container_id"));
            return Response(container.attrs, status=status.HTTP_200_OK)
        except derrors.NotFound as e:
            return Response(status=status.HTTP_404_NOT_FOUND)
            
        