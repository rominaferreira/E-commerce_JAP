document.addEventListener("DOMContentLoaded", function () {

    // Información del producto

    let htmlContentToAppend = ""

    fetch(`https://japceibal.github.io/emercado-api/products/${window.localStorage.getItem("productID")}.json`)

        .then(respuesta => respuesta.json())

        .then(data => {

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
        <div> <b>Imágenes</b>
        <br>
        `
            let imagenes = product.images;
            for (let imagen of imagenes) {
                htmlContentToAppend += `<img src="${imagen}" class="image-size">`
            }
            `</div>`;

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
       <hr> <div>` 
       productsComments.forEach(productComment => {

                htmlComentarios +=

                    `<b>${productComment.user}</b> ${productComment.dateTime}`

                //Agrego estrellas de acuerdo al "score" 

                for (let i = 1; i <= 5; i++) {

                    if (i <= productComment.score) {
                        htmlComentarios += `<span class="fa fa-star checked"></span>`
                    }
                    else {
                        htmlComentarios += `<span class="fa fa-star"></span>`
                    }
                }

                htmlComentarios += `${productComment.description}
                
                </div>`

            });


            document.getElementById("product-comments").innerHTML = htmlComentarios;


        })

})
