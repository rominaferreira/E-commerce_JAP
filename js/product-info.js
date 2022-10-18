// GET IN: Llama a lo anteriormente seteado en index, mediante la key "email"
document.getElementById("p-email").innerHTML = window.localStorage.getItem("email")


document.addEventListener("DOMContentLoaded", async function () {

    // Información del producto

    let htmlContentToAppend = ""
    let data_2

    await fetch(`https://japceibal.github.io/emercado-api/products/${window.localStorage.getItem("productID")}.json`)

        .then(respuesta => respuesta.json())

        .then(data => {

            data_2 = data
            let product = data
            htmlContentToAppend +=

                `<h2>${product.name}</h2>
        <hr>
        <b> Precio </b>
        <div>${product.currency} ${product.cost} </div>
        <br>
        <b>  Descripción</b>
        <div> ${product.description} </div>
        <br>
        <b> Categoría</b>
        <div> ${product.category} </div>
        <br>
        <b>  Cantidad de vendidos</b>
        <div> ${product.soldCount} </div>
        <br>
        <b>Imágenes</b>
        <br>
        <div>`
            let imagenes = product.images;
            for (let imagen of imagenes) {
                htmlContentToAppend += `<img src="${imagen}" class="image-size">`
            }
            ` 
        </div>`

            document.getElementById("product-info").innerHTML = htmlContentToAppend;
        })

    //Comentarios del producto

    let htmlComentarios = ""

    fetch(`https://japceibal.github.io/emercado-api/products_comments/${window.localStorage.getItem("productID")}.json`)

        .then(respuesta => respuesta.json())

        .then(data => {

            let productsComments = data
            htmlComentarios +=

                ` <h3>Comentarios</h3>
       <hr>`
            productsComments.forEach(productComment => {

                htmlComentarios +=

                    `<div class="margin-separador"> <b>${productComment.user}</b> el ${productComment.dateTime} dijo: `

                //Agrego estrellas de acuerdo al "score" 

                for (let i = 1; i <= 5; i++) {

                    if (i <= productComment.score) {
                        htmlComentarios += `<span class="fa fa-star checked"></span>`
                    }
                    else {
                        htmlComentarios += `<span class="fa fa-star"></span>`
                    }
                }

                htmlComentarios += ` - ${productComment.description}
                
                </div>`

            });


            document.getElementById("product-comments").innerHTML = htmlComentarios;


        })

    //Productos relacionados

    let htmlRelatedProducts = 

        `<h3>Productos relacionados</h3> 
     <hr>
        <div class="container">
        ${data_2.relatedProducts[0].name}
        <img scr="${data_2.relatedProducts[0].image}" class="image-size">
        </div>
        <div class="margin-separador"> </div>
        <div class="container">${data_2.relatedProducts[1].name}
        <img scr="${data_2.relatedProducts[1].image}" class="image-size">
        </div>
        
        `
    /* for (let i = 0; i < data_2.relatedProducts.length; i++) {
         let nombre = data_2.relatedProducts.name;
         htmlContentToAppend += `<b>${data_2.relatedProducts[i].name} </b>`}

    for (let i = 0; i < data_2.relatedProducts.length; i++) {
        let producto = data_2.relatedProducts[i];
        htmlRelatedProducts += `
                <b>${producto[i].name}</b>
                <div class="container" onclick="(${producto[i].id})">
                <img src="${producto[i].image}">
                    
                    </div>
                    ` 
    }
*/
    document.getElementById("related-products").innerHTML = htmlRelatedProducts;
})
