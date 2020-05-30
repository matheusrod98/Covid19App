from rest_framework import serializers
from .models import *
from .views import *

class PostagemSerializer (serializers.ModelSerializer):
    class Meta:
        model = Postagem
        fields = '__all__'

class ComentarioSerializer (serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'

class PostagemComentarioSerializer (serializers.ModelSerializer):
    comentarios = ComentarioSerializer (many = True, read_only = True)
    class Meta:
        model = Postagem
        fields = '__all__'
