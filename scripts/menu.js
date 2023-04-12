const viewport = document.querySelector(".mutable-card");

function updateViewport(mainNode, defaultStyle) {
    var main = viewport.querySelector("main");
    viewport.removeChild(main);
    viewport.appendChild(mainNode);
    viewport.animate([
        { transform: "translateX(100vh)" },
        { transform: "translateX(0px)" },
    ], 400);
    if (defaultStyle) {
        viewport.classList.add("default-card");
    } else {
        viewport.classList.remove("default-card");
    }
}

function swapContent(filename, defaultStyle) {
    const url = `/pages/${filename}.html`;
    fetch(url)
    .then((response) => response.text())
    .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const main = doc.querySelector("main");
        updateViewport(main, defaultStyle);
    })
    .catch((error) => {
        console.warn('There was an error.', error)
    });
}

const menu = document.querySelector(".menu");
const homeIcon = menu.querySelector("#home");
const projectIcon = menu.querySelector("#projects");
const cvIcon = menu.querySelector("#resume");

var iconList = [homeIcon, projectIcon, cvIcon];
var current = 0;

homeIcon.addEventListener("click", () => {
    swapContent("home", true);
    current = 0;
});
projectIcon.addEventListener("click", () => {
    swapContent("projects", true);
    current = 1;
});
cvIcon.addEventListener("click", () => {
    swapContent("resume", false);
    current = 2;
});

const turnPage = document.querySelector(".turn-page");
const forward = turnPage.querySelector("#forward");
const back = turnPage.querySelector("#back");

forward.addEventListener("click", () => {
    var next = (current + 1) % 3;
    iconList[next].click();
})
back.addEventListener("click", () => {
    var next = (current - 1) % 3;
    if (next === -1) {
        next = 2;
    }
    iconList[next].click();
})