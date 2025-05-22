document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    const loginData = {
        email: email,
        password: password
    };
    
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "painel.html";  // redireciona após login
        } else {
            alert("Email ou senha incorretos!");
        }
    })
    .catch(error => {
        alert("Erro ao fazer login!");
        console.error("Erro:", error);
    });
});
