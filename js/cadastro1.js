const form =
document.getElementById('registerForm');

const togglePassword =
document.getElementById(
  'togglePassword'
);

const senhaInput =
document.getElementById('senha');

const eyeIcon =
document.getElementById('eyeIcon');

togglePassword.addEventListener('click', () => {

  if(senhaInput.type === 'password'){

    senhaInput.type = 'text';

    eyeIcon.src =
    'assets/icons/olhofechado.png';

  }else{

    senhaInput.type = 'password';

    eyeIcon.src =
    'assets/icons/olhoaberto.png';

  }

});

form.addEventListener('submit', async (event) => {

  event.preventDefault();

  const nome =
  document.getElementById('nome')
  .value
  .trim();

  const email =
  document.getElementById('email')
  .value
  .trim();

  const senha =
  senhaInput.value.trim();

  if(
    nome === '' ||
    email === '' ||
    senha === ''
  ){

    alert('Preencha todos os campos');

    return;
  }

  const usuario = {

    nome,
    email,
    senha
  };

  try{

    const response = await fetch(
      'http://localhost:8080/api/auth/register',
      {

        method:'POST',

        headers:{
          'Content-Type':'application/json'
        },

        body:JSON.stringify(usuario)

      }
    );

    if(response.ok){

      alert(
        'Cadastro realizado com sucesso!'
      );

      window.location.href =
      'cadastro2.html';

    }else{

      const erro =
      await response.text();

      alert(erro);
    }

  }catch(error){

    console.log(error);

    alert(
      'Erro ao conectar com o servidor'
    );

  }

});