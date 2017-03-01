'use strict'

var Usuario = require('../models/usuarios');

function getUsuario (req,res) {
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId, (err, usuario) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!usuario)
			return res.status(404).send({ message: `No existe el usuario`})

		res.status(200).send({ usuario })
	})
}


function getUsuarios (req,res) {
	Usuario.find({}, (err, usuarios) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!usuarios)
			return res.status(404).send({ message: `No existen usuarios`})

		res.status(200).send({ usuarios })
	})
}


function saveUsuario (req,res) {
	console.log('POST /api/usuario/')
	console.log(req.body)

	let usuario = new Usuario()
	usuario.nombre = req.body.nombre,
	usuario.apellido = req.body.apellido,
	usuario.tipoIdent = req.body.tipoIdent,
	usuario.ident = req.body.ident,
	usuario.carrera = req.body.carrera,
	usuario.correo = req.body.correo,
	usuario.contrasena = req.body.contrasena,
	usuario.rol = req.body.rol

	usuario.save( (err, usuarioStored) => {
		if (err)
			res.status(500).send({ message: `Error al grabar en la base de datos: ${err}`})

		res.status(200).send({ usuario: usuarioStored })
	})
}


function updateUsuario (req,res) {
	let usuarioId = req.params.usuarioId
	let update = req.body

	Usuario.findByIdAndUpdate( usuarioId, update, (err, usuarioUpdate) => {
		if (err)
			res.status(500).send({ message: `Error al actualizar el usuario: ${err}`})

		res.status(200).send({ usuario: usuarioUpdate })
	})
}


function deleteUsuario (req,res) {
	let usuarioId = req.params.usuarioId

	Usuario.findById(usuarioId, (err, usuario) => {
		if (err)
			res.status(500).send({ message: `Error al eliminar el usuario: ${err}` })

		usuario.remove( err => {
			if (err)
				res.status(404).send({ message: `Error al borrar el usuario: ${err}` })

			res.status(200).send({ message: 'El usuario ha sido eliminado'})
		})
	})
}


module.exports = {
	getUsuario,
	getUsuarios,
	saveUsuario,
	updateUsuario,
	deleteUsuario
}