const buildCarouselMenu = (type = "") => {
  let categories = [];
  let menu = "";
  let newCategories = "";
  switch (type) {
    case "main":
      categories = ["who", "supplier", "ally", "blog"];

      categories.forEach(menuCategory => {
        newCategories += `<li class="container">
            <a class="container-${menuCategory} carouselDot" href="#slide-${menuCategory}" typeCarousel=${type}></a>
        </li>`

      });

      menu = `<div class="carouselDots">
        <ul class="menu">
          ${newCategories}
        </ul>
      </div>`
      //console.log(newCategories)

      break;

    case "becauseJoin":
      categories = ["environmental", "social", "half", "global"];

      categories.forEach(menuCategory => {
        newCategories += `<li class="container">
              <a class="container-${menuCategory} carouselDot" href="#slide-${menuCategory}" typeCarousel=${type}></a>
          </li>`

      });

      menu = `<div class="carouselDots">
          <ul class="menu">
            ${newCategories}
          </ul>
        </div>`
      break;

  }
  return menu;
}
let mainCarouselMenu = buildCarouselMenu("main");
let joinCarouselMenu = buildCarouselMenu("becauseJoin");

const buildCarousel = (type = "", slide = "", returnSlide = false) => {
  let slideId = "";
  let slideClass = "";
  let slideDescription = "";
  let slideTitle = "";
  let slideContainer = "";
  let menuCarousel = "";

  switch (type) {
    case "main":
      menuCarousel = mainCarouselMenu;
      slideContainer = "#mainCarouselContainer";
      switch (slide) {
        case "#slide-who":
          slideClass = "about-us";
          slideId = slide.replace("#", "");
          slideDescription = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quia possimus
            similique quis vel`;
          slideTitle = "¿QUIÉNES SOMOS?";
          break;

        case "#slide-supplier":
          slideClass = "see-supplier";
          slideId = slide.replace("#", "");
          slideDescription = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quia possimus
            similique quis vel`;
          slideTitle = "VER PROVEEDORES";
          break;

        case "#slide-ally":
          slideClass = "see-ally";
          slideId = slide.replace("#", "");
          slideDescription = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quia possimus
            similique quis vel`;
          slideTitle = "VER ALIADOS";
          break;

        case "#slide-blog":
          slideClass = "see-blog";
          slideId = slide.replace("#", "");
          slideDescription = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quia possimus
            similique quis vel`;
          slideTitle = "VER BLOG";
          break;

      }

      break;

    case "becauseJoin":
      slideContainer = "#becauseJoinContainer";
      menuCarousel = joinCarouselMenu;
      switch (slide) {
        case "#slide-environmental":
          slideClass = "impact-environmental";
          slideId = slide.replace("#", "");
          slideDescription = `Reducción de emisiones contaminantes`;
          slideTitle = "IMPACTO";
          break;

        case "#slide-social":
          slideClass = "impact-social";
          slideId = slide.replace("#", "");
          slideDescription = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quia possimus
              similique quis vel`;
          slideTitle = "IMPACTO";
          break;

        case "#slide-half":
          slideClass = "impact-half";
          slideId = slide.replace("#", "");
          slideDescription = `Reducción de emisiones contaminantes`;
          slideTitle = "IMPACTO";
          break;

        case "#slide-global":
          slideClass = "impact-global";
          slideId = slide.replace("#", "");
          slideDescription = `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi quia possimus
                  similique quis vel`;
          slideTitle = "IMPACTO";
          break;

        default:
          return false;
          break;
      }
      break;
    default:
      return false;
      break;
  }

  //console.log("llega al if")
  if (returnSlide == true) {
    let divSlide = `
          <ul class="slider">
            <li id="${slideId}" class="${slideClass} list-unstyled carouselSlide" typeCarousel=${type}>
              <p class="description descriptionCarousel ${type}" typeCarousel=${type}>${slideDescription}</p>
              <p class="description-who titleCarousel ${type}" typeCarousel=${type}>${slideTitle}</p>
              ${menuCarousel}
            </li>
          </ul>`;
    $(slideContainer).html(divSlide);

    //return divSlide;

  }
  else {
    let carouselSlide = $(`.carouselSlide[typeCarousel="${type}"]`);
    carouselSlide.attr("id", slideId);
    carouselSlide.removeClass();
    carouselSlide.addClass(`${slideClass} carouselSlide list-unstyled`);


    //$(`p.descriptionCarousel[typeCarousel="${type}"]`).attr("typeCarousel", type);
    let descriptionCarousel = $(`p.descriptionCarousel[typeCarousel="${type}"]`);

    descriptionCarousel.html(slideDescription);
    descriptionCarousel.removeClass();
    descriptionCarousel.addClass(`description descriptionCarousel ${type}`);

    let carouselTitle = $(`p.titleCarousel[typeCarousel="${type}"]`);
    carouselTitle.html(slideTitle);
    carouselTitle.removeClass();
    carouselTitle.addClass(`titleCarousel description-who ${type}`);


  }

}
$(document).ready(() => {
  setTimeout(() => {
    buildCarousel("main", "#slide-who", true);
    buildCarousel("becauseJoin", "#slide-environmental", true);
  }, 70);


})


$(document).off("click", ".carouselDot")
$(document).on("click", ".carouselDot", (e) => {
  e.preventDefault()
  let element = window.document.activeElement;
  let slide = element.getAttribute("href");
  let type = element.getAttribute("typeCarousel");
  console.log(window.document.activeElement);
  console.log(element.getAttribute("href") + "\n" + element.getAttribute("typeCarousel"))

  buildCarousel(type, slide);
})

/* $(document).on("click", ".links", (e) => {
  e.preventDefault()
  let slide = $(this).attr("href");


  console.log(slide +"\n")
}) */
/* function App() {}

window.onload = function (event) {
    var app = new App();
    window.app = app;
};

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget;
    const slickList = event.currentTarget.parentNode;
    const track = event.currentTarget.parentNode.querySelector('#track');
    const slick = track.querySelectorAll('.slick');

    const slickWidth = slick[0].offsetWidth;

    const trackWidth = track.offsetWidth;
    const listWidth = slickList.offsetWidth;

    track.style.left == ""  ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1);

    btn.dataset.button == "button-prev" ? prevAction(leftPosition,slickWidth,track) : nextAction(leftPosition,trackWidth,listWidth,slickWidth,track)
}

let prevAction = (leftPosition,slickWidth,track) => {
    if(leftPosition > 0) {
        console.log("entro 2")
        track.style.left = `${-1 * (leftPosition - slickWidth)}px`;
    }
}

let nextAction = (leftPosition,trackWidth,listWidth,slickWidth,track) => {
    if(leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + slickWidth)}px`;
    }
}
 */
/*  Solo es necesario copiar y pegar el codigo de abajo cuando senecesite un carrusel
    igual llamar a este codigo codigo para su funcionamiento las imagenes puede ser cambiadas sin problemas,
    las rutas de las imagenes solo son ejemplos, estoy trabajando para que el desplazamiento sea infinito
        cualquier duda me llaman

    <div class="Carousel">
    <div class="slick-list" id="slick-list">
      <button class="slick-arrow slick-prev" id="button-prev" data-button="button-prev"
        onclick="app.processingButton(event)">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left"
          class="svg-inline--fa fa-chevron-left fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path fill="currentColor"
            d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
          </path>
        </svg>
      </button>
      <div class="slick-track" id="track">
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/1.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/2.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/3.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/4.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/5.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/6.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/7.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/8.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/9.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/10.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/11.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/12.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/13.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/14.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
        <div class="slick">
          <div>
            <a href="/">
              <h4><small>Share Your Message</small>Watch</h4>
              <picture>
                <img src="./images/15.jpg" alt="Image">
              </picture>
            </a>
          </div>
        </div>
      </div>
      <button class="slick-arrow slick-next" id="button-next" data-button="button-next"
        onclick="app.processingButton(event)">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right"
          class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512">
          <path fill="currentColor"
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
          </path>
        </svg>
      </button>
    </div>
  </div>
</section> */