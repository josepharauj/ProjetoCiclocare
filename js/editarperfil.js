const dropdownBtn = document.querySelector(".dropdown-btn");

const dropdownContent = document.querySelector(".dropdown-content");

dropdownBtn.addEventListener("click", () => {

  if(dropdownContent.style.display === "flex"){

    dropdownContent.style.display = "none";

  } else {

    dropdownContent.style.display = "flex";

  }

});

// ÍCONE DO SINO
const bellIcon = document.querySelector(".bell-icon");

// SIDEBAR
const notificationSidebar = document.querySelector(".notification-sidebar");

// BOTÃO FECHAR
const closeSidebar = document.querySelector(".close-sidebar");


// ABRIR SIDEBAR

bellIcon.addEventListener("click", () => {

  notificationSidebar.classList.add("active");

});


// FECHAR SIDEBAR

closeSidebar.addEventListener("click", () => {

  notificationSidebar.classList.remove("active");

});

// USUÁRIO
const usuarioInfo = document.querySelector(".usuario-info");

// DROPDOWN PERFIL
const profileDropdown = document.querySelector(".profile-dropdown");


// ABRIR / FECHAR MENU PERFIL

usuarioInfo.addEventListener("click", () => {

  profileDropdown.classList.toggle("active");

});


//AQUI INICIA O JS DO CORPO DA TELA


// =========================
// CHIPS INTERATIVOS
// =========================

const chips = document.querySelectorAll(".chip");

chips.forEach((chip) => {

  chip.addEventListener("click", () => {

    chip.classList.toggle("active");

  });

});


// =========================
// OBJETIVOS
// =========================

const objetivos = document.querySelectorAll(".objetivo-card");

objetivos.forEach((card) => {

  card.addEventListener("click", () => {

    // REMOVE ACTIVE DE TODOS

    objetivos.forEach((item) => {

      item.classList.remove("active");

    });

    // ADICIONA NO CLICADO

    card.classList.add("active");

  });

});


// =========================
// TOAST SALVAR
// =========================

const salvarBtn = document.getElementById("salvarBtn");

const toast = document.getElementById("toast");

salvarBtn.addEventListener("click", () => {

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

});


// =========================
// PREVIEW FOTO PERFIL
// =========================

const inputFoto = document.getElementById("inputFoto");

const fotoPerfil = document.getElementById("fotoPerfil");

if(inputFoto){

  inputFoto.addEventListener("change", (event) => {

    const arquivo = event.target.files[0];

    if(arquivo){

      const reader = new FileReader();

      reader.onload = function(e){

        fotoPerfil.src = e.target.result;

      };

      reader.readAsDataURL(arquivo);

    }

  });

}


// =========================
// REMOVER FOTO
// =========================

const removerFotoBtn = document.getElementById("removerFoto");

if(removerFotoBtn){

  removerFotoBtn.addEventListener("click", () => {

    fotoPerfil.src = "https://i.pravatar.cc/200";

    inputFoto.value = "";

  });

}

// =========================
// EDITAR INPUTS
// =========================

const editIcons = document.querySelectorAll(".edit-icon");

editIcons.forEach((icon) => {

  icon.addEventListener("click", () => {

  

    // PEGA O CONTAINER

    const inputGroup = icon.closest(".input-group");

    // PEGA INPUT

    const input = inputGroup.querySelector("input");

    // REMOVE DISABLED

    input.removeAttribute("disabled");

    // FOCO

    input.focus();

  });

});

// =========================
// CARREGAR DADOS USUÁRIO
// =========================

document.addEventListener(
  "DOMContentLoaded",
  carregarDadosUsuario
);

async function carregarDadosUsuario() {

  const usuarioId =
  localStorage.getItem("usuarioId");

  if (!usuarioId) {
    alert("Usuário não encontrado.");
    window.location.href = "login.html";
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:8080/api/usuarios/${usuarioId}`
    );

    const data = await response.json();

    if (!response.ok) {
      alert(
        data.mensagem ||
        "Erro ao carregar perfil."
      );
      return;
    }

    const usuario = data.dados;

    document.getElementById("nome").value =
    usuario.nome;

    document.getElementById("email").value =
    usuario.email;

    document.getElementById("dataNascimento").value =
    usuario.dataNascimento;

    document.getElementById("idade").value =
    calcularIdade(usuario.dataNascimento) + " anos";

  } catch(error) {

    console.error(error);

    alert(
      "Erro ao conectar com servidor."
    );

  }

}

// =========================
// CALCULAR IDADE
// =========================

function calcularIdade(dataNascimento) {

  const nascimento =
  new Date(`${dataNascimento}T00:00:00`);

  const hoje = new Date();

  let idade =
  hoje.getFullYear() -
  nascimento.getFullYear();

  const mesAtual =
  hoje.getMonth();

  const diaAtual =
  hoje.getDate();

  const mesNascimento =
  nascimento.getMonth();

  const diaNascimento =
  nascimento.getDate();

  if (
    mesAtual < mesNascimento ||
    (
      mesAtual === mesNascimento &&
      diaAtual < diaNascimento
    )
  ) {

    idade--;

  }

  return idade;

}

// =========================
// SALVAR DADOS PESSOAIS
// =========================

const salvarDadosBtn = document.getElementById("salvarDadosPessoais");

const mensagemDados = document.getElementById("mensagemDados");

// INPUTS

const inputsDados = document.querySelectorAll(
  ".input-group input"
);

// VALORES ORIGINAIS

const valoresOriginais = [];

inputsDados.forEach((input) => {

  valoresOriginais.push(input.value);

});


// CLICK SALVAR

salvarDadosBtn.addEventListener("click", () => {

  let alterou = false;

  let vazio = false;

  // VERIFICA INPUTS

  inputsDados.forEach((input, index) => {

    // CAMPO VAZIO

    if(input.value.trim() === ""){

      vazio = true;

    }

    // ALTERAÇÃO

    if(input.value !== valoresOriginais[index]){

      alterou = true;

    }

  });

  // ERRO

  if(vazio){

    mensagemDados.innerText =
    "❌ Preencha todos os campos.";

    mensagemDados.style.color = "#d9534f";

    return;
  }

  // SEM ALTERAÇÃO

  if(!alterou){

    mensagemDados.innerText =
    "⚠ Nenhuma alteração foi realizada.";

    mensagemDados.style.color = "#c58b00";

    return;
  }

  // =========================
// ENVIAR PARA BACKEND
// =========================

const usuarioId =
localStorage.getItem("usuarioId");

const dadosAtualizados = {

  nome:
  document.getElementById("nome").value,

  email:
  document.getElementById("email").value,

  dataNascimento:
  document.getElementById("dataNascimento").value

};

fetch(
  `http://localhost:8080/api/usuarios/${usuarioId}`,
  {

    method: "PUT",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(dadosAtualizados)

  }

)

.then(response => response.json())

.then(data => {

  mensagemDados.innerText =
  "✔ Dados atualizados com sucesso.";

  mensagemDados.style.color =
  "#4c8b5f";

})

.catch(error => {

  console.error(error);

  mensagemDados.innerText =
  "❌ Erro ao atualizar dados.";

  mensagemDados.style.color =
  "#d9534f";

});

});




// =========================
// BOTÃO CICLO
// =========================

const atualizarCicloBtn = document.querySelector(".info-box + .btn-primary");

if(atualizarCicloBtn){

  atualizarCicloBtn.addEventListener("click", () => {

    alert("Redirecionar para registros do ciclo.");

  });

}

// =========================
// BOTÃO LEMBRETE
// =========================

const lembreteBtn = document.querySelector(".alerta-box .btn-primary");

if(lembreteBtn){

  lembreteBtn.addEventListener("click", () => {

    alert("Redirecionar para criação de lembrete.");

  });

}
