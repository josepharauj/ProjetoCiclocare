const form = document.getElementById('loginForm');
form.addEventListener('submit', async (e) => {

  e.preventDefault();

  const email =
    document.getElementById('email').value;

  const senha =
    document.getElementById('senha').value;

  const dadosLogin = {
    email,
    senha
  };

  try {

    const response = await fetch(
      'http://localhost:8080/api/auth/login',
      {

        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(dadosLogin)

      }
    );

    const data = await response.json();

    if (response.ok) {

      localStorage.setItem(
        'token',
        data.dados.token
      );

      localStorage.setItem(
        'usuario',
        JSON.stringify(data.dados.usuario)
      );

      alert('Login realizado com sucesso!');

      // REDIRECIONA
      window.location.href = 'index.html';

    } else {

      alert(data.mensagem);

    }

  } catch (error) {

    console.error(error);

    alert('Erro ao conectar com servidor');

  }

});