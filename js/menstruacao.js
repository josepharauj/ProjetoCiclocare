// ================================
// CICLOCARE - MENSTRUAÇÃO
// ================================

const ciclos =
    JSON.parse(localStorage.getItem("ciclos")) || [];

const configuracoes = {
    duracao:
        parseInt(localStorage.getItem("duracaoCiclo")) || 28,

    faseLutea:
        parseInt(localStorage.getItem("faseLutea")) || 14
};

// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener("DOMContentLoaded", () => {
    atualizarHistorico();
    calcularPrevisao();
    atualizarResumo();
});

// ================================
// SALVAR CICLO
// ================================

function salvarCiclo() {

    const inicio =
        document.getElementById("inicio").value;

    const fim =
        document.getElementById("fim").value;

    const fluxo =
        document.getElementById("fluxo").value;

    if (!inicio || !fim || !fluxo) {
        mostrarMensagem(
            "Preencha todos os campos.",
            "erro"
        );
        return;
    }

    const novoCiclo = {
        id: Date.now(),
        inicio,
        fim,
        fluxo
    };

    ciclos.push(novoCiclo);

    localStorage.setItem(
        "ciclos",
        JSON.stringify(ciclos)
    );

    atualizarHistorico();
    calcularPrevisao();
    atualizarResumo();

    limparFormulario();

    mostrarMensagem(
        "Ciclo salvo com sucesso 💖",
        "sucesso"
    );
}

// ================================
// CONFIGURAÇÕES
// ================================

function salvarConfiguracoes() {

    const duracao =
        document.getElementById("duracaoCiclo").value;

    const faseLutea =
        document.getElementById("faseLutea").value;

    localStorage.setItem(
        "duracaoCiclo",
        duracao
    );

    localStorage.setItem(
        "faseLutea",
        faseLutea
    );

    calcularPrevisao();

    mostrarMensagem(
        "Configurações atualizadas ✨",
        "sucesso"
    );
}

// ================================
// PREVISÃO
// ================================

function calcularPrevisao() {

    const previsao =
        document.getElementById("previsao");

    if (!previsao) return;

    if (ciclos.length === 0) {

        previsao.innerHTML = `
            <span class="texto-secundario">
                Sem dados suficientes.
            </span>
        `;

        return;
    }

    const ultimoCiclo =
        ciclos[ciclos.length - 1];

    const dataInicio =
        new Date(ultimoCiclo.inicio);

    dataInicio.setDate(
        dataInicio.getDate() +
        configuracoes.duracao
    );

    const dataFormatada =
        dataInicio.toLocaleDateString("pt-BR");

    previsao.innerHTML = `
        <div class="previsao-card">
            <h3>Próxima menstruação</h3>

            <p>${dataFormatada}</p>
        </div>
    `;
}

// ================================
// HISTÓRICO
// ================================

function atualizarHistorico() {

    const historico =
        document.getElementById("historico");

    if (!historico) return;

    historico.innerHTML = "";

    if (ciclos.length === 0) {

        historico.innerHTML = `
            <div class="card-vazio">
                Nenhum ciclo registrado.
            </div>
        `;

        return;
    }

    ciclos
        .slice()
        .reverse()
        .forEach((ciclo, index) => {

            const card =
                document.createElement("div");

            card.classList.add("card-historico");

            card.innerHTML = `
                <div class="historico-topo">

                    <h3>
                        Ciclo ${ciclos.length - index}
                    </h3>

                    <button
                        class="btn-excluir"
                        onclick="excluirCiclo(${ciclo.id})"
                    >
                        ✕
                    </button>

                </div>

                <div class="historico-info">

                    <p>
                        <strong>Início:</strong>
                        ${formatarData(ciclo.inicio)}
                    </p>

                    <p>
                        <strong>Fim:</strong>
                        ${formatarData(ciclo.fim)}
                    </p>

                    <p>
                        <strong>Fluxo:</strong>
                        ${ciclo.fluxo}
                    </p>

                </div>
            `;

            historico.appendChild(card);
        });
}

// ================================
// RESUMO
// ================================

function atualizarResumo() {

    const resumo =
        document.getElementById("resumoCiclo");

    if (!resumo) return;

    if (ciclos.length === 0) {

        resumo.innerHTML = `
            Nenhum dado disponível.
        `;

        return;
    }

    const ultimo =
        ciclos[ciclos.length - 1];

    resumo.innerHTML = `
        <div class="resumo-card">

            <h3>Último ciclo registrado</h3>

            <p>
                ${formatarData(ultimo.inicio)}
                até
                ${formatarData(ultimo.fim)}
            </p>

            <span class="tag-fluxo">
                ${ultimo.fluxo}
            </span>

        </div>
    `;
}

// ================================
// EXCLUIR CICLO
// ================================

function excluirCiclo(id) {

    const indice =
        ciclos.findIndex(ciclo => ciclo.id === id);

    if (indice !== -1) {

        ciclos.splice(indice, 1);

        localStorage.setItem(
            "ciclos",
            JSON.stringify(ciclos)
        );

        atualizarHistorico();
        calcularPrevisao();
        atualizarResumo();

        mostrarMensagem(
            "Registro removido.",
            "erro"
        );
    }
}

// ================================
// FORMATAÇÕES
// ================================

function formatarData(data) {

    return new Date(data)
        .toLocaleDateString("pt-BR");
}

function limparFormulario() {

    document.getElementById("inicio").value = "";
    document.getElementById("fim").value = "";
    document.getElementById("fluxo").value = "";
}

// ================================
// ALERTA VISUAL
// ================================

function mostrarMensagem(texto, tipo) {

    const mensagem =
        document.createElement("div");

    mensagem.classList.add(
        "mensagem-flutuante"
    );

    mensagem.classList.add(tipo);

    mensagem.innerText = texto;

    document.body.appendChild(mensagem);

    setTimeout(() => {
        mensagem.classList.add("mostrar");
    }, 100);

    setTimeout(() => {

        mensagem.classList.remove("mostrar");

        setTimeout(() => {
            mensagem.remove();
        }, 300);

    }, 3000);
}