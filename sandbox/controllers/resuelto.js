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
	res.header('Access-Control-Allow-Origin', '*');
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
	resuelto.idUsuario = req.body.idUsuario;
	resuelto.idEjercicio = req.body.idEjercicio;
	resuelto.fecha = new Date("<" + req.body.Fecha + ">").toISOString();

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

function resueltosPorFecha(req, res) {

	var fechaInicio = new Date("<" + req.body.fechaInicio + ">").toISOString();
	var fechaFin = new Date("<" + req.body.fechaFin + ">").toISOString();

	Resuelto.find({ $and: [ {fecha: {$gte: fechaInicio}}, {fecha: {$lte: fechaFin}} ]}, (err, resueltos) => {
		if (err) {
			console.log("error");
			res.send("error");
		} else {
			var groupBy = function (miarray, prop) {
			    return miarray.reduce(function(groups, item) {
			        var val = item[prop];
			        groups[val] = groups[val] || {fecha: item.fecha, ejercicios: 0};
			        groups[val].ejercicios ++;
			        return groups;
			    }, {});
			}
			var datos = groupBy(resueltos, 'fecha');
			var data = {data:[]};
			for (var key in datos) {
				data.data.push(datos[key]);
			}
			res.json(data);
		}
	})
}


module.exports = {
	getResuelto,
	getResueltos,
	saveResuelto,
	updateResuelto,
	deleteResuelto,
	resueltosPorFecha
}
