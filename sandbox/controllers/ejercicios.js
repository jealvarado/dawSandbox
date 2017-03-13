'use strict'

var Ejercicio = require('../models/ejercicios');

function getEjercicio (req,res) {
	let ejercicioId = req.params.ejercicioId

	Ejercicio.findById(ejercicioId, (err, ejercicio) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!ejercicio)
			return res.status(404).send({ message: `No existe el ejercicio`})

		res.status(200).send({ ejercicio })
	})
}

/*
function getEjercicios (req,res) {
	Usuario.find({}, (err, usuarios) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!usuarios)
			return res.status(404).send({ message: `No existen usuarios`})

		res.send(200, { usuarios })
	})
}
*/

function saveEjercicio (req,res) {
	console.log('POST /api/ejercicios/')
	console.log(req.body)

	let ejercicio = new Ejercicio()
	ejercicio.idUsuario = req.body.idUsuario,
	ejercicio.titulo = req.body.titulo,
	ejercicio.descripcion = req.body.descripcion,
	ejercicio.datosEntrada = req.body.datosEntrada,
	ejercicio.datosSalida = req.body.datosSalida,
	ejercicio.etiquetas = req.body.etiquetas,
	ejercicio.nivel = req.body.nivel

	ejercicio.save( (err, ejercicioStored) => {
		if (err)
			res.status(500).send({ message: `Error al grabar en la base de datos: ${err}`})

		res.status(200).send({ ejercicio: ejercicioStored })
	})
}


function updateEjercicio (req,res) {
	let ejercicioId = req.params.ejercicioId
	let update = req.body

	Ejercicio.findByIdAndUpdate( ejercicioId, update, (err, ejercicioUpdate) => {
		if (err)
			res.status(500).send({ message: `Error al actualizar el ejercicio: ${err}`})

		res.status(200).send({ ejercicio: ejercicioUpdate })
	})
}


function deleteEjercicio (req,res) {
	let ejercicioId = req.params.ejercicioId

	Ejercicio.findById(ejercicioId, (err, ejercicio) => {
		if (err)
			res.status(500).send({ message: `Error al eliminar el ejercicio: ${err}` })

		ejercicio.remove( err => {
			if (err)
				res.status(200).send({ message: `Error al borrar el ejercicio: ${err}` })

			res.status(200).send({ message: 'El ejercicio ha sido eliminado'})
		})
	})
}


module.exports = {
	getEjercicio,
	saveEjercicio,
	updateEjercicio,
	deleteEjercicio
}