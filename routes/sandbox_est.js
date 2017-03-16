'use strict'
var express = require ('express');
var router = express.Router();
var fs = require('fs');
var PythonShell = require('python-shell');

var Ejercicio = require('../models/ejercicios');
var Resuelto = require('../models/resuelto');
var Perfil = require('../models/perfil');


/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user) {
		res.render('sandbox_est', { title: 'Ejercicios Estudiantes' });
	}
	else{
		res.redirect('/');
	}
});


router.get('/ejercicio', function(req, res, next) {
	if (req.user) {
		res.render('sandbox_estd2', { title: 'Ejercicios Estudiantes' });
	}else{
		res.redirect('/');
	}
});

router.post('/ejercicio', function (req, res, next) {
	if (req.files){
		//console.log(req.files)
		if (req.files.pyFile){
			console.log("File found");      
			let pf = req.files.pyFile;
			var ruta="uploads/temp/"+pf.name;
			console.log(pf);
			pf.mv(ruta);			
			console.log(pf.name);
			console.log(req.body.idEjercicio);			
			Ejercicio.findOne({_id:req.body.idEjercicio}, function (err, ejer) {
				if(err){
					res.status(500).send("Error al buscar Ejercicio");
				}
				console.log("nivel "+ ejer.nivel + " .");
				var entradas=ejer.datosEntrada.split(",");
				var salidas=ejer.datosSalida.split(",");
				var options = {
					mode: 'text',
					args: entradas
				};
				PythonShell.run(ruta, options, function(err, results) {
					if (err) {
						fs.unlinkSync(ruta);						
						return res.status(200).json({'estado': false, mensaje: "Hay errores en el código del archivo"});
					}
					console.log("Codigo ejecutado");
					console.log(results);
					fs.unlinkSync(ruta);
					if(results != null && results != "" && results != undefined){
						if(salidas.length==results.length){
							var formatted=[]
							results.forEach(function(r) {
								formatted.push(r.split("\r")[0]);
								console.log(r);
							})
							console.log(formatted);
							for (var i = salidas.length - 1; i >= 0; i--) {
								if(salidas[i]!=formatted[i]){
									return res.status(200).json({'estado': false, mensaje: "Valores de salida no coinciden ", esperado:salidas[i], recibido:results[i]});
								}
							}
							if (req.user) {
								console.log(req.user.id);
								console.log(req.user.rol);
								if (req.user.rol=="Estudiante") {
									console.log(req.user.rol);
									let resuelto = new Resuelto();
									resuelto.idUsuario = req.user._id;
									resuelto.idEjercicio = req.body.idEjercicio;
									resuelto.fecha = new Date().toISOString();
									resuelto.save( (err, resueltoStored) => {
										if (err)
											return res.status(500).send({ message: `Error al grabar en la base de datos: ${err}`});
										Perfil.findOne({idestudiante:req.user.id}, function (err, per) {
											if (err) {
												return res.status(500).send({ message: `Error al buscar Perfil de Usuario: ${err}`});
											}											
											if (ejer.nivel=='Facil') {
												console.log("Facil")
												console.log(per.ejFacil)
												per.ejFacil=per.ejFacil+1;
											}else if (ejer.nivel=='Intermedio') {
												console.log("Intermedio")
												per.ejIntermedio=per.ejIntermedio+1;
											}
											else{
												console.log("Intermedio")
												per.ejDificil=per.ejDificil+1;
											}
											per.save(function (err, updatedPerfil) {
												if (err) {
													return res.status(500).send({ mensaje: `Error al grabar en la base de datos: ${err}`});
												}
												console.log(updatedPerfil);
												return res.status(200).send({'estado': true, mensaje: "Codigo ejecutado corectamente", "results":formatted});
											});
										});
									});
									//return res.status(200).send({'estado': true, mensaje: "Codigo ejecutado corectamente", "results":formatted});
								}
								else{
									return res.status(200).send({'estado': false, mensaje: "Rol no aceptado Datos no guardados", "results":formatted});
								}
							}
							else{
								return res.status(200).send({'estado': false, "redirectLogin":true, mensaje: "No ha iniciado sesion. Datos no guardados", "results":formatted});
							}
						}
						else{
							return res.status(200).send({'estado': false, mensaje: "Diferente numero de valores de los esperados", esperado:salidas.length, recibido:results.length});
						}
					}
					else{
						return res.status(200).send({'estado': false, mensaje: "El codigo no retorna valores", "results":results});
					}
				});
			});		
			
		}
		else {
			console.log("No correct files");
			res.status(400).send("No correct files");
		}
	}
	else{
		console.log("No files");
		//console.log(req);
		res.status(400).send("No files");
	}
});



module.exports = router;