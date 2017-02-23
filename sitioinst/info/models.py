from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Ayudante(models.model):
	nombres: models.CharField(max_length=50)
	apellidos: models.CharField(max_length=50)
	correo: models.EmailField()
	paralelo: models.IntegerField()
	aula: models.CharField(max_length=10)
	horario: models.CharField(max_length=50)

class AyudanteTareas(models.model):
	nombres: models.CharField(max_length=50)
	apellidos: models.CharField(max_length=50)
	correo: models.EmailField()
	paralelo: models.IntegerField()
	aula: models.CharField(max_length=10)
	horario: models.CharField(max_length=50)

class Ayudantia(models.model):
	LUNES = 'LUN'
	MARTES = 'MAR'
	MIERCOLES = 'MIE'
	JUEVES = 'JUE'
	VIERNES = 'VIE'
	DIA_CHOICES = (
		(LUNES, 'Lunes'),
		(MARTES, 'Martes'),
		(MIERCOLES, 'Miercoles'),
		(JUEVES, 'Jueves'),
		(VIERNES, 'Viernes')
		)
	dia = models.CharField(
		max_length=3,
		choices=DIA_CHOICES)
	horaInicio: models.TimeField()
    horaFin: models.TimeField()
    ayudante: Ayudante()
    aula: models.CharField(max_length=10)
    edificio: models.CharField(max_length=10)
    mapa: models.URLField()

class Profesor(models.model):
	nombres: models.CharField(max_length=50)
	apellidos: models.CharField(max_length=50)
	correo: models.EmailField()
	paralelo: models.IntegerField()
	oficina: models.CharField(max_length=20)
	coordinador: models.BooleanField()
	img: models.URLField()

class Clase(models.model):
	parcial: models.IntegerField()
	semana: modelas.IntegerField()
	clase: models.IntegerField()	
	tema: models.CharField(max_length=50)
	descripcion: models.CharField(max_length=50)
	video: models.BooleanField()
	linkVideo: models.URLField()
	diapositiva: models.BooleanField()
	linkDiapositiva: models.FileField()
	lectura: models.BooleanField()
	linkLectura: models.FileField()
	linkCap: models.FileField()
	controlLectura: models.BooleanField()
	leccion: models.BooleanField()
	taller: models.BooleanField()
	deber: models.BooleanField()
	proyecto: models.BooleanField()
		
