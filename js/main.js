/* ── Menú móvil ─────────────────────────────────────────── */
const nav   = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

if (abrir)  abrir.addEventListener("click",  () => nav.classList.add("visible"));
if (cerrar) cerrar.addEventListener("click", () => nav.classList.remove("visible"));

/* ── Header: transparente → sólido al scroll ───────────── */
const header = document.querySelector("header");
if (header) {
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 60);
    }, { passive: true });
}

/* ── Scroll suave al hacer clic en "Contáctanos" ───────── */
document.querySelectorAll(".btnContacto").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
    });
});

/* ── Animaciones de entrada (IntersectionObserver) ─────── */
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".revelar, .revelar-izq, .revelar-der").forEach((el) => {
    observador.observe(el);
});

/* ── Contador animado en sección stats ─────────────────── */
function animarContador(el) {
    const objetivo = parseInt(el.dataset.target, 10);
    const duracion = 1800;
    const inicio   = performance.now();

    function paso(ahora) {
        const progreso = Math.min((ahora - inicio) / duracion, 1);
        const easeOut  = 1 - Math.pow(1 - progreso, 3);
        el.textContent = Math.floor(easeOut * objetivo) + "+";
        if (progreso < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
}

const observadorStats = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.querySelectorAll(".stats__numero").forEach(animarContador);
            observadorStats.unobserve(entrada.target);
        }
    });
}, { threshold: 0.4 });

const statsSection = document.querySelector(".stats");
if (statsSection) observadorStats.observe(statsSection);

/* ── Formulario de contacto ─────────────────────────────── */
const form = document.querySelector("#form");
if (form) form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const submitBtn = this.querySelector(".enviar");
    const msg       = this.querySelector("#form-msg");

    submitBtn.disabled  = true;
    submitBtn.value     = "Enviando...";
    msg.textContent     = "";
    msg.style.color     = "";

    try {
        const response = await fetch(this.action, {
            method:  this.method,
            body:    new FormData(this),
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            this.reset();
            msg.textContent = "¡Gracias por contactarnos! En breve responderemos.";
            msg.style.color = "#72caf3";
        } else {
            msg.textContent = "Hubo un error al enviar. Por favor intenta de nuevo.";
            msg.style.color = "#f08c6a";
        }
    } catch {
        msg.textContent = "No se pudo conectar. Verifica tu conexión e intenta de nuevo.";
        msg.style.color = "#f08c6a";
    } finally {
        submitBtn.disabled = false;
        submitBtn.value    = "Enviar";
    }
}
