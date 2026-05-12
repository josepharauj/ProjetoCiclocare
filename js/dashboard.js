const calendarGrid = document.getElementById('calendarGrid');

const monthYear = document.getElementById('monthYear');

const prevMonth = document.getElementById('prevMonth');

const nextMonth = document.getElementById('nextMonth');

let currentDate = new Date();

function renderCalendar(){

  calendarGrid.innerHTML = '';

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

  monthYear.textContent =
  `${monthNames[month]} ${year}`;

  for(let i = firstDay; i > 0; i--) {
    const dayElement = document.createElement("div");

    dayElement.classList.add("day", "other-month");
    dayElement.textContent = String(prevLastDate - i + 1).padStart(2, "0");

    calendarGrid.appendChild(dayElement);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayElement = document.createElement('div');

    dayElement.classList.add('day', 'current-month');
    dayElement.textContent = String(day).padStart(2, '0');

    dayElement.addEventListener('click', () => {
      dayElement.classList.toggle('selected');
    });

    calendarGrid.appendChild(dayElement);
  }

  const totalCells = firstDay + lastDate;
  const nextDays = 42 - totalCells;

  for (let day = 1; day <= nextDays; day++) {
    const dayElement = document.createElement('div');

    dayElement.classList.add('day', 'other-month');
    dayElement.textContent = String(day).padStart(2, '0');

    calendarGrid.appendChild(dayElement);
  }
}


prevMonth.addEventListener('click', () => {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderCalendar();
});

nextMonth.addEventListener('click', () => {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderCalendar();
});

renderCalendar();

const ctx =
document.getElementById('cycleChart');

new Chart(ctx, {

  type:'line',

  data:{

    labels:[
      'Dom',
      'Seg',
      'Ter',
      'Qua',
      'Qui',
      'Sex',
      'Sáb'
    ],

    datasets:[

      {

        label:'Humor',

        data:[12, 25, 19, 24, 22, 38, 20],

        borderColor:'#d48fb0',

        backgroundColor:
        'rgba(212,143,176,0.2)',

        tension:0.4,

        fill:true
      },

      {

        label:'Energia',

        data:[10, 28, 22, 18, 30, 40, 15],

        borderColor:'#c79672',

        backgroundColor:
        'rgba(199,150,114,0.2)',

        tension:0.4,

        fill:true
      }

    ]
  },

  options:{

    responsive:true,

    maintainAspectRatio:false
  }

});

const moodButtons =
document.querySelectorAll('.mood-btn');

const currentMood =
document.getElementById('currentMood');

let humorSelecionado = '';

moodButtons.forEach(button => {

  button.addEventListener('click', () => {

    moodButtons.forEach(btn =>

      btn.classList.remove(
        'selectedMood'
      )
    );

    button.classList.add(
      'selectedMood'
    );

    const emoji =
    button.innerText;

    const humor =
    button.dataset.humor;

    humorSelecionado =
    `${humor} ${emoji}`;

    currentMood.innerText =
    humorSelecionado;

  });

});

const energyButtons =
document.querySelectorAll('.energy-btn');

const currentEnergy =
document.getElementById('currentEnergy');

let energiaSelecionada = '';

energyButtons.forEach(button => {

  button.addEventListener('click', () => {

    energyButtons.forEach(btn =>

      btn.classList.remove(
        'selectedEnergy'
      )
    );

    button.classList.add(
      'selectedEnergy'
    );

    const emoji =
    button.innerText;

    const texto =
    button.dataset.energy;

    energiaSelecionada =
    `${emoji} ${texto}`;

    currentEnergy.innerText =
    energiaSelecionada;

  });

});

const pregnancyToggle =
document.getElementById(
  'pregnancyToggle'
);

pregnancyToggle.addEventListener(
  'change',
  () => {

    const body =
    document.body;

    const suggestion =
    document.getElementById(
      'suggestionText'
    );

    if(pregnancyToggle.checked){

      body.classList.add(
        'gestante-mode'
      );

      suggestion.innerText =
      'Momento ideal para descansar, manter hidratação e acompanhar sua saúde 💖';

    }else{

      body.classList.remove(
        'gestante-mode'
      );

      suggestion.innerText =
      'Aproveite para iniciar projetos ou estudar.';
    }

  }
);

// Função para abrir o modal de inserção manual
function abrirModal() {
    document.getElementById('modalParametros').style.display = 'flex';
}

function fecharModal() {
    document.getElementById('modalParametros').style.display = 'none';
}

function salvarParametros() {
    const ciclo = document.getElementById('cicloInput').value;
    const lutea = document.getElementById('luteaInput').value;

    if(ciclo && lutea) {
        // Logica para salvar os dados futuramente
        alert("Configurações salvas com sucesso!");
        fecharModal();
    } else {
        alert("Preencha todos os campos.");
    }
}