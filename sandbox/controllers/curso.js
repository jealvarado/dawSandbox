'use strict'

var Curso = require('../models/cursos');

function getCurso (req,res) {
	let cursoId = req.params.cursoId

	Curso.findById(cursoId, (err, curso) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!curso)
			return res.status(404).send({ message: `No existe el curso`})

		res.status(200).send({ curso })
	})
}


function getCursos (req,res) {
	Curso.find({}, (err, cursos) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!cursos)
			return res.status(404).send({ message: `No existen cursos`})

		res.status(200).send({ cursos })
	})
}


function saveCurso (req,res) {
	console.log('POST /api/cursos/')
	console.log(req.body)

	let curso = new Curso()
	curso.profesor = req.body.profesor,
	curso.paralelo= req.body.paralelo
	
	curso.save( (err, cursoStored) => {
		if (err)
			res.status(500).send({ message: `Error al grabar en la base de datos: ${err}`})

		res.status(200).send({ curso: cursoStored })
	})
}


function updateCurso (req,res) {
	let cursoId = req.params.cursoId
	let update = req.body

	Curso.findByIdAndUpdate( cursoId, update, (err, cursoUpdate) => {
		if (err)
			res.status(500).send({ message: `Error al actualizar el curso: ${err}`})

		res.status(200).send({ curso: cursoUpdate })
	})
}


function deleteCurso (req,res) {
	let cursoId = req.params.cursoId

	Curso.findById(cursoId, (err, curso) => {
		if (err)
			res.status(500).send({ message: `Error al eliminar el curso: ${err}` })

		curso.remove( err => {
			if (err)
				res.status(200).send({ message: `Error al borrar el curso: ${err}` })

			res.status(200).send({ message: 'El curso ha sido eliminado'})
		})
	})
}


module.exports = {
	getCurso,
	getCursos,
	saveCurso,
	updateCurso,
	deleteCurso
}