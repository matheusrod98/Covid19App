# Generated by Django 3.0.6 on 2020-05-28 19:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='postagem',
            name='imagem',
            field=models.ImageField(blank=True, null=True, upload_to='fotos'),
        ),
    ]
