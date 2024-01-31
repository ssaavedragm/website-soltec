const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

const $form = document.querySelector('#form');
$form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(this);
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    })
    if (response.ok) {
        this.reset();
        alert("Gracias por contactárnos, en breve responderemos!");
    }   
}

const contacto=document.querySelectorAll(".btnContacto");
contacto.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        window.location.href="#contacto";
    })
})


