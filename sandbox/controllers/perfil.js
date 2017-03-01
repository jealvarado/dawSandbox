'use strict'

var Perfil = require('../models/perfil');

function getPerfil (req,res) {
	let perfilId = req.params.perfilId

	Perfil.findById(usuarioId, (err, perfil) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!perfil)
			return res.status(404).send({ message: `No existe el perfil`})

		res.status(200).send({ perfil })
	})
}



function savePerfil (req,res) {
	console.log('POST /api/perfil/')
	console.log(req.body)

	let perfil = new Perfil()
	perfil.idEstudiante = req.body.idEstudiante,
	perfil.insignia= req.body.insignia,
	perfil.insigniaSema = req.body.insigniaSema,
	perfil.ejFacil = req.body.ejFacil,
	perfil.ejIntermedio = req.body.ejIntermedio,
	perfil.ejDificil = req.body.ejDificil,
	perfil.resuelto = req.body.resuelto,

	perfil.save( (err, perfilStored) => {
		if (err)
			res.status(500).send({ message: `Error al grabar en la base de datos: ${err}`})

		res.status(200).send({ perfil: perfilStored })
	})
}


function updatePerfil (req,res) {
	let perfilId = req.params.perfilId
	let update = req.body

	Perfil.findByIdAndUpdate( perfilId, update, (err, perfilUpdate) => {
		if (err)
			res.status(500).send({ message: `Error al actualizar el perfil: ${err}`})

		res.status(200).send({ perfil: perfilUpdate })
	})
}


function deletePerfil (req,res) {
	let perfilId = req.params.perfilId

	Perfil.findById(perfilId, (err, perfil) => {
		if (err)
			res.status(500).send({ message: `Error al eliminar el perfil: ${err}` })

		perfil.remove( err => {
			if (err)
				res.status(200).send({ message: `Error al borrar el perfil: ${err}` })

			res.status(200).send({ message: 'El perfil ha sido eliminado'})
		})
	})
}


module.exports = {
	getPerfil,
	savePerfil,
	updatePerfil,
	deletePerfil
}