const form = 
document.getElementById('formCiclo');

form.addEventListener('submit', cadastrar);

async function cadastrar(e) {
  e.preventDefault();

  const usuarioSalvo = JSON.parse(
    localStorage.getItem("cadastroUsuario")
  );

  if (!usuarioSalvo) {
    alert("Preencha os dados básicos primeiro.");
    window.location.href = "cadastro1.html";
    return;
  }

  const nascimento = document.getElementById("nascimento").value;
  const ultimaMenstruacao = document.getElementById("ultimaMenstruacao").value;
  const duracaoCiclo = Number(document.getElementById("duracaoCiclo").value);
  const duracaoMenstruacao = Number(document.getElementById("duracaoMenstruacao").value);

  if (
    !nascimento ||
    !duracaoCiclo ||
    !duracaoMenstruacao ||
    !ultimaMenstruacao
  ) {
    alert("Preencha todos os campos.");
    return;
  }

  const ultimaMenstruacaoDate = new Date(`${ultimaMenstruacao}T00:00:00`);

  const dataFimDate = new Date(ultimaMenstruacaoDate);
  dataFimDate.setDate(
    dataFimDate.getDate() + duracaoMenstruacao - 1
  );

  const proximaPrevisaoDate = new Date(ultimaMenstruacaoDate);
  proximaPrevisaoDate.setDate(
    proximaPrevisaoDate.getDate() + duracaoCiclo
  );

  const dataFim = dataFimDate
    .toISOString()
    .split("T")[0];

  const proximaPrevisao = proximaPrevisaoDate
    .toISOString()
    .split("T")[0];

  const cadastroCompleto = {
  nome: usuarioSalvo.nome,
  email: usuarioSalvo.email,
  senha: usuarioSalvo.senha,
  nascimento: nascimento,

  dadosCiclo: {
    ultimaMenstruacao: ultimaMenstruacao,
    dataFim: dataFim,
    duracaoCiclo: duracaoCiclo,
    duracaoMenstruacao: duracaoMenstruacao,
    ultimaMenstruacao: ultimaMenstruacao,
    proximaPrevisao: proximaPrevisao,
    intensidadeFluxo: "MEDIO"
  }
};

  console.log(cadastroCompleto);

  try {
    const response = await fetch(
      "http://localhost:8080/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cadastroCompleto)
      }
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.removeItem("cadastroUsuario");

      alert("Cadastro realizado com sucesso!");

      window.location.href = "login.html";
    } else {
      alert(data.mensagem || "Erro ao realizar cadastro.");
    }

  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com servidor");
  }
}