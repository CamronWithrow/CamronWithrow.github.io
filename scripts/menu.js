const viewport = document.querySelector(".mutable-card");

function updateViewport(mainNode) {
    var main = viewport.querySelector("main");
    viewport.removeChild(main);
    viewport.appendChild(mainNode);
}

function swapContent(filename) {
    const url = `/pages/${filename}.html`;
    fetch(url)
    .then((response) => response.text())
    .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const main = doc.querySelector("main");
        updateViewport(main);
    })
    .catch((error) => {
        console.warn('There was an error.', error)
    });
}

const menu = document.querySelector(".menu");

const homeIcon = menu.querySelector("#home");
homeIcon.addEventListener("click", () => swapContent("home"));
const projectIcon = menu.querySelector("#projects");
projectIcon.addEventListener("click", () => swapContent("projects"));
const cvIcon = menu.querySelector("#resume");
cvIcon.addEventListener("click", () => swapContent("resume"));