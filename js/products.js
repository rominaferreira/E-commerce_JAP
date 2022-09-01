document.addEventListener("DOMContentLoaded", function () {
    
    // Probando: Ponerlo en url
    console.log(window.localStorage.getItem("catID"))
    fetch('https://japceibal.github.io/emercado-api/cats_products/101.json')

        .then(respuesta => respuesta.json()) // Recibe objeto de tipo response y devuelve objeto transformado en Javascript

        .then(data => {

            let htmlContentToAppend = `<h1 class="text-center">Productos</h1><p class="text-center"> Verás aquí todos los productos de la categoría Autos</p>`;


            for (let i = 0; i < data.products.length; i++) {
                let product = data.products[i];

                htmlContentToAppend +=

                `<div id="${product.id}" class="row mb-1">
                <img src=" ${product.image}" class="image-size">
                <div class="col">
                 <div class="row">${product.name} - ${product.currency} ${product.cost}</div>
                 <div class="row">${product.description}</div>
                 </div>
                                  
                 Vendidos ${product.soldCount}
                                      
                 
                </div> `

            }

            document.getElementById("product-list").innerHTML = htmlContentToAppend;
        });
});