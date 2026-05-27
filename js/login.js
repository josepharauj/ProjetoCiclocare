const form = document.getElementById('loginForm');
const usuarioId = localStorage.getItem("usuarioId");

form.addEventListener('submit', login);

async function login(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const dadosLogin = {
    email,
    senha
  };

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosLogin)
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("usuarioId", data.dados.usuario.id);
      
      localStorage.setItem("token", data.dados.token);
      window.location.href = "index.html";
    } else {
      alert("E-mail ou senha inválidos!")
    }
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com o servidor");
  }
}