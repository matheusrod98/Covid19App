from django.db import models

class Postagem (models.Model):
    usuario = models.TextField ()
    titulo = models.TextField ()
    texto = models.TextField ()
    imagem = models.ImageField (blank = True, null=True, upload_to = 'fotos')
