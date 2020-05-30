from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from api.models import *
from api.serializers import *
from rest_framework import status

class ComentarioList (APIView):
    def post (self, request):
        '''
        postagem_id = request.data [postagem_id]
        postagem = get_object_or_404 (Postagem, id = postagem_id)
        texto = request.data ['texto']
        usuario = request.data ['usuario']
        comentario = Comentario (postagem = postagem, texto = texto, usuario = usuario)
        comentario.save ()
        serializer = ComentarioSerializer (comentario).data

        return Response (serializer)
        '''

        serializer = ComentarioSerializer (data = request.data)
        serializer.is_valid (raise_exception = True)
        serializer.save ()
        return Response (serializer.data)

    def get (self, request):
        comentarios = Comentario.objects.all ()
        data = ComentarioSerializer (comentarios, many = True).data

        return Response (data)

class PostagemComentarioDetail (APIView):
    def get (self, request, id):
        postagem = get_object_or_404 (Postagem, id = id)
        serializer = PostagemComentarioSerializer (postagem).data

        return Response (serializer)
