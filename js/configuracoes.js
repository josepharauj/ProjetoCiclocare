const dropdownBtn = document.querySelector(".dropdown-btn");

const dropdownContent = document.querySelector(".dropdown-content");

const tituloNotificacoes = document.querySelector(".notificacoes-titulo");
const listaNotificacoes = document.querySelector(".lista-notificacoes");
const tituloPrivacidade = document.querySelector(".privacidade-titulo");
const listaPrivacidade = document.querySelector(".lista-privacidade");
const tituloSeguranca = document.querySelector(".seguranca-titulo");
const listaSeguranca = document.querySelector(".lista-seguranca");
const onOffButtons = document.querySelectorAll(".on-off-button");

onOffButtons.forEach((button) => {
  button.addEventListener("change", () => {
    const subItem = button.closest(".configuracoes-subitem");

    subItem.classList.toggle("on", button.checked);
  })
})

tituloNotificacoes.addEventListener("click", () => {
  listaNotificacoes.classList.toggle("aberta");
});

tituloPrivacidade.addEventListener("click", () => {
  listaPrivacidade.classList.toggle("aberta");
});

tituloSeguranca.addEventListener("click", () => {
  listaSeguranca.classList.toggle("aberta");
})

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