//GET IN: Llama a lo anteriormente seteado en index, mediante la key "email"
document.getElementById("p-email").innerHTML = window.localStorage.getItem("email")

//Funciones globales

let costoProducto
let currencyProducto
let subtotal
let costoEnvio
let DOLLAR_SYMBOL = "USD ";


//DOM

document.addEventListener("DOMContentLoaded", function () {

    //Escucha modificación del subtotal.
    //En este caso utilicé el evento oninput.

    document.getElementById("cantidad").addEventListener("input", function () {

        let nuevaCantidad = document.getElementById("cantidad").value
        subtotal = costoProducto * nuevaCantidad

        document.getElementById("subtotal").innerHTML = `${currencyProducto} ${subtotal}`

        //Entregable 6

        document.getElementById("productCost").innerHTML = `${currencyProducto} ${subtotal}`

        if (document.getElementById("flexRadioDefault1").checked) {
            costoEnvio = subtotal * 0.15
        }
        else if (document.getElementById("flexRadioDefault2").checked) {
            costoEnvio = subtotal * 0.07
        }
        else if (document.getElementById("flexRadioDefault3").checked) {
            costoEnvio = subtotal * 0.05
        }

        document.getElementById("deliverCost").innerHTML = `${currencyProducto} ${Math.round(costoEnvio)}`

        //Costo total

        let totalCost = document.getElementById("totalCost")
        let costoFinal = (DOLLAR_SYMBOL + (Math.round(subtotal + costoEnvio)));
        totalCost.innerHTML = costoFinal;


    });

    //Escucha modificación del tipo de envío seleccionado. 
    //En este caso utilicé el evento onchange.

    document.getElementById("deliverType").addEventListener("change", function (event) {

        const id = event.target.id //Esto lo trabajé chequeando la inspeción del navegador.


        if (id === 'flexRadioDefault1') {

            costoEnvio = subtotal * 0.15

        }

        else if (id === 'flexRadioDefault2') {
            costoEnvio = subtotal * 0.07
        }

        else {
            costoEnvio = subtotal * 0.05
        }


        document.getElementById("deliverCost").innerHTML = `${currencyProducto} ${Math.round(costoEnvio)}`

        //Costo total

        let totalCost = document.getElementById("totalCost")
        let costoFinal = (DOLLAR_SYMBOL + (Math.round(subtotal + costoEnvio)));
        totalCost.innerHTML = costoFinal;


    });

    //Fetch


    fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)

        .then(respuesta => respuesta.json())

        .then(data => {

            document.getElementById("nombre").innerHTML = data.articles[0].name;
            document.getElementById("costo").innerHTML = `${data.articles[0].currency} ${data.articles[0].unitCost}`;
            document.getElementById("imagen").src = data.articles[0].image;
            document.getElementById("cantidad").value = data.articles[0].count;
            costoProducto = data.articles[0].unitCost;
            currencyProducto = data.articles[0].currency;
            let cantidadProductoInicial = data.articles[0].count;
            document.getElementById("subtotal").innerHTML = `${currencyProducto} ${costoProducto * cantidadProductoInicial}`

            //Entregable 6
            document.getElementById("productCost").innerHTML = `${currencyProducto} ${costoProducto * cantidadProductoInicial}`
            subtotal = costoProducto * cantidadProductoInicial

        })

        //Funcionalidad forma de pago



        // Validación de formularios con Bootstrap

        //Example starter JavaScript for disabling form submissions if there are invalid fields
        (function () {
            'use strict'

            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.querySelectorAll('.needs-validation')

            // Loop over them and prevent submission
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


})
