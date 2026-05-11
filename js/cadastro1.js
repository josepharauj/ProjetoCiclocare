const form =
document.getElementById('registerForm');

form.addEventListener('submit', async (event) => {

  event.preventDefault();

  const nome =
  document.getElementById('nome').value.trim();

  const email =
  document.getElementById('email').value.trim();

  const senha =
  document.getElementById('senha').value.trim();

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
      'http://localhost:8080/api/usuarios/cadastro',
      {

        method:'POST',

        headers:{
          'Content-Type':'application/json'
        },

        body:JSON.stringify(usuario)

      }
    );

    if(response.ok){

      alert('Cadastro realizado com sucesso!');

      window.location.href =
      'index.html';

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