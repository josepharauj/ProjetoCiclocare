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

});