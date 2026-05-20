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

  // SUCESSO

  mensagemDados.innerText =
  "✔ Dados atualizados com sucesso.";

  mensagemDados.style.color = "#4c8b5f";

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