'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResueltoSchema = Schema({
	idUsuario: {type: String, required: true},
	idEjercicio: {type: String, required: true},
	fecha: {type: String, required: true}
})

module.exports = mongoose.model('resuelto', ResueltoSchema)