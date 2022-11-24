//GET IN: Llama a lo anteriormente seteado en index, mediante la key "email"
document.getElementById("p-email").innerHTML = window.localStorage.getItem("email")

//Usuario debe estar logueado para ingresar al Perfil, por lo que si no lo está, la función lo redirige a la página del login.
//A su vez, si está logueado, la función guarda el correo en el input con id "email"

if (window.localStorage.getItem("email")) {
  document.getElementById("email").value = window.localStorage.getItem("email")
} //else {
  //window.location.href = "https://rominaferreira.github.io/E-commerce_JAP/"
//}

// Ejemplo de JavaScript inicial para deshabilitar el envío de formularios si hay campos no válidos
(function () {
  'use strict'

  // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
  var forms = document.querySelectorAll('.needs-validation')

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

//Guardo los datos ingresados en el almacenamiento local

function handleSubmit() {

  let nombre1 = document.getElementById("primer-nombre").value;
  let apellido1 = document.getElementById("primer-apellido").value;
  let nombre2 = document.getElementById("segundo-nombre").value;
  let apellido2 = document.getElementById("segundo-apellido").value;
  let telefono = document.getElementById("telefono").value;

  window.localStorage.setItem("primer-nombre", nombre1)
  window.localStorage.setItem("primer-apellido", apellido1)
  window.localStorage.setItem("segundo-nombre", nombre2)
  window.localStorage.setItem("segundo-apellido", apellido2)
  window.localStorage.setItem("telefono", telefono)

}

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("savebutton").addEventListener("click", handleSubmit);
});


//TRAERLOS COMO ESTÁ ARRIBA

if (window.localStorage.getItem("primer-nombre")) {
  nombre1 = window.localStorage.getItem("primer-nombre")
}