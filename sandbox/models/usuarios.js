'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsuariosSchema = Schema({
	nombre: String,
	apellido: String,
	tipoIdent: { type: String, enum: ['cedula','matricula'] },
	ident: String,
	carrera: String,
	correo: String,
	contrasena: String,
	rol: { type: String, enum: ['Administrador','Profesor','Ayudante','Estudiante'] }
})

mongoose.model('Usuarios', UsuariosSchema)