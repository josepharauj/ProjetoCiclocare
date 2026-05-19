// ========================================
// CONFIG API
// ========================================

const API_URL = "http://localhost:8080/api/alarmes";

// ========================================
// USUÁRIA LOGADA
// ========================================
function carregarNomeUsuario(){

        const usuario =
        JSON.parse(
            localStorage.getItem('usuario')
        );

        const nomeUsuario =
        document.getElementById('nomeUsuario');

        if(usuario && nomeUsuario){

            nomeUsuario.textContent =
            `Olá, ${usuario.nome}`;
        }
}
// ========================================
// ELEMENTOS GLOBAIS
// ========================================

const dropdownBtn =
document.querySelector(".dropdown-btn");

const dropdownContent =
document.querySelector(".dropdown-content");

const bellIcon =
document.querySelector(".bell-icon");

const notificationSidebar =
document.querySelector(".notification-sidebar");

const closeSidebar =
document.querySelector(".close-sidebar");

const usuarioInfo =
document.querySelector(".usuario-info");

const profileDropdown =
document.querySelector(".profile-dropdown");

const notificationBadge =
document.getElementById("notification-badge");

const alarmForm =
document.getElementById("alarm-form");

const alarmList =
document.getElementById("alarm-list");

// ========================================
// DADOS
// ========================================

let alarmes = [];

let notificacoes = JSON.parse(
  localStorage.getItem("notificacoes")
) || [];

let editandoId = null;
// ========================================
// DROPDOWN MENU
// ========================================

dropdownBtn.addEventListener("click", () => {

  if(dropdownContent.style.display === "flex"){

    dropdownContent.style.display = "none";

  } else {

    dropdownContent.style.display = "flex";

  }

});

// ========================================
// SIDEBAR NOTIFICAÇÕES
// ========================================

bellIcon.addEventListener("click", () => {

  notificationSidebar.classList.add("active");

  notificacoes.forEach((n) => {

    n.lida = true;

  });

  localStorage.setItem(
    "notificacoes",
    JSON.stringify(notificacoes)
  );

  atualizarBadge();

});

closeSidebar.addEventListener("click", () => {

  notificationSidebar.classList.remove("active");

});

// ========================================
// DROPDOWN PERFIL
// ========================================

usuarioInfo.addEventListener("click", () => {

  profileDropdown.classList.toggle("active");

});

// ========================================
// PERMISSÃO NOTIFICAÇÃO
// ========================================

async function pedirPermissaoNotificacao(){

  if(Notification.permission !== "granted"){

    await Notification.requestPermission();

  }

}

// ========================================
// BADGE
// ========================================

function atualizarBadge(){

  const naoLidas =
  notificacoes.filter(
    n => !n.lida
  ).length;

  if(naoLidas > 0){

    notificationBadge.style.display =
    "flex";

    notificationBadge.textContent =
    naoLidas;

  } else {

    notificationBadge.style.display =
    "none";
  }

}

// ========================================
// RENDER NOTIFICAÇÕES
// ========================================

function renderizarNotificacoes(){

  const container =
  document.querySelector(
    ".notification-list"
  );

  container.innerHTML = "";

  if(notificacoes.length === 0){

    container.innerHTML = `

      <p class="empty-msg">

        Nenhuma notificação.

      </p>

    `;

    atualizarBadge();

    return;
  }

  notificacoes.forEach((notificacao) => {

    const item =
    document.createElement("div");

    item.classList.add(
      "notification-item"
    );

    item.innerHTML = `

      <strong>

        ${notificacao.titulo}

      </strong>

      <p>

        ${notificacao.mensagem}

      </p>

      <small>

        ${notificacao.horario}

      </small>

    `;

    container.appendChild(item);

  });

  atualizarBadge();

}

// ========================================
// CALCULAR PRÓXIMO HORÁRIO
// ========================================

function calcularProximoHorario(
  inicio,
  frequencia
){

  const agora = new Date();

  const [horaInicial, minutoInicial] =
  inicio.split(":").map(Number);

  let proximo = new Date();

  proximo.setHours(
    horaInicial,
    minutoInicial,
    0,
    0
  );

  while(proximo <= agora){

    proximo.setHours(
      proximo.getHours() +
      parseInt(frequencia)
    );

  }

  const hora =
  proximo
    .getHours()
    .toString()
    .padStart(2, "0");

  const minuto =
  proximo
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const ehHoje =
  proximo.toDateString() ===
  new Date().toDateString();

  const periodo =
  ehHoje ? "Hoje" : "Amanhã";

  return `${periodo} às ${hora}:${minuto}`;

}

// ========================================
// CARREGAR BACKEND
// ========================================

async function carregarAlarmes(){

  try {
      const token =
      localStorage.getItem("token");

      const response =
      await fetch(API_URL, {

        method:"GET",

        headers:{
          "Authorization":
          `Bearer ${token}`
        }
      });

      if(!response.ok){

        throw new Error(
          `Erro HTTP ${response.status}`
        );
      }

      alarmes =
      await response.json();
      renderizarAlarmes();

    } catch(erro){

      console.error(
        "Erro ao carregar alarmes",
        erro
      );
    }
}

// ========================================
// RENDERIZAR
// ========================================

function renderizarAlarmes(){

  alarmList.innerHTML = "";

  if(alarmes.length === 0){

    alarmList.innerHTML = `

      <p class="empty-msg">

        Nenhum alarme ativo.

      </p>

    `;

    return;
  }

  alarmes.forEach((alarme) => {

    let icone = "💊";

    if(alarme.tipo === "contraceptivo"){

      icone = "🌸";
    }

    const proximoHorario =
    calcularProximoHorario(
      alarme.horaInicio,
      alarme.frequencia
    );

    const card =
    document.createElement("div");

    card.classList.add("alarm-item");

    card.innerHTML = `

      <div class="alarm-top">

        <div class="alarm-title">

          <span>${icone}</span>

          <span>${alarme.nome}</span>

        </div>

        <div class="alarm-status">

          Ativo

        </div>

      </div>

      <div class="alarm-info">

        <span>
          Tipo: ${alarme.tipo}
        </span>

        <span>
          Frequência:
          ${alarme.frequencia}h
        </span>

        <span>
          Início:
          ${alarme.horaInicio}
        </span>

        <span>
          Próximo:
          ${proximoHorario}
        </span>

        <span>
          Observação:
          ${alarme.observacao || "Nenhuma"}
        </span>

      </div>

      <div class="alarm-actions">

        <button
          class="btn-edit"
          onclick="editarAlarme(${alarme.id})"
        >
          Editar
        </button>

        <button
          class="btn-delete"
          onclick="deletarAlarme(${alarme.id})"
        >
          Excluir
        </button>

      </div>

    `;

    alarmList.appendChild(card);

  });

}

// ========================================
// SALVAR / EDITAR
// ========================================

alarmForm.addEventListener(
  "submit",
  async (e) => {

    e.preventDefault();

    await pedirPermissaoNotificacao();

    const dados = {

      tipo:
      document.getElementById(
        "alarm-type"
      ).value,

      nome:
      document.getElementById(
        "alarm-name"
      ).value,

      frequencia:
      document.getElementById(
        "alarm-frequency"
      ).value,

      horaInicio:
      document.getElementById(
        "alarm-start"
      ).value,

      observacao:
      document.getElementById(
        "alarm-note"
      ).value,

      ativo:true

    };

    try {

      let response;

      // EDITAR
      if(editandoId){

          response = await fetch(

              `${API_URL}/${editandoId}`,

              {

                  method:"PUT",

                  headers:{

                      "Content-Type":
                      "application/json",

                      "Authorization":
                      `Bearer ${localStorage.getItem("token")}`

                  },

                  body: JSON.stringify(dados)
              }
          );

          if(response.ok){

              alert(
                  "Alarme atualizado!"
              );

          } else {

              alert(
                  "Erro ao atualizar alarme."
              );
          }

      } else {

          // NOVO
          response = await fetch(

              `${API_URL}/salvar`,

              {

                  method:"POST",

                  headers:{

                      "Content-Type":
                      "application/json",

                      "Authorization":
                      `Bearer ${localStorage.getItem("token")}`

                  },

                  body: JSON.stringify(dados)
              }
          );

          if(response.ok){

              alert(
                  "Alarme criado!"
              );

          } else {

              alert(
                  "Erro ao criar alarme."
              );
          }
      }

      if(response.ok){

          alarmForm.reset();

          editandoId = null;

          document.querySelector(
              ".btn-save"
          ).textContent =
          "Ativar Alarme";

          carregarAlarmes();
      }

      } catch(erro){

          console.error(erro);

          alert(
              "Erro ao salvar alarme."
          );
      }
  });

// ========================================
// EDITAR
// ========================================

function editarAlarme(id){

  const alarme =
  alarmes.find(
    a => a.id === id
  );

  if(!alarme) return;

  document.getElementById(
    "alarm-type"
  ).value = alarme.tipo;

  document.getElementById(
    "alarm-name"
  ).value = alarme.nome;

  document.getElementById(
    "alarm-frequency"
  ).value = alarme.frequencia;

  document.getElementById(
    "alarm-start"
  ).value = alarme.horaInicio;

  document.getElementById(
    "alarm-note"
  ).value = alarme.observacao;

  editandoId = id;

  document.querySelector(
    ".btn-save"
  ).textContent =
  "Salvar Alterações";

  window.scrollTo({

    top:0,

    behavior:"smooth"

  });

}

// ========================================
// EXCLUIR
// ========================================

async function deletarAlarme(id){

  const confirmar =
  confirm(
    "Deseja excluir este alarme?"
  );

  if(!confirmar) return;

  try {

    await fetch(
      `${API_URL}/${id}`,
      {

        method:"DELETE",
        headers:{
          "Authorization":
          `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

    carregarAlarmes();

  } catch(erro){

    console.error(erro);

  }

}

// ========================================
// NOTIFICAÇÃO
// ========================================

function mostrarNotificacao(alarme){

  let emoji = "💊";

  if(alarme.tipo === "contraceptivo"){

    emoji = "🌸";
  }

  new Notification(

    `${emoji} Hora do seu alarme!`,

    {

      body:
      `${alarme.nome}
⏰ ${alarme.frequencia}h
🕒 ${alarme.horaInicio}`,

      icon:
      "./assets/images/icone.png"

    }

  );

  const horario =
  new Date().toLocaleTimeString(
    "pt-BR",
    {
      hour:"2-digit",
      minute:"2-digit"
    }
  );

  notificacoes.unshift({

    titulo:
    `${emoji} Hora do seu alarme!`,

    mensagem:
    `${alarme.nome}
• ${alarme.frequencia}h`,

    horario,

    lida:false

  });

  localStorage.setItem(

    "notificacoes",

    JSON.stringify(notificacoes)

  );

  renderizarNotificacoes();

}

// ========================================
// VERIFICAR
// ========================================

function verificarAlarmes(){

  const agora = new Date();

  const horaAtual =
  agora.getHours();

  const minutoAtual =
  agora.getMinutes();

  if(minutoAtual !== 0){

    return;
  }

  alarmes.forEach((alarme) => {

    const horaInicio =
    parseInt(
      alarme.horaInicio.split(":")[0]
    );

    const frequencia =
    parseInt(alarme.frequencia);

    let diferenca =
    horaAtual - horaInicio;

    if(diferenca < 0){

      diferenca += 24;
    }

    if(diferenca % frequencia === 0){

      mostrarNotificacao(alarme);

    }

  });

}

// ========================================
// INTERVALO
// ========================================

setInterval(() => {

  verificarAlarmes();

}, 30000);

// ========================================
// INICIALIZAÇÃO
// ========================================

carregarNomeUsuario();

carregarAlarmes();

renderizarNotificacoes();

atualizarBadge();

verificarAlarmes();