document.addEventListener("DOMContentLoaded", function(){

    let htmlContentToAppend = ""
    
    fetch(`https://japceibal.github.io/emercado-api/products/${window.localStorage.getItem("productID")}.json`) 

    .then(respuesta => respuesta.json()) 

    .then(data => {

        let product=data
        htmlContentToAppend +=
        
        `<h2>${product.name}</h2>
        <hr>
        Precio
        <div >${product.cost} </div>
        <br>
        Descripción
        <div> ${product.description} </div>
        <br>
        Categoría
        <div> ${product.category} </div>
        <br>
        Cantidad de vendidos
        <div> ${product.soldCount} </div>

        images []
        `
        document.getElementById("product-info").innerHTML = htmlContentToAppend;
    })

    console.log(htmlContentToAppend)
    
    
})
       