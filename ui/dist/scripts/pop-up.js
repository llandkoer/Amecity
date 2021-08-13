//lo que esta entre comillas es el Id que debe tener el elemento
const PopUpContainer = document.getElementById("PopUpContainer");

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

function LoginPopUp() {
  PopUpContainer.innerHTML = `
        <div class="Overlay" id="Overlay">
            <div class="Pop-Up" id="Pop-Up">
                <a href="#" class="" onclick="CerrarPopUp()"> x </a>
                <div class="form-header">
        <h1 class="form-header__title">Inicia sesión</h1>
        <div class="form-header__logo"></div>
    </div>
    <div class="form-main">
        <blockquote class="form-main__text">La única forma, si vamos a mejorar la calidad del medio ambiente, es involucrar a todo el mundo! <br> &mdash;
            <cite>Richard Rogers</cite> 
        </blockquote>
        <form action="" class="form-main__form">
            <input class="form-main__form-input" type="text" name="user" id="user" placeholder="Usuario">
            <input class="form-main__form-input" type="password" name="pwd" id="pwd" placeholder="Contraseña">
            <label class="form-main__form-label">
                <input class="form-main__form-checkbox" type="checkbox">
                <span class="form-main__form-checkmark"></span>
                Mantener la sesión abierta
            </label>
        </form>
        <button class="form-main__button" onclick="LoginPost()"  type="submit">Iniciar sesión</button>
        <p class="form-main__text--centered">ó</p>
        <button class="form-main__button--white" type="submit">
            <img class="form-main__button-google-logo" src="https://img.icons8.com/fluent/48/000000/google-logo.png"/>
            Acceder con Google
        </button>    
    </div>
            </div>
        </div>
    `;
};

function CerrarPopUp() {
    PopUpContainer.innerHTML = "";
}
