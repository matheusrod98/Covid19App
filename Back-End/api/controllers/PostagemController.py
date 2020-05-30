from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from api.models import *
from api.serializers import *
from rest_framework import status

class PostagemList (APIView):
    def get (self, request):
        postagem = Postagem.objects.all ()
        data = PostagemSerializer (postagem, many=True).data

        return Response (data)

    def post (self, request):
        '''
        usuario = request.data ['usuario']
        titulo = request.data ['titulo']
        texto = request.data ['texto']
        postagem = Postagem (usuario = usuario, titulo = titulo, texto = texto)
        postagem.save ()
        serializer = PostagemSerializer (postagem).data
        '''
        serializer = PostagemSerializer (data = request.data)
        serializer.is_valid (raise_exception=True)
        serializer.save ()

        return Response (serializer.data)

class PostagemDetail (APIView):
    def get (self, request, id):
        postagem = get_object_or_404 (Postagem, id = id)
        serializer = PostagemSerializer (postagem).data
        return Response (serializer)
