'use strict'

var nodemailer=require('nodemailer');
var bCrypt = require('bcrypt-nodejs');

var Usuario = require('../models/usuarios');
var Perfil = require('../models/perfil');

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: 'registrodaw@gmail.com',
        pass: 'dawmailer'
    }
});

var createHash = function(password){
	return bCrypt.hashSync(password);
}


/*************/
/* CONSULTAR */
/*************/

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
	res.header('Access-Control-Allow-Origin', '*');
	Usuario.find({}, (err, usuarios) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!usuarios)
			return res.status(404).send({ message: `No existen usuarios`})

		res.status(200).send({ usuarios })
	})
}


function getUsuariosProf (req,res,next) {
	Usuario.find({ rol : 'Profesor' }, (err, usuarios) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!usuarios)
			return res.status(404).send({ message: `No existen usuarios`})

		res.status(200).send({ usuarios })
	})
}

function getUsuariosEstud (req,res,next) {
	Usuario.find({ rol : 'Estudiante' }, (err, usuarios) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!usuarios)
			return res.status(404).send({ message: `No existen usuarios`})

		res.status(200).send({ usuarios })
	})
}

function getUsuariosEstudsnParal (req,res,next) {
	Usuario.find({ rol : 'Estudiante', paralelo : "00" }, (err, usuarios) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!usuarios)
			return res.status(404).send({ message: `No existen usuarios`})

		res.status(200).send({ usuarios })
	})
}

function getUsuariosEstudParal (req,res,next) {
	let paral = req.params.paralelo

	Usuario.find({ rol : 'Estudiante', paralelo : paral }, (err, usuarios) => {
		if (err)
			return res.status(500).send({ message: `Error al realizar la peticion: ${err}`})
		if (!usuarios)
			return res.status(404).send({ message: `No existen usuarios`})

		res.status(200).send({ usuarios })
	})
}


/************/
/* INSERTAR */
/************/

function saveUsuario (req,res) {
	console.log('POST /api/usuario/')
	console.log(req.body)

	var pass = createHash(req.body.contrasena);

	let usuario = new Usuario()
	usuario.nombre = req.body.nombre,
	usuario.apellido = req.body.apellido,
	usuario.tipoIdent = req.body.tipoIdent,
	usuario.ident = req.body.ident,
	usuario.carrera = req.body.carrera,
	usuario.correo = req.body.correo,
	usuario.contrasena =  pass,  // req.body.contrasena,
	usuario.rol = req.body.rol
	
	if ( req.body.rol == "Estudiante") 	usuario.paralelo = "00"
	else	usuario.paralelo = ""

	usuario.save( (err, usuarioStored) => {
		if (err){
			res.status(500).send({ message: `Error al grabar en la base de datos: ${err}`})
			// console.log(err)
		}
		else{
			if ( usuarioStored.rol == "Estudiante" ) {
				let perfil = new Perfil()
				perfil.idestudiante = usuarioStored._id,
				perfil.insignia= 'Novato',
				perfil.insigniaSema = 'Ninguno',
				perfil.ejFacil = 0,
				perfil.ejIntermedio = 0,
				perfil.ejDificil = 0

				// console.log(perfil);
				
				perfil.save( (err, perfilStored) => {
					
					if (err)
						res.status(500).send({ message: `Error al grabar en la base de datos: ${err}`})
					
					var correo= req.body.correo;
					var Subject="Creacion de cuenta en Sandbox"
					var contenido="Bienvenido/a al curso Fundamentos de programacion, tu contrasena Temporal para Sandbox es: " + req.body.contrasena; 
					var mailOptions = {
						to: correo,
						subject: Subject,
						text: contenido
					}

					smtpTransport.sendMail(mailOptions, function(error, response){
						if (error) {
							console.log(error);
							//res.status(500).send('Error al enviar el Email: ${err}');
						} 
					});
					res.status(200).send({ usuario: usuarioStored, perfil: perfilStored })
				})
			}
			else{
				var correo= req.body.correo;
				var Subject="Creacion de cuenta en Sandbox"
				var contenido="Bienvenido/a al curso Fundamentos de programacion, tu contrasena Temporal para Sandbox es: " + req.body.contrasena; 
				
				var mailOptions = {
					to: correo,
					subject: Subject,
					text: contenido
				}
				
				smtpTransport.sendMail(mailOptions, function(error, response){
					if (error) {
						console.log(error);
						//res.status(500).send('Error al enviar el Email: ${err}');
					} 
				});
			}
		}		
	})
}


/**************/
/* ACTUALIZAR */
/**************/

function updateUsuario (req,res) {
	let usuarioId = req.params.usuarioId
	let update = req.body

	if ( update.contrasena != undefined || update.contrasena != null ) {
		update.contrasena = createHash(update.contrasena);
	}
	
	Usuario.findByIdAndUpdate( usuarioId, update, (err, usuarioUpdate) => {
		if (err)
			res.status(500).send({ message: `Error al actualizar el usuario: ${err}`})

		res.status(200).send({ usuario: usuarioUpdate })
	})
}


/************/
/* ELIMINAR */
/************/

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
	getUsuariosProf,
	getUsuariosEstud,
	getUsuariosEstudsnParal,
	getUsuariosEstudParal,
	saveUsuario,
	updateUsuario,
	deleteUsuario
}