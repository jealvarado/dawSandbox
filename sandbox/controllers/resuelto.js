'use strict'

var Resuelto = require('../models/resuelto');

function getResuelto (req,res) {
	let resueltoId = req.params.resueltoId

	Resuelto.findById(resueltoId, (err, resuelto) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!resuelto)
			return res.status(404).send({ message: `No existe el Ej. resuelto`})

		res.status(200).send({ resuelto })
	})
}


function getResueltos (req,res) {
	Resuelto.find({}, (err, resueltos) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!resueltos)
			return res.status(404).send({ message: `No existen Ej. resueltos`})

		res.status(200).send({ resueltos })
	})
}


function saveResuelto (req,res) {
	console.log('POST /api/resuelto/')
	console.log(req.body)

	let resuelto = new Resuelto()
	resuelto.idUsuario = req.body.idUsuario,
	resuelto.idEjercicio = req.body.idEjercicio,
	resuelto.Fecha = req.body.Fecha
	
	resuelto.save( (err, resueltoStored) => {
		if (err)
			res.status(500).send({ message: `Error al grabar en la base de datos: ${err}`})

		res.status(200).send({ resuelto: resueltoStored })
	})
}


function updateResuelto (req,res) {
	let resueltoId = req.params.resueltoId
	let update = req.body

	Resuelto.findByIdAndUpdate( resultadoId, update, (err, resultoUpdate) => {
		if (err)
			res.status(500).send({ message: `Error al actualizar el Ej. resuelto: ${err}`})

		res.status(200).send({ resultado: resueltoUpdate })
	})
}


function deleteResuelto (req,res) {
	let resueltoId = req.params.resueltoId

	Resuelto.findById(resueltoId, (err, resuelto) => {
		if (err)
			res.status(500).send({ message: `Error al eliminar el Ej. resuelto: ${err}` })

		resuelto.remove( err => {
			if (err)
				res.status(404).send({ message: `Error al borrar el Ej. resuelto: ${err}` })

			res.status(200).send({ message: 'El Ej. resuelto ha sido eliminado'})
		})
	})
}


module.exports = {
	getResuelto,
	getResueltos,
	saveResuelto,
	updateResuelto,
	deleteResuelto
}