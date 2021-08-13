const loadMainContent = (content = "init", type = "default") => {
    /* if(content == "init")
    {
        $("#mainContent").load("/ui/src/layout/main.html")
    } */
    if ((window.localStorage.getItem("tokenSession") !== undefined && window.localStorage.getItem("tokenSession") !== "" && window.localStorage.getItem("tokenSession") !== null) || (window.sessionStorage.getItem("tokenSession") !== undefined && window.sessionStorage.getItem("tokenSession") !== "" && window.sessionStorage.getItem("tokenSession") !== null))
        type = "app";


    let footer = `<footer>
        <div class="head-footer-content">
            <h3>Redes</h3>
            <p>Políticas de privacidad y tratamiento de datos personales</p>
        </div>
        <span class="Ame-footer">Amecity</span>
        <span>Colombia - 2021 (C)</span>
    </footer>`;
    let homePage = '/ui/src/layout/main.html';

    if (type == "app") {
        footer =
        `<footer class="footer-app">
        <div class="footer-app__content">
          <div class="container-icons">
            <a href="#home" class="link-footer__icon profile links"><em class="fas fa-user-alt icon-footer"></em><span
                class="description-footer__app profile">PERFIL</span></a>
            <a href="#challenges" class="link-footer__icon challenges links"><em class="fas fa-bars icon-footer"></em><span
                class="description-footer__app challenges">RETOS</span></a>
            <a href="#" class="link-footer__icon points"><em class="fas fa-trophy icon-footer"></em><span
                class="description-footer__app points">PUNTOS</span></a>
            <a href="#" class="link-footer__icon supplier"><em class="fas fa-users icon-footer"></em><span
                class="description-footer__app supplier">PROVEEDORES</span>
            </a>
          </div>
        </div>
      </footer>`;

      homePage = '/ui/dist/pages/userHomepage.html';
    }

    switch (content) {
        case "init":
            $("#mainContent").load("/ui/src/layout/main.html")
            break;
        case "blog":
            $("#mainContent").load("/ui/src/layout/blog.html")
            break;
        case "userHome":
            $("#mainContent").load("/ui/dist/pages/userHomePage.html")
            break;
        case "challenges":
            $("#mainContent").load("/ui/dist/pages/challenges.html", () => {
                getAllChallenges();
            })
            break;
        case "home":
            $("#mainContent").load(homePage, () => {
                getAllChallenges();
            })
            break;
        default:
            window.location.href = "#" + content
            break;
    }

    $("#globalFooter").html(footer)

    console.log(footer)


    /*   if ($(".navBarMenu").is(":checked")) 
      {
          $(".bars").css({"display" : "block"}); 
          $(".reciclaje ").css({"display" : "none"});
          $(".items").css({"display" : "none", "position" : "static"});
          $(".navBarMenu").prop("checked", false);
      } */
}

loadMainContent();

$(document).on("click", ".links", (e) => {
    e.preventDefault()
    let element = window.document.activeElement;
    let route = element.getAttribute("href");
    route = route.replace("#", "");
    console.log(route)
    loadMainContent(route)
})