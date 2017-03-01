'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CursosSchema = Schema({
	profesor: {type: String, required: true},
	paralelo: {type: String, required: true},
	estudiantes: {type: Array}
})

mongoose.model('Cursos', CursosSchema)