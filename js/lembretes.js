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

// SELEÇÃO DE ELEMENTOS DO FORMULÁRIO DE LEMBRETES
const reminderForm = document.getElementById("reminder-form");
const remindersList = document.getElementById("reminders-list");

// FUNÇÃO PARA CADASTRAR E EXIBIR O LEMBRETE
reminderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Captura dos valores dos campos
  const type = document.getElementById("reminder-type").value;
  const date = document.getElementById("reminder-date").value;
  const doctor = document.getElementById("doctor-name").value;
  const clinic = document.getElementById("clinic-name").value;
  const address = document.getElementById("address").value;

  // Remove a mensagem de "Nenhum lembrete" se for o primeiro cadastro
  const emptyMsg = remindersList.querySelector(".empty-msg");
  if (emptyMsg) {
    emptyMsg.remove();
  }

  // Formatação simples da data (AAAA-MM-DD para DD/MM/AAAA)
  const dateFormatted = date.split('-').reverse().join('/');

  // Criação do elemento de lembrete com estilização CicloCare
  const reminderCard = document.createElement("div");
  reminderCard.style.cssText = `
    background: rgba(255, 255, 255, 0.6);
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 15px;
    border-left: 5px solid #f25d8a;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    animation: fadeUp 0.5s ease;
  `;

  // HTML interno do card de lembrete
  reminderCard.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
      <div>
        <strong style="color: #8F5353; font-size: 1.1rem; display: block; margin-bottom: 5px;">
          ${type.charAt(0).toUpperCase() + type.slice(1)}
        </strong>
        <p style="font-size: 0.9rem; color: #444; margin: 2px 0;">
          <i class="fa-regular fa-calendar" style="margin-right: 5px;"></i> ${dateFormatted}
        </p>
        <p style="font-size: 0.9rem; color: #444; margin: 2px 0;">
          <i class="fa-solid fa-user-doctor" style="margin-right: 5px;"></i> ${doctor || 'Não informado'}
        </p>
        <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">
          <i class="fa-solid fa-location-dot" style="margin-right: 5px;"></i> ${clinic} - ${address}
        </p>
      </div>
      <button class="delete-reminder" style="background: none; border: none; color: #b26b6b; cursor: pointer; font-size: 1.1rem;">
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </div>
  `;

  // Funcionalidade para excluir o lembrete
  reminderCard.querySelector(".delete-reminder").addEventListener("click", () => {
    reminderCard.remove();
    if (remindersList.children.length === 0) {
      remindersList.innerHTML = '<p class="empty-msg">Nenhum lembrete agendado.</p>';
    }
  });

  // Adiciona o novo lembrete à lista e limpa o formulário
  remindersList.appendChild(reminderCard);
  reminderForm.reset();
});