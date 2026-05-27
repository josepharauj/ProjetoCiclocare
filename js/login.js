const form = document.getElementById("loginForm");

form.addEventListener("submit", login);

async function login(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  const dadosLogin = {
    email,
    senha
  };

  if (!email || !senha) {
    alert("Preencha email e senha.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dadosLogin)
    });

    const data = await lerRespostaJson(response);

    if (response.ok && data.sucesso) {
      const login = data.dados;

      localStorage.setItem("usuarioId", login.usuario.id);
      localStorage.setItem("usuario", JSON.stringify(login.usuario));
      localStorage.setItem("token", login.token);
      localStorage.setItem("refreshToken", login.refreshToken);

      window.location.href = "index.html";
      return;
    }

    alert(formatarErroApi(data, "E-mail ou senha invalidos!"));
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com o servidor");
  }
}

async function lerRespostaJson(response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return {
      sucesso: false,
      mensagem: text
    };
  }
}

function formatarErroApi(data, fallback) {
  if (data && data.dados && typeof data.dados === "object") {
    return Object.values(data.dados).join("\n");
  }

  return (data && data.mensagem) || fallback;
}
