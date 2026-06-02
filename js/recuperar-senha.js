const form =
document.getElementById(
  'recoverForm'
);

const button =
document.getElementById(
  'recoverButton'
);

form.addEventListener(
  'submit',

  async (event) => {

    event.preventDefault();

    const email =
    document.getElementById(
      'email'
    ).value;

    button.disabled = true;

    button.innerText =
    'Enviando...';

    try {

      const response =
      await fetch(
        'http://localhost:8080/api/auth/recuperar-senha',
        {

          method:'POST',

          headers:{
            'Content-Type':'application/json'
          },

          body: JSON.stringify({
            email
          })

        }
      );

      const data =
      await response.json();

      console.log(data);

      if(response.ok){

        alert(
          data.mensagem
        );

      }else{

        alert(
          data.mensagem ||
          'Erro ao recuperar senha'
        );

      }

    } catch(error){

      console.error(error);

      alert(
        'Erro ao conectar com servidor'
      );

    } finally {

      button.disabled = false;

      button.innerText =
      'Recuperar Senha';

    }

  const email = document.getElementById('email').value.trim();

  if (!email) {
    alert('Por favor, preencha o campo de email.');
    return;
  }

  // Prepara o botão para mostrar que está carregando
  const btnSubmit = document.querySelector('.login-btn');
  const originalText = btnSubmit.innerText;
  btnSubmit.innerText = 'Enviando...';
  btnSubmit.disabled = true;

  try {
    // Altere essa URL para o endpoint correto da sua API que lida com esquecimento de senha
    const response = await fetch('http://localhost:8080/api/auth/recuperar-senha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (response.ok) {
      alert('Se o email existir na nossa base, um link de recuperação será enviado para ele!');
      // Opcional: redirecionar para a tela de login após solicitar a senha
      // window.location.href = 'login.html';
      
      // Limpa o campo
      document.getElementById('email').value = '';
    } else {
      const errorData = await response.text();
      alert('Não foi possível solicitar a recuperação: ' + errorData);
    }

  } catch (error) {
    console.error(error);
    alert('Erro de conexão com o servidor. Verifique se a API está rodando.');
  } finally {
    // Restaura o botão
    btnSubmit.innerText = originalText;
    btnSubmit.disabled = false;
  }
});