let cuerpo = document.querySelector("#body")
let contenedorTareas = document.querySelector(".tareas")
let boton = document.querySelector("button.agregar")
let botonBorrar = document.querySelector("button.borrar")
let comenzarDesde = 3
let tareas = []
//console.log("mira lo que hay",cuerpo);
botonBorrar.addEventListener("click", function (evento){
    evento.preventDefault()
    borrar("clave-bti")
    contenedorTareas.innerHTML = " "
    const defaults = {
        spread: 360,
        ticks: 100,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
      };
      
      function shoot() {
        confetti({
          ...defaults,
          particleCount: 30,
          scalar: 1.2,
          shapes: ["circle", "square"],
          colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        });
      
        confetti({
          ...defaults,
          particleCount: 20,
          scalar: 2,
          shapes: ["text"],
          shapeOptions: {
            text: {
              value: ["🦄", "🌈"],
            },
          },
        });
      }
      
      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
})
cuerpo.addEventListener("click", function (evento) {
    console.log("hiciste click en", evento);
    if (evento.target.tagName == "INPUT" && evento.target.type == "checkbox") {
        console.log("el id del input es", evento.target.id);
        let id = evento.target.id
        document.querySelector("label[for=" + id + "]").remove()
        document.querySelector("." + id).remove()
        evento.target.remove()
        guardarTodo()
        if(contenedorTareas.children.length == 0) {
            const defaults = {
                spread: 360,
                ticks: 100,
                gravity: 0,
                decay: 0.94,
                startVelocity: 30,
              };
              
              function shoot() {
                confetti({
                  ...defaults,
                  particleCount: 30,
                  scalar: 1.2,
                  shapes: ["circle", "square"],
                  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
                });
              
                confetti({
                  ...defaults,
                  particleCount: 20,
                  scalar: 2,
                  shapes: ["text"],
                  shapeOptions: {
                    text: {
                      value: ["🦄", "🌈"],
                    },
                  },
                });
              }
              
              setTimeout(shoot, 0);
              setTimeout(shoot, 100);
              setTimeout(shoot, 200);
        }
    }
})

boton.addEventListener("click", function (evento) {

    let texto = document.querySelector("#texto")
    console.log("mira el texto que estaba en el input", texto.value);
    if (texto.value == ""){
        swal ( "Oops" ,  "Debes colocar un texto!" ,  "error" )
        return
    }
    let contenedor = document.createElement("div")
    contenedor.className = `tarea${comenzarDesde}`
    let tarea = `
    <input type="checkbox" id="tarea${comenzarDesde}">
    <label for="tarea${comenzarDesde}">${texto.value}</label>`
    contenedor.innerHTML = tarea
    tareas.push({
        "id": `tarea${comenzarDesde}`,
        "tarea": `${texto.value}`
    })
    comenzarDesde = comenzarDesde + 1
    contenedorTareas.appendChild(contenedor)
    guardar("clave-bti", JSON.stringify(tareas))
})

console.log( 
    recuperar("clave-bti")
);

let tareasArealizar = recuperar("clave-bti")
console.log("tareas a analizar", tareasArealizar);
if (tareasArealizar != null){
    let tareasJson = JSON.parse(tareasArealizar)
    //tareas = tareasJson
    
    console.log(tareasJson);
tareasJson.map(
    function (tarea) {
        let contenedor = document.createElement("div")
        contenedor.className = `${tarea.id}`
        let texto = `
        <input type="checkbox" id="${tarea.id}">
        <label for="${tarea.id}">${tarea.tarea}</label>`
        contenedor.innerHTML = texto
        contenedorTareas.appendChild(contenedor)
    }
    )
}
    console.log("que tiene el contenedor tareas?", contenedorTareas.children);
    function guardarTodo() {
        const nuevasTareas = []
        for (const clave of contenedorTareas.children) {
            console.log("clave", clave.className);
            console.log("texto", clave.children[1].textContent);
            nuevasTareas.push({
                "id": `${clave.className}`,
                "tarea": `${clave.children[1].textContent}`
            })
        }
            guardar("clave-bti", JSON.stringify(nuevasTareas))
    }