// Elementos del DOM
const textarea = document.getElementById('desahogo');
const textareaWrapper = document.getElementById('textarea-wrapper');
const crackOverlay = document.getElementById('crack-overlay');
const eatingDevil = document.getElementById('eating-devil');
const dramaSlider = document.getElementById('drama-level');
const dramaValue = document.getElementById('drama-value');
const dramaEmoji = document.getElementById('drama-emoji');
const msg = document.getElementById('success-msg');
const btnCert = document.getElementById('btn-cert');

// Botones de acción
const btnConsejo = document.getElementById('btn-consejo');
const btnBurn = document.getElementById('btn-burn');
const btnShred = document.getElementById('btn-shred');
const btnFeed = document.getElementById('btn-feed');

// Modal
const modal = document.getElementById('humor-modal');
const closeModal = document.getElementById('close-modal');
const humorTexto = document.getElementById('humor-texto');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalBox = document.getElementById('modal-box');

// Arrays de textos
const malosConsejos = [
    "Renuncia a tu trabajo y hazte pastor de alpacas en los Andes. No necesitas este estrés.",
    "Escríbele a tu ex a las 3 AM diciendo 'tenemos que hablar'. ¿Qué es lo peor que podría pasar?",
    "Pide un préstamo en el banco y juégatelo todo al rojo en el casino. Problema solucionado.",
    "La violencia nunca es la respuesta. Es una pregunta, y la respuesta es SÍ. (Broma, mejor quema esto).",
    "Finge tu propia muerte y múdate a otra ciudad con un nombre falso. Es más fácil que afrontarlo.",
    "Córtate el flequillo tú mismo frente al espejo. Seguro que esta vez sale bien y te distrae del problema real."
];

const frasesHumor = [
    "Al menos esto tuvo mejor chispa que tus relaciones amorosas.",
    "Ojalá quemar calorías fuera tan fácil como hacer clic en este botón.",
    "El servidor leyó tu desahogo y pidió cita con el psicólogo. ¡Qué intensidad!",
    "Si te sirve de consuelo, a esta página web le importan tanto tus problemas como a tu ex.",
    "Enhorabuena, ya superaste la cantidad de drama diario recomendado. Ve a tomar agua.",
    "Listo, evidencia destruida. Ahora vuelve ahí fuera y finge demencia como el resto de nosotros.",
    "Tranquilo, el universo tampoco tiene idea de qué está haciendo. No estás solo."
];

const mensajesDieta = [
    "BURP... Estaba un poco salado por tus lágrimas, pero gracias. 🌮",
    "Estaba rico, pero me dio acidez leer tanto drama. 🤢",
    "Uff, pesado. Casi me atraganto con tu ansiedad. ¡Manda más luego! 😈"
];

// 1. Termómetro del Drama
const dramaTexts = { 
    1: "Ligera molestia", 
    2: "Incomodidad", 
    3: "Fastidio", 
    4: "Día pesado", 
    5: "Neutral", 
    6: "Frustración", 
    7: "Enojo", 
    8: "Furia", 
    9: "Crisis existencial", 
    10: "Fin del mundo" 
};
const emojis = { 1: "🥱", 2: "😕", 3: "😒", 4: "🙁", 5: "😐", 6: "😠", 7: "😡", 8: "🤬", 9: "🤯", 10: "🔥" };
dramaSlider.addEventListener('input', (e) => {
    let val = e.target.value;
    dramaValue.textContent = val;
    dramaEmoji.textContent = emojis[val] || "😐";
    document.getElementById('drama-text').textContent = " - " + dramaTexts[val];
});

// 2. Terapia de Golpes (Click Rage Realista)
let clickCount = 0;
let clickTimer;

textarea.addEventListener('mousedown', (e) => {
    clickCount++;
    
    // Reiniciar conteo si se deja de hacer clic rápido
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clickCount = 0; }, 800);

    // Pequeña sacudida siempre
    textareaWrapper.classList.remove('shake-little');
    void textareaWrapper.offsetWidth; // trigger reflow
    textareaWrapper.classList.add('shake-little');

    // Si hay ira (más de 2 clics), crear una grieta exactamente donde hizo clic
    if (clickCount >= 3) {
        const rect = textarea.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        let crack = document.createElement('div');
        crack.className = 'glass-crack';
        crack.style.left = x + 'px';
        crack.style.top = y + 'px';
        
        // Rotación y escala aleatoria
        let rot = Math.random() * 360;
        let scale = Math.random() * 0.6 + 0.6; // Entre 0.6 y 1.2
        
        crack.style.setProperty('--rot', rot + 'deg');
        crack.style.setProperty('--scl', scale);
        
        crackOverlay.appendChild(crack);
        
        // Sacudida violenta
        textareaWrapper.classList.remove('shake-hard');
        void textareaWrapper.offsetWidth;
        textareaWrapper.classList.add('shake-hard');
    }
});

function clearCracks() {
    crackOverlay.innerHTML = '';
}

// Abrir Modal
function openModal(text, imageSrc, isCertificate = false) {
    humorTexto.innerHTML = text;
    if (isCertificate) {
        modalTitle.textContent = "Certificado Oficial de Supervivencia";
        modalTitle.style.display = 'block';
        modalImg.style.display = 'none'; // ocultar diablo en cert
        modalBox.classList.add('certificate-style');
        
        humorTexto.innerHTML += `
            <div class="signature-box">
                <span class="devil-signature">El Diablo</span>
                <div class="signature-line">CEO del Inframundo</div>
            </div>
        `;
    } else {
        modalImg.src = imageSrc;
        modalTitle.style.display = 'none';
        modalImg.style.display = 'inline-block';
        modalBox.classList.remove('certificate-style');
    }
    modal.classList.add('show-modal');
}

closeModal.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

// Oráculo
btnConsejo.addEventListener('click', () => {
    let consejo = malosConsejos[Math.floor(Math.random() * malosConsejos.length)];
    modalImg.classList.remove('laughing-diablo'); // solo que te mire normal
    openModal(consejo, 'diablito_chistoso.png');
});

// Bloquear UI
function disableUI() {
    textarea.disabled = true;
    btnBurn.disabled = true;
    btnShred.disabled = true;
    btnFeed.disabled = true;
}
function enableUI() {
    textarea.disabled = false;
    btnBurn.disabled = false;
    btnShred.disabled = false;
    btnFeed.disabled = false;
    textarea.value = '';
    clearCracks();
}

// 3. Modos de Destrucción
btnBurn.addEventListener('click', () => {
    if (textarea.value.trim() === '') return;
    disableUI();
    clearCracks();
    
    // Nivel de drama determina si la pantalla tiembla
    if (dramaSlider.value >= 8) {
        document.body.classList.add('earthquake');
    }
    
    textarea.classList.add('burning');
    createAshes();

    setTimeout(() => {
        document.body.classList.remove('earthquake');
        finishDestruction(frasesHumor);
    }, 2000);
});

btnShred.addEventListener('click', () => {
    if (textarea.value.trim() === '') return;
    disableUI();
    clearCracks();
    textarea.classList.add('shredding');
    
    createShreds();

    setTimeout(() => {
        finishDestruction(["El confeti de tus desgracias ha sido creado. ¡Celébralo!"]);
    }, 2500);
});

btnFeed.addEventListener('click', () => {
    if (textarea.value.trim() === '') return;
    disableUI();
    clearCracks();
    
    // 1. Mostrar diablo
    eatingDevil.classList.add('show');
    
    // 2. Iniciar succión poco después
    setTimeout(() => {
        textarea.classList.add('feeding');
    }, 400);
    
    // 3. Empezar a masticar cuando esté casi adentro
    setTimeout(() => {
        eatingDevil.classList.add('chewing');
    }, 1600); // 400 + 1200
    
    // 4. Terminar, ocultar diablo y abrir modal
    setTimeout(() => {
        eatingDevil.classList.remove('show', 'chewing');
        finishDestruction(mensajesDieta);
    }, 2800);
});

function finishDestruction(messagesArray) {
    textarea.classList.remove('burning', 'shredding', 'feeding');
    textarea.style.display = 'none';
    document.querySelector('.action-buttons').style.display = 'none';
    
    msg.classList.add('show-msg');
    let textoModal = messagesArray[Math.floor(Math.random() * messagesArray.length)];
    
    setTimeout(() => {
        modalImg.classList.add('laughing-diablo');
        openModal(textoModal, 'diablito_riendo.png');
    }, 1000);

    setTimeout(() => {
        msg.classList.remove('show-msg');
        textarea.style.display = 'block';
        document.querySelector('.action-buttons').style.display = 'flex';
        enableUI();
        
        // Show certificate button if drama >= 8
        if (dramaSlider.value >= 8) {
            btnCert.classList.remove('hidden-cert');
            btnCert.classList.add('show-cert');
        }
    }, 6000);
}

// Certificado
btnCert.addEventListener('click', () => {
    openModal("Se hace constar que el portador ha sobrevivido exitosamente a un Nivel de Drama colosal sin volverse (completamente) loco. Emitido y sellado por la administración del Inframundo.", "", true);
});

// Partículas y Efectos Visuales
function createAshes() {
    const rect = textarea.getBoundingClientRect();
    let numAshes = parseInt(dramaSlider.value) * 8 + 20; 
    for (let i = 0; i < numAshes; i++) {
        let ash = document.createElement('div');
        ash.className = 'ash-particle';
        ash.style.left = rect.left + (Math.random() * rect.width) + 'px';
        ash.style.top = rect.top + (Math.random() * rect.height) + 'px';
        let size = Math.random() * 8 + 2;
        ash.style.width = size + 'px';
        ash.style.height = size + 'px';
        ash.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
        ash.style.animationDelay = (Math.random() * 0.4) + 's';
        let randomX = (Math.random() - 0.5) * 150; 
        ash.style.setProperty('--random-x', randomX + 'px');
        let isEmber = Math.random() > 0.7;
        ash.style.backgroundColor = isEmber ? '#ff4500' : '#111';
        ash.style.boxShadow = isEmber ? '0 0 10px #ff0000' : 'none';
        document.body.appendChild(ash);
        setTimeout(() => ash.remove(), 3000);
    }
}

function createShreds() {
    const numShreds = 20;
    const widthPct = 100 / numShreds;
    
    // Ocultar textarea original
    textarea.style.opacity = 0;
    
    for (let i = 0; i < numShreds; i++) {
        let clone = document.createElement('div');
        clone.className = 'shred-clone';
        // Copiar el texto para que la tira tenga el mismo contenido
        clone.textContent = textarea.value || textarea.placeholder;
        
        // Ajustar al tamaño del textarea wrapper
        clone.style.width = '100%';
        clone.style.height = textarea.offsetHeight + 'px';
        
        // Usar clip-path para revelar solo una fracción (tira vertical)
        let startX = i * widthPct;
        let endX = (i + 1) * widthPct;
        clone.style.clipPath = `polygon(${startX}% 0, ${endX}% 0, ${endX}% 100%, ${startX}% 100%)`;
        
        clone.style.animationDelay = (Math.random() * 0.4) + 's';
        
        textareaWrapper.appendChild(clone);
        
        setTimeout(() => clone.remove(), 2500);
    }
    
    setTimeout(() => {
        textarea.style.opacity = 1; // restaurar opacidad al final
    }, 2500);
}
