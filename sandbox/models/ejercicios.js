'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EjerciciosSchema = Schema({
	idEjercicio: {type: Number, required: true},
	titulo: {type: String, required: true},
	descripcion: {type: String, required: true},
	datosEntrada: {type: String, required: true},
	datosSalida: {type: String, required: true},
	etiquetas: {type: String, required: true},
	nivel: {type: String, enum: ['Facil','Intermedio','Dificil']}
})

module.exports = mongoose.model('ejercicios', UsuarioSchema)