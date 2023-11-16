const url = 'https://6552c0295449cfda0f2dca34.mockapi.io/users';

let btnBuscar = document.getElementById('btnGet1');
let btnAgregar = document.getElementById('btnPost');
let inputBuscar = document.getElementById('inputGet1Id');
let btnPost = document.getElementById('btnPOST');
let idPut = document.getElementById('inputPutId').value;


//PETICIONES EN FUNCIONES 

//GET
function getUsers() {
    const url = 'https://6552c0295449cfda0f2dca34.mockapi.io/users';

    fetch(url)
        .then(response => response.json())
        .then(data => mostrar(data))
}


//POST
function postUsers() {
    let name = document.getElementById('inputPostNombre').value;
    let lastname = document.getElementById('inputPostApellido').value;

    fetch(url, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            name: name,
            lastname: lastname,
        })
    })
        .then(response => {
            if (!response.ok) {
                console.error("Error al agregar el usuario", response.statusText);
                throw new Error("Error al agregar el usuario");
            }
            return response.json();
        })
        .then(data => {
            // Limpiar los campos de entrada después de agregar el usuario
            document.getElementById('inputPostNombre').value = "";
            document.getElementById('inputPostApellido').value = "";
            // Actualizar la lista después de agregar el usuario
            actualizar();
        })
        .catch(error => {
            console.error(error);
            alert("Algo salió mal...");
        });
}
function actualizar() {
    fetch(url)
        .then(response => response.json())
        .then(data => mostrar(data))
        .catch(error => {
            console.error("Error al obtener la lista de usuarios", error);
            alert("Algo salió mal...");
        });
}

document.getElementById('btnPost').addEventListener('click', function () {
    postUsers();
});



//ABRE EL MODAL
let btnOpenModal = document.getElementById('btnPut');
let btnSendChanges = document.getElementById('btnSendChanges');
let modal = new bootstrap.Modal(document.getElementById('dataModal'));

btnOpenModal.addEventListener('click', function () {
    cargarDatosUsuario();
    modal.show();
});

btnSendChanges.addEventListener('click', function () {
    actualizarUsuario();
    modal.hide();
});

window.addEventListener('click', function (event) {
    if (event.target === modal._element) {
        modal.hide();
    }
});

function cargarDatosUsuario() {
    let id = document.getElementById('inputPutId').value;
    let nombre = document.getElementById('inputPutNombre');
    let apellido = document.getElementById('inputPutApellido');


    fetch(url + "/" + id)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            nombre.value = data.name;
            apellido.value = data.lastname;
        })
        .catch(error => {
            console.error('Error al cargar datos de usuario:', error)
            alert("Algo salió mal...");
        });
}


//PUT
function actualizarUsuario() {
    let id = document.getElementById('inputPutId').value;
    let name = document.getElementById('inputPutNombre').value;
    let lastname = document.getElementById('inputPutApellido').value;

    fetch(url + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            lastname: lastname
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            actualizar();
            document.getElementById('inputPutId').value = ""
        })
        .catch(error => {
            console.error('Error al actualizar usuario:', error);
            alert("Algo salió mal...");
        });
}



//DELETE
function borrarUsers() {
    let userId = document.getElementById('inputDelete').value;
    const apiUrl = url + '/' + userId;

    fetch(apiUrl, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                console.error("Error al eliminar el usuario", response.statusText);
                throw new Error("Error al eliminar el usuario");
            }

            return { success: true };
        })
        .then(data => {
            // Limpia el campo de entrada después de borrar el usuario
            document.getElementById('inputDelete').value = "";

            // Actualiza la lista luego de borrar el usuario
            actualizar();
        })
        .catch(error => {
            console.error(error);
            alert("Algo salió mal...");
        });
}


let btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', function () {
    borrarUsers();
    actualizar();
});


//Funcion buscar 
function buscar() {

    if (inputBuscar.value === "") {
        getUsers()

    }
    else {
        let api = url + '/' + inputBuscar.value;
        fetch(api)
            .then(response => response.json())
            .then(data => mostrar(data))

    }
}

btnBuscar.addEventListener('click', buscar);

//Funcion que muestra el resultado en pantalla.
function mostrar(data) {
    let resultado = document.getElementById('results');
    resultado.innerText = JSON.stringify(data);
}


// Obtener referencias a los elementos de entrada y botones
var inputPostNombre = document.getElementById("inputPostNombre");
var inputPostApellido = document.getElementById("inputPostApellido");
var inputPutId = document.getElementById("inputPutId");
var inputDelete = document.getElementById("inputDelete");
var btnpost = document.getElementById("btnPost");
var btnput = document.getElementById("btnPut");
var btndelete = document.getElementById("btnDelete");

// Agregar eventos de escucha para los cambios en los campos de entrada
inputPostNombre.addEventListener('input', deshabilitar);
inputPostApellido.addEventListener('input', deshabilitar);
inputPutId.addEventListener('input', deshabilitar);
inputDelete.addEventListener('input', deshabilitar);

// Definir la función deshabilitar
function deshabilitar() {
    var inputValuePostNombre = inputPostNombre.value;
    var inputValuePostApellido = inputPostApellido.value;
    var inputValuePutId = inputPutId.value;
    var inputValueDelete = inputDelete.value;

    // Lógica para habilitar/deshabilitar botones
    if (inputValuePostNombre !== '' && inputValuePostApellido !== '') {
        btnpost.removeAttribute('disabled');
    } else {
        btnpost.setAttribute('disabled', 'disabled');
    }

    if (inputValuePutId !== '') {
        btnput.removeAttribute('disabled');
    } else {
        btnput.setAttribute('disabled', 'disabled');
    }

    if (inputValueDelete !== '') {
        btndelete.removeAttribute('disabled');
    } else {
        btndelete.setAttribute('disabled', 'disabled');
    }
}
