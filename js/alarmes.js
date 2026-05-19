// ========================================
// DROPDOWN MENU
// ========================================

const dropdownBtn =
document.querySelector(".dropdown-btn");

const dropdownContent =
document.querySelector(".dropdown-content");

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

const bellIcon =
document.querySelector(".bell-icon");

const notificationSidebar =
document.querySelector(".notification-sidebar");

const closeSidebar =
document.querySelector(".close-sidebar");

// ========================================
// NOTIFICAÇÕES INTERNAS
// ========================================

const notificationBadge =
document.getElementById(
  "notification-badge"
);

// LISTA SIDEBAR

let notificacoes = JSON.parse(
  localStorage.getItem("notificacoes")
) || [];

// ABRIR

bellIcon.addEventListener("click", () => {

  notificationSidebar.classList.add("active");

  // MARCAR COMO LIDAS

  notificacoes.forEach((n) => {

    n.lida = true;

  });

  localStorage.setItem(
    "notificacoes",
    JSON.stringify(notificacoes)
  );

  atualizarBadge();

});

// FECHAR

closeSidebar.addEventListener("click", () => {

  notificationSidebar.classList.remove("active");

});

// ========================================
// DROPDOWN PERFIL
// ========================================

const usuarioInfo =
document.querySelector(".usuario-info");

const profileDropdown =
document.querySelector(".profile-dropdown");

usuarioInfo.addEventListener("click", () => {

  profileDropdown.classList.toggle("active");

});

// ========================================
// NOTIFICATION API
// ========================================

// PEDIR PERMISSÃO

async function pedirPermissaoNotificacao(){

  if(Notification.permission !== "granted"){

    await Notification.requestPermission();

  }

}

// ========================================
// CRUD ALARMES
// ========================================

const alarmForm =
document.getElementById("alarm-form");

const alarmList =
document.getElementById("alarm-list");

// ========================================
// LOCAL STORAGE
// ========================================

let alarmes = JSON.parse(
  localStorage.getItem("alarmes")
) || [];

// ========================================
// CONTROLE EDIÇÃO
// ========================================

let editandoIndex = null;

// ========================================
// CALCULAR PRÓXIMO HORÁRIO
// ========================================

function calcularProximoHorario(
  inicio,
  frequencia
){

  const agora = new Date();

  // HORA INICIAL

  const [horaInicial, minutoInicial] =
  inicio.split(":").map(Number);

  // DATA BASE

  let proximo =
  new Date();

  proximo.setHours(
    horaInicial,
    minutoInicial,
    0,
    0
  );

  // ENCONTRAR PRÓXIMO CICLO

  while(proximo <= agora){

    proximo.setHours(
      proximo.getHours() + frequencia
    );

  }

  // FORMATAR

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

  // HOJE OU AMANHÃ

  const hoje =
  new Date().toDateString();

  const ehHoje =
  proximo.toDateString() === hoje;

  const periodo =
  ehHoje ? "Hoje" : "Amanhã";

  return `${periodo} às ${hora}:${minuto}`;

}

// ========================================
// RENDERIZAR NOTIFICAÇÕES
// ========================================

function renderizarNotificacoes(){

  const container =
  document.querySelector(
    ".notification-list"
  );

  // LIMPAR

  container.innerHTML = "";

  // SEM NOTIFICAÇÕES

  if(notificacoes.length === 0){

    container.innerHTML = `

      <p class="empty-msg">

        Nenhuma notificação.

      </p>

    `;

    atualizarBadge();

    return;
  }

  // RENDERIZAR

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

  alarmes.forEach((alarme, index) => {

    const card =
    document.createElement("div");

    card.classList.add("alarm-item");

    let icone = "💊";

    if(alarme.tipo === "contraceptivo"){

      icone = "🌸";
    }
    const proximoHorario =
    calcularProximoHorario(
      alarme.inicio,
      parseInt(alarme.frequencia)
    );

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
          ${alarme.inicio}
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
          onclick="editarAlarme(${index})"
        >

          Editar

        </button>

        <button
          class="btn-delete"
          onclick="deletarAlarme(${index})"
        >

          Excluir

        </button>

      </div>

    `;

    alarmList.appendChild(card);

  });

}

// ========================================
// SALVAR STORAGE
// ========================================

function salvarLocalStorage(){

  localStorage.setItem(
    "alarmes",
    JSON.stringify(alarmes)
  );

}

// ========================================
// ADICIONAR
// ========================================

alarmForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  // PERMISSÃO

  await pedirPermissaoNotificacao();

  // VALORES

  const tipo =
  document.getElementById("alarm-type").value;

  const nome =
  document.getElementById("alarm-name").value;

  const frequencia =
  document.getElementById("alarm-frequency").value;

  const inicio =
  document.getElementById("alarm-start").value;

  const observacao =
  document.getElementById("alarm-note").value;

  // OBJETO

  const novoAlarme = {

    tipo,
    nome,
    frequencia,
    inicio,
    observacao,
    ultimoDisparo: null

  };

  // ========================================
  // EDITAR OU ADICIONAR
  // ========================================

  if(editandoIndex !== null){

    // MANTER ÚLTIMO DISPARO

    novoAlarme.ultimoDisparo =
    alarmes[editandoIndex]
    .ultimoDisparo;

    // ATUALIZAR

    alarmes[editandoIndex] =
    novoAlarme;

    // RESETAR EDIÇÃO

    editandoIndex = null;

    // BOTÃO VOLTA

    document.querySelector(
      ".btn-save"
    ).textContent =
    "Ativar Alarme";

    alert(
      "Alarme atualizado com sucesso!"
    );

  } else {

    // NOVO

    alarmes.push(novoAlarme);

    alert(
      "Alarme ativado com sucesso!"
    );

  }

  // SALVAR

  salvarLocalStorage();

  // RENDER

  renderizarAlarmes();

  // RESET

  alarmForm.reset();

});
// ========================================
// EDITAR
// ========================================

function editarAlarme(index){

  const alarme =
  alarmes[index];

  // PREENCHER FORM

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
  ).value = alarme.inicio;

  document.getElementById(
    "alarm-note"
  ).value = alarme.observacao;

  // EDITANDO

  editandoIndex = index;

  // ALTERAR BOTÃO

  const botao =
  document.querySelector(
    ".btn-save"
  );

  botao.textContent =
  "Salvar Alterações";

  // SCROLL SUAVE

  window.scrollTo({

    top:0,

    behavior:"smooth"

  });

}

// ========================================
// EXCLUIR
// ========================================

function deletarAlarme(index){

  const confirmar =
  confirm("Deseja excluir este alarme?");

  if(!confirmar){

    return;
  }

  alarmes.splice(index, 1);

  salvarLocalStorage();

  renderizarAlarmes();

}

// ========================================
// VERIFICAR HORÁRIOS
// ========================================

function verificarAlarmes(){

  const agora = new Date();

  const horaAtual =
  agora.getHours();

  const minutoAtual =
  agora.getMinutes();

  // APENAS HORAS CHEIAS

  if(minutoAtual !== 0){

    return;
  }

  alarmes.forEach((alarme) => {

    const horaInicio =
    parseInt(
      alarme.inicio.split(":")[0]
    );

    const frequencia =
    parseInt(alarme.frequencia);

    // CALCULAR DIFERENÇA

    let diferenca =
    horaAtual - horaInicio;

    // AJUSTE VIRADA DIA

    if(diferenca < 0){

      diferenca += 24;
    }

    // VERIFICAR HORÁRIO

    if(diferenca % frequencia === 0){

      // EVITAR REPETIR

      const hoje =
      new Date().toDateString();

      const identificador =
      `${hoje}-${horaAtual}-${alarme.nome}`;

      if(
        alarme.ultimoDisparo === identificador
      ){

        return;
      }

      // NOTIFICAÇÃO

      mostrarNotificacao(alarme);

      // SALVAR DISPARO

      alarme.ultimoDisparo =
      identificador;

      salvarLocalStorage();

    }

  });

}

// ========================================
// NOTIFICAÇÃO
// ========================================
function mostrarNotificacao(alarme){

  let emoji = "💊";

  if(alarme.tipo === "contraceptivo"){

    emoji = "🌸";
  }

  // ========================================
  // NOTIFICAÇÃO NAVEGADOR
  // ========================================

  new Notification(

    `${emoji} Hora do seu alarme!`,

    {

      body:
      `${alarme.nome}

⏰ Frequência:
${alarme.frequencia}h

🕒 Início:
${alarme.inicio}`,

      icon:
      "./assets/images/icone.png"

    }

  );

  // ========================================
  // SIDEBAR
  // ========================================

  const agora =
  new Date();

  const horario =
  agora.toLocaleTimeString(
    "pt-BR",
    {
      hour:"2-digit",
      minute:"2-digit"
    }
  );

  const novaNotificacao = {

    titulo:
    `${emoji} Hora do seu alarme!`,

    mensagem:
    `${alarme.nome}
    • ${alarme.frequencia}h`,

    horario,

    lida:false

  };

  // ADICIONAR

  notificacoes.unshift(
    novaNotificacao
  );

  // LIMITAR

  if(notificacoes.length > 20){

    notificacoes.pop();

  }

  // SALVAR

  localStorage.setItem(

    "notificacoes",

    JSON.stringify(notificacoes)

  );

  // RENDERIZAR

  renderizarNotificacoes();

}

// ========================================
// INTERVALO
// ========================================

// VERIFICA A CADA 1 MINUTO

setInterval(() => {

  verificarAlarmes();

}, 30000);



// ========================================
// INICIALIZAÇÃO
// ========================================

renderizarAlarmes();

renderizarNotificacoes();

verificarAlarmes();