//GET IN: Llama a lo anteriormente seteado en index, mediante la key "email"
document.getElementById("p-email").innerHTML = window.localStorage.getItem("email")

//Usuario debe estar logueado

if (window.localStorage.getItem("email")) {
    document.getElementById("email").value = window.localStorage.getItem("email")
} else {
    window.location.href = "https://rominaferreira.github.io/E-commerce_JAP/"
}