let tamanhoFonte = 16;
let leitorCegoAtivo = false;

// Função universal de fala com a Web Speech API
function falarTexto(texto) {
    if (!leitorCegoAtivo) return;
    window.speechSynthesis.cancel();
    let speech = new SpeechSynthesisUtterance(texto);
    speech.lang = 'pt-BR';
    window.speechSynthesis.speak(speech);
}

// Ouvinte de eventos de fala dinâmica para elementos ao passar o mouse
document.addEventListener("mouseover", function(e) {
    if(leitorCegoAtivo && (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'H3' || e.target.tagName === 'SPAN')) {
        falarTexto(e.target.innerText);
    }
});

// Sistema de navegação de abas
function mostrarPagina(id){
    let paginas = document.querySelectorAll(".pagina");
    paginas.forEach(p => p.classList.remove("ativa"));
    
    let botoes = document.querySelectorAll("nav button");
    botoes.forEach(b => b.classList.remove("nav-ativo"));

    const paginaAlvo = document.getElementById(id);
    paginaAlvo.classList.add("ativa");
    document.getElementById("btn-" + id).classList.add("nav-ativo");
    
    window.scrollTo({top: 0, behavior: 'smooth'});

    setTimeout(() => {
        falarTexto(paginaAlvo.innerText);
    }, 300);
}

// Ativa o interesse em um imóvel e redireciona ao formulário
function interesseImovel(nomeImovel) {
    mostrarPagina('contato');
    document.getElementById('imovelInteresse').value = nomeImovel;
    falarTexto("Você selecionou o imóvel " + nomeImovel + ". O formulário está pronto.");
}

const nome = document.getElementById("nome").value;

const popup = document.createElement("div");

popup.innerHTML = `
<div class="popup-sucesso">
    <div class="popup-conteudo">
        <div class="icone-sucesso">✓</div>

        <h2>Solicitação Recebida!</h2>

        <p>
            Obrigado, <strong>${nome}</strong>.
            Sua solicitação foi enviada com sucesso.
        </p>

        <p>
            Nossa equipe especializada em imóveis sustentáveis
            analisará seus dados e entrará em contato em breve.
        </p>

        <button onclick="this.parentElement.parentElement.remove()">
            Fechar
        </button>
    </div>
</div>
`;

document.body.appendChild(popup);

document.getElementById("formContato").reset();

/* CONFIGURAÇÕES DO PAINEL DE ACESSIBILIDADE */
function toggleLeitorCego() {
    leitorCegoAtivo = !leitorCegoAtivo;
    document.getElementById("opt-leitor").innerText = leitorCegoAtivo ? "Modo Pessoa Cega: ATIVADO ✅" : "Modo Pessoa Cega: DESATIVADO";
    if(leitorCegoAtivo) {
        falarTexto("Modo de leitura integrado ativo. O site falará os textos automaticamente ao navegar e interagir.");
    } else {
        window.speechSynthesis.cancel();
    }
}
function toggleModoSurdo(){
    const ativo = document.body.classList.toggle("modo-surdo-ativo");

    document.getElementById("opt-surdo").innerText =
        ativo
        ? "Modo Alerta Visual: ATIVADO ✅"
        : "Modo Alerta Visual: DESATIVADO";

    const alerta = document.getElementById("alertaVisual");

    if(ativo){
        alerta.style.display = "block";

        setTimeout(() => {
            alerta.style.display = "none";
        }, 3000);
    }
}


function abrirPainel(){ 
    const p = document.getElementById("painel");
    p.classList.add("ativo");
    p.setAttribute("aria-hidden", "false");
    falarTexto("Menu de acessibilidade aberto.");
}

function fecharPainel(){ 
    const p = document.getElementById("painel");
    p.classList.remove("ativo"); 
    p.setAttribute("aria-hidden", "true");
}

function aumentarFonte(){ 
    tamanhoFonte += 2; 
    document.body.style.fontSize = tamanhoFonte + "px"; 
}

function diminuirFonte(){ 
    if(tamanhoFonte > 12){ 
        tamanhoFonte -= 2; 
        document.body.style.fontSize = tamanhoFonte + "px"; 
    } 
}

function modoEscuro(){
    document.documentElement.classList.toggle("dark");
}
function altoContraste(){ document.body.classList.toggle("contraste"); }

function tratarCliqueBotao(event){
    event.preventDefault();

    const painel = document.getElementById("painel");

    if(painel.classList.contains("ativo")){
        fecharPainel();
    } else {
        abrirPainel();
    }
}

function iniciarArrasto(event){
    // Mantida apenas para evitar erro
}

function tratarCliqueBotao(event){
    event.preventDefault();

    const painel = document.getElementById("painel");

    painel.classList.toggle("ativo");
}

function iniciarArrasto(event){
    // apenas evita erro
}

function abrirPainel(){
    document.getElementById("painel").style.display = "flex";
}

function fecharPainel(){
    document.getElementById("painel").style.display = "none";
}