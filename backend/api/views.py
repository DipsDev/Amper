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
            container = client.containers.get(kwargs.get("container_id"))
            return Response(container.attrs, status=status.HTTP_200_OK)
        except derrors.NotFound as e:
            return Response({
                "message": "Couldn't find container"
            }, status=status.HTTP_404_NOT_FOUND)
            
    def post(self, request, *args, **kwargs):
        '''

        Change status of a container     
        '''
        # Handle if not supplied action
        if ("action" not in request.data):
            return Response({"message": "Missing `action` param"},status=status.HTTP_400_BAD_REQUEST)
        
        # Validate the handle is valid
        action = request.data.get("action")
        if (action not in ["restart", "start", "stop"]):
            return Response({"message": "Invalid `action` param"},status=status.HTTP_400_BAD_REQUEST)
        
        container_id = kwargs.get("container_id")

        try:
            container = client.containers.get(container_id)
        except derrors.NotFound as e:
            return Response({
                "message": "Couldn't find container"
            }, status=status.HTTP_404_NOT_FOUND)
        

        # Handles actions accordingly
        try:
            if (action == "start"):
                container.start()
            elif (action == "stop"):
                container.stop()
            else:
                container.restart()
        except:
            return Response({ "message": "Error performing action"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            return Response(container.attrs, status=status.HTTP_200_OK)         
            
        
        
        
        