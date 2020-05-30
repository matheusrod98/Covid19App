from django.urls import path, include
from .views import *
from api import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path ('postagens/', PostagemList.as_view ()),
    path ('postagens/<int:id>/', PostagemDetail.as_view ()),
    path ('comentarios/', ComentarioList.as_view()),
    path ('postagens/<int:id>/comentarios/', PostagemComentarioDetail.as_view ())
]+static (settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
