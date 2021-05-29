//lo que esta entre comillas es el Id que debe tener el elemento
var AbrirPopUp = document.getElementById("Abrir-PopUp"), //boton que habre el popup
    Overlay = document.getElementById("Overlay"), //fondo oscurecido
    PopUp = document.getElementById("Pop-Up"), //popup en generak
    CerrarPopUp = document.getElementById("Cerrar-PopUp"); //el boton para cerrarlo "X"


/* NOTA: los elementos del popup tienen que estar dentro de un div con Id Pop-Up que este dentro un div con Id Overlay */
    /*
        <input type="button" class="" id="Abrir-PopUp">
        
        <div class="" id="Overlay">
            <div class="" id="Pop-Up">
                <a href="u" class="" id="Cerrar-PopUp"> x </a>

                    CONTENIDO AQUI
            </div>
        </div>
    */

//funcion para activar el popup y sus elementos
AbrirPopUp.addEventListener("click", function(){
    Overlay.classList.add("active");
    PopUp.classList.add("active");
})
//funcion para desactivar el popup y sus elementos
CerrarPopUp.addEventListener("click", function(){
    Overlay.classList.remove("active");
    PopUp.classList.remove("active");
})