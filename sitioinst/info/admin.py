from django.contrib import admin

# Register your models here.

from .models import  Ayudante, AyudanteTareas, Ayudantia, Profesor, Clase, Seccion, Requisito, CoRequisito

admin.site.register(Ayudante)
admin.site.register(Ayudantia)
admin.site.register(AyudanteTareas)
admin.site.register(Profesor)
admin.site.register(Clase)
admin.site.register(Seccion)
admin.site.register(Requisito)
admin.site.register(CoRequisito)
