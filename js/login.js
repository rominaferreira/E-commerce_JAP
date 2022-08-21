function handleSubmit() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (
        !email ||
        !password

    ) {
        alert("Ingresa tus datos");

    } else {
        window.location.href = "https://rominaferreira.github.io/E-commerce_JAP/inicio";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("regBtn").addEventListener("click", handleSubmit);
});