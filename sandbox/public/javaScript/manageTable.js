
var data = [
    [
        "Tiger Nixon",
        "System Architect",
        "Edinburgh",
        "5421",
        "2011/04/25",
        "$3,120"
    ],
    [
        "Garrett Winters",
        "Director",
        "Edinburgh",
        "8422",
        "2011/07/25",
        "$5,300"
    ]
]

/*
$('#manageMemberTable').DataTable( {
    data: data
} );
*/

$('#manageMemberTable').DataTable( {
	// serverSide: true,
    ajax: {
        url: '/api/usuario/',
        type: 'GET',
        dataSrc: 'usuarios'
    },
    columns: [
        { data: 'ident' },
        { data: 'nombre' },
        { data: 'apellido' },
        { data: 'carrera' },
        { data: 'rol' },
        { data: 'correo' }
    ]
} );