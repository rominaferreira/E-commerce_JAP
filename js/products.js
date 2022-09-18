// GET IN: Llama a lo anteriormente seteado en index, mediante la key "email"
document.getElementById("p-email").innerHTML = window.localStorage.getItem("email")

//Defino basándome en el formato de "categories.js"

const ORDER_ASC_BY_COST = "Precio ascendente";
const ORDER_DESC_BY_COST = "Precio descendente";
const ORDER_BY_SALES = "Relevancia";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

//SET: Función para redireccionar a product-info cada vez que el usuario clickea

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

//Llamo al DOM

document.addEventListener("DOMContentLoaded", function () {

    // Ordenar por precio y relevancia

    function sortProducts(criteria, array) {
        let result = [];
        if (criteria === ORDER_ASC_BY_COST) {
            result = array.sort(function (a, b) {
                if (parseInt(a.cost) < parseInt(b.cost)) { return -1; }
                if (parseInt(a.cost) > parseInt(b.cost)) { return 1; }
                return 0;
            });
        } else if (criteria === ORDER_DESC_BY_COST) {
            result = array.sort(function (a, b) {
                if (parseInt(a.cost) > parseInt(b.cost)) { return -1; }
                if (parseInt(a.cost) < parseInt(b.cost)) { return 1; }
                return 0;
            });
        } else if (criteria === ORDER_BY_SALES) {
            result = array.sort(function (a, b) {
                let aCount = parseInt(a.soldCount);
                let bCount = parseInt(b.soldCount);

                if (aCount > bCount) { return -1; }
                if (aCount < bCount) { return 1; }
                return 0;
            });
        }

        return result;
    }

    function showProductsList() {
       
        let htmlContentToAppend = "";
        for (let i = 0; i < currentProductsArray.length; i++) {
            let product = currentProductsArray[i];

            if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

                htmlContentToAppend += `
                <div onclick="setProductID(${product.id})" class="cursor-active">
                <div id="${product.id}" class="row mb-1">
                <img src=" ${product.image}" class="image-size">
                <div class="col">
                 <div class="row">${product.name} - ${product.currency} ${product.cost}</div>
                 <div class="row">${product.description}</div>
                 </div>
                                  
                 Vendidos ${product.soldCount}
                                
                 
                </div>
                </div> `
            }

            document.getElementById("product-list").innerHTML = htmlContentToAppend;
        }
    }

    function sortAndShowProducts(sortCriteria, productsArray) {
       
        currentSortCriteria = sortCriteria;

        if (productsArray != undefined) {
            currentProductsArray = productsArray;
        }

        currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

        //Muestro productos ordenados
        
        showProductsList();
    }


    // Listado de productos

    fetch(`https://japceibal.github.io/emercado-api/cats_products/${window.localStorage.getItem("catID")}.json`) 

        .then(respuesta => respuesta.json()) // Recibe objeto de tipo response y devuelve objeto transformado en Javascript

        .then(data => {
            let html = `<h2>Productos</h2>
            <p class="lead">Verás aquí todas los productos de la categoría ${data.catName}.</p>
            <br>`
            document.getElementById("title").innerHTML = html
            currentProductsArray = data.products
            showProductsList()
            }
            
        );


        document.getElementById("sortAsc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_ASC_BY_COST);
        });
    
        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_COST);
        });
    
        document.getElementById("sortBySales").addEventListener("click", function(){
            sortAndShowProducts(ORDER_BY_SALES);
        });
    
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minCount = undefined;
            maxCount = undefined;
    
            showProductsList();
        });
    
        document.getElementById("rangeFilterCount").addEventListener("click", function(){
            
            minCount = document.getElementById("rangeFilterCountMin").value;
            maxCount = document.getElementById("rangeFilterCountMax").value;
    
            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                minCount = parseInt(minCount);
            }
            else{
                minCount = undefined;
            }
    
            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                maxCount = parseInt(maxCount);
            }
            else{
                maxCount = undefined;
            }
    
            showProductsList();
        });
    });