function handsWrite(str, elem, delay, index = 0) {
    setTimeout(() => {
        if (index < str.length) {
            elem.append(str[index]);
            handsWrite(str, elem, delay, index + 1);
        } else {
            elem.nextElementSibling.style.visibility = "hidden";
        }
    }, delay);
}

const NAME = "game collection";
const HASH = decodeURI(window.location.hash).substring(1) || "Главная страница";

const TITLE = document.querySelector("title");
const SITENAME = document.querySelector(".header-text-wraper > h1");
const PAGENAME = document.querySelector(".header-text-wraper > h2");

TITLE.innerHTML = HASH;

handsWrite(NAME, SITENAME, 125);
handsWrite(HASH, PAGENAME, 125);