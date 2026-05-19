const form =
document.getElementById('formCiclo');

form.addEventListener(
  'submit',

form.addEventListener('submit', async (event) => {

  event.preventDefault();

  const usuarioSalvo = JSON.parse(
    localStorage.getItem("cadastroUsuario")
  );

    const token =
    localStorage.getItem('token');

    if(!token){

      alert(
        'Usuário não autenticado'
      );

      window.location.href =
      'login.html';

      return;
    }

    const ultimaMenstruacao =
    document.getElementById(
      'ultimaMenstruacao'
    ).value;

    const duracaoMenstruacao =
    parseInt(
      document.getElementById(
        'duracaoMenstruacao'
      ).value
    );

    // calcula dataFim automaticamente
    const dataFimObj =
    new Date(ultimaMenstruacao);

    dataFimObj.setDate(
      dataFimObj.getDate() +
      duracaoMenstruacao
    );

    const dataFim =
    dataFimObj
      .toISOString()
      .split('T')[0];

    const dadosCiclo = {

      dataInicio:
      ultimaMenstruacao,

      dataFim:
      dataFim,

      duracaoCiclo:
      parseInt(
        document.getElementById(
          'duracaoCiclo'
        ).value
      ),

      duracaoMenstruacao:
      duracaoMenstruacao,

      ultimaMenstruacao:
      ultimaMenstruacao,

      intensidadeFluxo:
      "MEDIO"

    };

    console.log(dadosCiclo);

    try {

      const response =
      await fetch(
        'http://localhost:8080/api/ciclos',
        {

          method:'POST',

          headers:{

            'Content-Type':'application/json',

            'Authorization':
            `Bearer ${token}`

          },

          body: JSON.stringify(
            dadosCiclo
          )

        }
      );

      const data =
      await response.json();

      console.log(data);

      if(response.ok){

        alert(
          'Ciclo salvo com sucesso!'
        );

        window.location.href =
        'index.html';

      }else{

        alert(
          data.mensagem ||
          'Erro ao salvar ciclo'
        );

      }

    } catch(error){

      console.error(error);

      alert(
        'Erro ao conectar com servidor'
      );

    }

}));