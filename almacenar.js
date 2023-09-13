function guardar (clave, valor){
    localStorage.setItem(clave, valor)
}

function borrar (clave){
    localStorage.removeItem(clave)
}

function recuperar(clave){
    return localStorage.getItem(clave)
}