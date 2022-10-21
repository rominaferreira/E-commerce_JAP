//AGREGAR EL COSO EN EL NAVBAR: 
//GET IN: Llama a lo anteriormente seteado en index, mediante la key "email"
//document.getElementById("p-email").innerHTML = window.localStorage.getItem("email")

//Funciones globales

let costoProducto
let currencyProducto

//Llamado

document.addEventListener("DOMContentLoaded",  function () { 

    document.getElementById("cantidad").addEventListener("input", function(){
    
        let nuevaCantidad = document.getElementById ("cantidad").value
        document.getElementById("subtotal").innerHTML =`${currencyProducto} ${costoProducto*nuevaCantidad}`
        

    });

    //Fetch

       
    fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`)

        .then(respuesta => respuesta.json())

        .then(data => {

            document.getElementById("nombre").innerHTML = data.articles[0].name;
            document.getElementById("imagen").src = data.articles[0].image;
            document.getElementById("cantidad").value = data.articles[0].count;
            costoProducto = data.articles[0].unitCost;
            currencyProducto = data.articles[0].currency;
            let cantidadProductoInicial = data.articles[0].count;
            document.getElementById("subtotal").innerHTML =`${currencyProducto} ${costoProducto*cantidadProductoInicial}`
            
            
        })

    
        })
