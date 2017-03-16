'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CursosSchema = Schema({
	profesor: {
		type: String, 
		required: "El profesor es obligatorio"
	},
	paralelo: {
		type: String, 
		maxlength: [2, "Maximo 2 caracteres"], 
		required: "El paralelo es obligatorio"
	}
})

module.exports = mongoose.model('Cursos', CursosSchema)