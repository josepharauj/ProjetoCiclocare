document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // USUÁRIO LOGADO
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
// =========================
// DROPDOWN MENU
// =========================

const dropdownBtn =
document.querySelector(".dropdown-btn");

const dropdownContent =
document.querySelector(".dropdown-content");

if (dropdownBtn && dropdownContent) {

    dropdownBtn.addEventListener("click", () => {

        dropdownContent.classList.toggle("active");

    });
}

// =========================
// SIDEBAR NOTIFICAÇÕES
// =========================

const bellIcon =
document.querySelector(".bell-icon");

const notificationSidebar =
document.querySelector(".notification-sidebar");

const closeSidebar =
document.querySelector(".close-sidebar");

if (bellIcon && notificationSidebar) {

    bellIcon.addEventListener("click", () => {

        notificationSidebar.classList.add("active");

    });
}

if (closeSidebar && notificationSidebar) {

    closeSidebar.addEventListener("click", () => {

        notificationSidebar.classList.remove("active");

    });
}

// =========================
// DROPDOWN PERFIL
// =========================

const usuarioInfo =
document.querySelector(".usuario-info");

const profileDropdown =
document.querySelector(".profile-dropdown");

if (usuarioInfo && profileDropdown) {

    usuarioInfo.addEventListener("click", () => {

        profileDropdown.classList.toggle("active");

    });
}

    const textareaResumo = document.getElementById("resumoHoje");

    const botoes = document.querySelectorAll(".opcao");

    atualizarResumo();

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {
            botao.classList.toggle("selecionado");
            atualizarResumo();
        });
    });

    const campoBusca = document.getElementById("campo-busca");

    campoBusca.addEventListener("input", () => {

        const texto = campoBusca.value.toLowerCase();

        const botoes =
        document.querySelectorAll(".opcao");

        botoes.forEach(botao => {

            const conteudo =
            botao.innerText.toLowerCase();

            if (conteudo.includes(texto)) {

                botao.style.display = "flex";

            } else {

                botao.style.display = "none";
            }
        });
    });

    function atualizarResumo() {

        const resumo = document.getElementById("resumoHoje");

        resumo.value = "";

        const selecionados =
            document.querySelectorAll(".opcao.selecionado");

        const textos = [];

        selecionados.forEach(opcao => {

            textos.push(
                opcao.textContent.trim()
            );
        });

        resumo.value = textos.join(", ");
    }

    const botaoSalvar = document.getElementById("salvarRegistro");

    botaoSalvar.addEventListener("click", async () => {

        try {

            const token = localStorage.getItem("token");

            console.log("TOKEN:", token);

            const humor = [];
            const sintomas = [];
            const sexoLibido = [];
            const secrecao = [];

            const selecionados = document.querySelectorAll(".opcao.selecionado");

            selecionados.forEach(opcao => {

                const texto = opcao.textContent.trim();

                if (opcao.classList.contains("humor")) {
                    humor.push(texto);
                }

                else if (opcao.classList.contains("sintomas")) {
                    sintomas.push(texto);
                }

                else if (opcao.classList.contains("sexo")) {
                    sexoLibido.push(texto);
                }

                else if (opcao.classList.contains("secrecao")) {
                    secrecao.push(texto);
                }
            });

            const dados = {
                humor: humor,
                sintomas: sintomas,
                sexoLibido: sexoLibido,
                secrecao: secrecao,
                observacao: document
                    .getElementById("resumoHoje")
                    .value
            };

            console.log("DADOS ENVIADOS:", dados);

            const response = await fetch(
                "http://localhost:8080/api/sintomas/salvar",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(dados)
                }
            );

            console.log("STATUS:", response.status);

            const texto = await response.text();

            console.log("RESPOSTA:", texto);

            if (response.ok) {

                alert("Registro salvo com sucesso!");
                window.location.href = "index.html";

            } else {

                alert("Erro ao salvar registro.");
            }

        } catch (erro) {

              console.error("ERRO COMPLETO:", erro);

              console.log("MENSAGEM:", erro.message);

              console.log("STACK:", erro.stack);

              alert("Erro ao salvar registro.");
          }
    });
});

