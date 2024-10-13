document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('login-error');

    // Exemplo simples de verificação de login (substitua pelo seu sistema real)
    if (email === "usuario@exemplo.com" && password === "123456") {
        // Redireciona para a página de despesas
        window.location.href = "despesas.html";
    } else {
        errorMessage.textContent = "Email ou senha incorretos!";
    }
});
