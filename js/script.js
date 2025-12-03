function mostrarEtapa1() {
    document.getElementById("cardInicial").style.display = "none";
    document.getElementById("etapa1").style.display = "block";

    const audio = document.getElementById("music");
    audio.currentTime = 41;
    audio.play();
}

function mostrarEtapa2() {
    document.getElementById("etapa1").style.display = "none";
    document.getElementById("etapa2").style.display = "block";
}

function mostrarEtapa3() {
    document.getElementById("etapa2").style.display = "none";
    document.getElementById("etapa3").style.display = "block";
}

function mostrarMensagemFinal() {
    document.getElementById("etapa3").style.display = "none";
    document.getElementById("final").style.display = "block";
    espalharFotos();


    window.textoCompleto = `
        Você é uma garota forte, incrível, decidida e que eu admiro muito e estou gostando de conhecer um pouco a cada dia que passa mesmo voce sendo tranqueira. Obrigado por me permitir te conhecer cada dia mais. <br><br>
        Saiba que mesmo que por pouco tempo que nos conhecemos, eu entendo seu tempo. Porém quero que saiba: 
        eu estou do seu lado hoje e sempre para compartilharmos dias ruins e dias felizes. <br><br>
        Se eu tiver a oportunidade de deixar seu dia nem que seja 1% mais feliz, eu estou disposto. ❤️<br><br>
    `;

    window.interacoes = `
        <strong>Curiosidades sobre ela</strong><br><br>
        <button onclick="perguntar('Idade: 23 ❤️')">Qual a sua idade?</button><br>
        <button onclick="perguntar('Uma das mais lindas que existem, afinal tudo que é feito com amor e dedicação se torna lindo e ela é uma bela Enfermeira 💉❤️')">Qual sua profissão?</button><br>
        <button onclick="perguntar('Ama aproveitar a Vida ✨')">Uma qualidade dela?</button><br>
        <button onclick="perguntar('Defeito: estar longe de mim 😢❤️')">um defeito?</button><br>
        <button onclick="perguntar('Encheria de beijos e um abraço dando a maior segurança que mesmo ela podendo lidar com as coisas espero um dia ser sua base para confiar e se sentir segura.❤️')">O que eu gostaria de fazer com ela agora?</button>
        <button onclick="perguntar('Eu gosto de você até quando você fala que é “fria”. Spoiler: você não é. Você é só protegida, e eu respeito isso ❤️🥺')">Uma possivel verdade sobre você?</button>
        <button onclick="abrirPopupPergunta()">O Mateus é Tranqueira?</button>
    `;

    const mensagem = document.getElementById("mensagem");
    mensagem.style.display = "block";
    mensagem.innerHTML = `
        <button id="btnLerMais" onclick="animarTexto()">Ler mais 💬</button>
        <div id="textoDigitado" style="display:none; margin-top:10px;"></div>
        <div id="interacoes" style="display:none; margin-top:20px;"></div>
    `;
}

function animarTexto() {
    const area = document.getElementById("textoDigitado");
    const botao = document.getElementById("btnLerMais");

    botao.style.display = "none";
    area.style.display = "block";

    let index = 0;
    const texto = window.textoCompleto;

    function digitar() {
        area.innerHTML = texto.substring(0, index);
        index++;
        if (index <= texto.length) {
            setTimeout(digitar, 12);
        } else {
            document.getElementById("interacoes").innerHTML = window.interacoes;
            document.getElementById("interacoes").style.display = "block";
        }
    }
    digitar();
}

function perguntar(texto) {
    document.getElementById("popup-text").innerHTML = texto;
    document.getElementById("popup").style.display = "flex";
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}

function abrirPopupPergunta() {
    document.getElementById("popupTranqueira").style.display = "flex";
}

function desviarBotao() {
    const btn = document.getElementById("btnSim2");

    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;

    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function popupEspecial() {
    const conteudo = document.getElementById("popupTranqueira-content");
    conteudo.innerHTML = `
        <p>Eu sabia que você assumiria essa verdade 😌❤️</p>
        <button onclick="fecharPopupEspecial()">Fechar</button>
    `;
}

function fecharPopupEspecial() {
    document.getElementById("popupTranqueira").style.display = "none";
}

function espalharFotos() {
    // paths das 10 fotos (confira nomes)
    const fotos = [
        "assets/f1.png",
        "assets/f3.png",
        "assets/f2.png",
        "assets/f4.png",
        "assets/f5.png",
        "assets/f6.png",
        "assets/f7.png",
        "assets/f8.png",
        "assets/f9.png",
        "assets/f10.png"
    ];

    // remove fotos antigas se já existirem
    document.querySelectorAll('.foto-solta').forEach(el => el.remove());

    // parâmetros de posicionamento
    const startTop = 18;    // topo da primeira foto (vh)
    const stepBase = 8;     // passo base entre fotos (vh)
    const minGap = 6;       // gap mínimo entre tops (vh)

    // ranges horizontais (próximas ao centro, sem invadir modal)
    const leftRangeLeft = {min: 6, max: 14};   // esquerda (vw)
    const leftRangeRight = {min: 76, max: 84}; // direita (vw)

    let lastTop = 0;

    for (let i = 0; i < fotos.length; i++) {
        const src = fotos[i];
        const img = document.createElement("img");
        img.src = src;
        img.className = "foto-solta";

        // calculo do top: base descendente + jitter, garantindo gap minimo
        const baseTop = startTop + Math.floor(i/2) * stepBase; 
        // floor(i/2) porque cada "par" ocupa aproximadamente o mesmo nível vertical
        // agora adicionamos jitter vertical entre -2 e +2
        const jitter = (Math.random() * 4) - 2; // -2 .. +2
        let top = baseTop + jitter;

        // garantir que top esteja pelo menos minGap abaixo do lastTop
        if (i > 0 && top < lastTop + minGap) {
            top = lastTop + minGap;
        }
        lastTop = top;

        // alternar esquerda/direita
        const isLeft = (i % 2 === 0); // par -> esquerda, ímpar -> direita
        const leftRange = isLeft ? leftRangeLeft : leftRangeRight;
        // jitter horizontal pequeno para não ficar alinhado demais
        const leftJitter = (Math.random() * 6) - 3; // -3 .. +3 vw
        let left = (leftRange.min + leftRange.max) / 2 + leftJitter;

        // limitar dentro do range
        if (left < leftRange.min) left = leftRange.min;
        if (left > leftRange.max) left = leftRange.max;

        // pequena rotação aleatória para efeito polaroid
        const rotate = (Math.random() * 18) - 9; // -9deg .. +9deg

        // aplicar estilo
        img.style.top = top + "vh";
        img.style.left = left + "vw";
        img.style.transform = `rotate(${rotate}deg)`; // animação inicial via keyframes ajustará scale/opacidade
        img.style.animationDelay = (i * 0.12) + "s";

        document.body.appendChild(img);
    }
}

