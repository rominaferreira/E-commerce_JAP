//Defino basándome en el formato de "categories.js"

const ORDER_ASC_BY_COST = "Precio ascendente";
const ORDER_DESC_BY_COSR = "Precio descendente";
const ORDER_BY_SALES = "Relevancia";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

//Llamo al DOM

document.addEventListener("DOMContentLoaded", function () {

    // Ordenar por precio ascendente

    function sortProducts(criteria, array){
        let result = [];
        if (criteria === ORDER_ASC_BY_COST)
        {
            result = array.sort(function(a, b) {
                if ( a.cost < b.cost ){ return -1; }
                if ( a.cost > b.cost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_DESC_BY_COST){
            result = array.sort(function(a, b) {
                if ( a.cost> b.cost){ return -1; }
                if ( a.cost < b.cost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_BY_SALES){
            result = array.sort(function(a, b) {
                let aCount = parseInt(a.productCount);
                let bCount = parseInt(b.productCount);
    
                if ( aCount > bCount ){ return -1; }
                if ( aCount < bCount ){ return 1; }
                return 0;
            });
        }
    
        return result;
    }
    
    function setCatID(id) {
        localStorage.setItem("catID", id);
        window.location = "products.html"
    }
    

// Listado de productos

    fetch(`https://japceibal.github.io/emercado-api/cats_products/${window.localStorage.getItem("catID")}.json`)

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