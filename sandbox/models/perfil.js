'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PerfilSchema = Schema({
	idestudiante: {type: String, required: true},
	insignia: {type: String, enum: ['Novato','Pro','Experto']},
	insigniaSema: {type: String, enum: ['Indestructible','Duro de Matar','Rapido y Furioso']},
	ejFacil: {type: Number, required: true},
	ejIntermedio: {type: Number, required: true},
	ejDificil: {type: Number, required: true},
	resueltos: {type: Array}
})

module.exports = mongoose.model('Perfil', PerfilSchema)