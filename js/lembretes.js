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
// ==========================================================================
// GERENCIAMENTO DE LEMBRETES (VERIFICAÇÃO DE DATA AUTOMÁTICA)
// ==========================================================================
const remindersList = document.getElementById("reminders-list");
const reminderForm = document.getElementById("reminder-form");
const editIdInput = document.getElementById("edit-id");
const submitBtn = reminderForm ? reminderForm.querySelector(".btn-save") : null;

let lembretes = [];

// Função que reconstrói a lista e valida as datas automaticamente
function renderizarLembretes() {
  if (!remindersList) return;
  remindersList.innerHTML = "";

  if (lembretes.length === 0) {
    remindersList.innerHTML = '<p class="empty-msg">Nenhum lembrete agendado.</p>';
    return;
  }

  // Captura a data de hoje zerando as horas para comparação justa
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  lembretes.forEach((lembrete) => {
    // Configura a data obtida do input do lembrete
    const dataLembrete = new Date(lembrete.data + 'T00:00:00');
    
    // Define se está ativo ou não comparando com a data atual de forma automática
    const estaAtivo = dataLembrete >= hoje;

    const dateFormatted = lembrete.data.split('-').reverse().join('/');
    
    const reminderCard = document.createElement("div");
    reminderCard.className = `reminder-item ${estaAtivo ? "" : "inactive"}`;
    
    reminderCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <strong class="reminder-title" style="color: #8F5353; font-size: 1.1rem; display: block; margin-bottom: 5px;">
            ${lembrete.tipo}
          </strong>
          <p style="font-size: 0.9rem; color: #444; margin: 2px 0;">
            <i class="fa-regular fa-calendar" style="margin-right: 5px;"></i> ${dateFormatted}
          </p>
          <p style="font-size: 0.9rem; color: #444; margin: 2px 0;">
            <i class="fa-solid fa-user-doctor" style="margin-right: 5px;"></i> ${lembrete.profissional || 'Não informado'}
          </p>
          <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">
            <i class="fa-solid fa-location-dot" style="margin-right: 5px;"></i> ${lembrete.clinica} - ${lembrete.endereco}
          </p>
        </div>
        <span style="font-size: 0.8rem; font-weight: bold; color: ${estaAtivo ? '#1e88e5' : '#616161'}; background: ${estaAtivo ? '#e3f2fd' : '#f5f5f5'}; padding: 4px 8px; border-radius: 8px;">
          ${estaAtivo ? 'Ativo' : 'Inativo'}
        </span>
      </div>

      <div class="reminder-actions">
        <button type="button" class="btn-edit-reminder" onclick="prepararEdicaoLembrete('${lembrete.id}')">
          <i class="fa-solid fa-pen-to-square"></i> Editar
        </button>
        <button type="button" class="btn-delete-reminder" onclick="excluirLembrete('${lembrete.id}')">
          <i class="fa-solid fa-trash"></i> Excluir
        </button>
      </div>
    `;

    remindersList.appendChild(reminderCard);
  });
}

if (reminderForm) {
  reminderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const idEdicao = editIdInput.value;
    const tipo = document.getElementById("reminder-type").value;
    const data = document.getElementById("reminder-date").value;
    const profissional = document.getElementById("doctor-name").value;
    const clinicName = document.getElementById("clinic-name").value;
    const address = document.getElementById("address").value;

    if (idEdicao) {
      // Editar existente
      lembretes = lembretes.map((l) => {
        if (l.id === idEdicao) {
          return { ...l, tipo, data, profissional, clinica: clinicName, endereco: address };
        }
        return l;
      });
      editIdInput.value = "";
      if (submitBtn) submitBtn.innerText = "Agendar Lembrete";
    } else {
      // Criar novo
      const novoLembrete = {
        id: "rem-" + Date.now(),
        tipo,
        data,
        profissional,
        clinica: clinicName,
        endereco: address
      };
      lembretes.push(novoLembrete);
    }

    reminderForm.reset();
    renderizarLembretes();
  });
}

window.prepararEdicaoLembrete = function(id) {
  const lembrete = lembretes.find((l) => l.id === id);
  if (!lembrete) return;

  editIdInput.value = lembrete.id;
  document.getElementById("reminder-type").value = lembrete.tipo;
  document.getElementById("reminder-date").value = lembrete.data;
  document.getElementById("doctor-name").value = lembrete.profissional;
  document.getElementById("clinic-name").value = lembrete.clinica;
  document.getElementById("address").value = lembrete.endereco;

  if (submitBtn) submitBtn.innerText = "Atualizar Lembrete";
  reminderForm.scrollIntoView({ behavior: "smooth" });
};

window.excluirLembrete = function(id) {
  if (confirm("Deseja realmente excluir este lembrete?")) {
    lembretes = lembretes.filter((l) => l.id !== id);
    
    if (editIdInput.value === id) {
      editIdInput.value = "";
      if (submitBtn) submitBtn.innerText = "Agendar Lembrete";
      reminderForm.reset();
    }
    
    renderizarLembretes();
  }
};

// Exemplo de função no Front-end usando Fetch API para salvar o lembrete
const salvarLembrete = async () => {
    const dadosDoLembrete = {
        usuarioId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d", // UUID do usuário logado
        tipoProcedimento: "Consulta Ginecológica de Rotina",
        data: "2026-06-20",
        profissionalSaude: "Dra. Helena Souza",
        clinica: "Clínica Materna",
        endereco: "Av. Principal, 123"
    };

    try {
        const response = await fetch('http://localhost:8080/api/lembretes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Avisa o Spring que estamos enviando JSON
            },
            body: JSON.stringify(dadosDoLembrete) // Transforma o objeto JS em texto JSON
        });

        if (response.ok) {
            const resultado = await response.json();
            console.log("Lembrete salvo com sucesso:", resultado);
            alert("Lembrete agendado!");
        } else {
            console.error("Erro na resposta do servidor");
        }
    } catch (error) {
        console.error("Erro ao conectar com o Back-end:", error);
    }
};