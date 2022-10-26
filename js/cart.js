//AGREGAR EL COSO EN EL NAVBAR: 
//GET IN: Llama a lo anteriormente seteado en index, mediante la key "email"
document.getElementById("p-email").innerHTML = window.localStorage.getItem("email")

//Funciones globales

let costoProducto
let currencyProducto
let subtotal
let costoEnvio



document.addEventListener("DOMContentLoaded",  function () { 

//Escucha modificación del subtotal
    document.getElementById("cantidad").addEventListener("input", function(){
    
        let nuevaCantidad = document.getElementById ("cantidad").value
        subtotal = costoProducto*nuevaCantidad
        document.getElementById("subtotal").innerHTML =`${currencyProducto} ${subtotal}`

        //Entregable 6
        
        document.getElementById("productCost").innerHTML =`${currencyProducto} ${subtotal}`
        
        if (document.getElementById("flexRadioDefault1").checked) {
            costoEnvio= subtotal*0.15
        } 
        else if (document.getElementById("flexRadioDefault2").checked) {
            costoEnvio= subtotal*0.07
        } 
        else if (document.getElementById("flexRadioDefault3").checked) {
            costoEnvio= subtotal*0.05
        }
        
        document.getElementById("deliverCost").innerHTML =`${currencyProducto} ${Math.round(costoEnvio)}`
              

    });

//Escucha modificación del tipo de envío seleccionado

    document.getElementById("deliverType").addEventListener("change", function(event){
   
    const id = event.target.id
      

    if (id === 'flexRadioDefault1') {
       
        costoEnvio = subtotal*0.15
       
    }
    
    else if (id === 'flexRadioDefault2'){
        costoEnvio = subtotal*0.07
    }

    else {
       costoEnvio = subtotal*0.05
    }    
    

    document.getElementById("deliverCost").innerHTML =`${currencyProducto} ${Math.round(costoEnvio)}`


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
            document.getElementById("subtotal").innerHTML =`${currencyProducto} ${costoProducto*cantidadProductoInicial}`
            
            //Entregable 6
            document.getElementById("productCost").innerHTML =`${currencyProducto} ${costoProducto*cantidadProductoInicial}`
            subtotal = costoProducto*cantidadProductoInicial
            
            
        })

    
        })
