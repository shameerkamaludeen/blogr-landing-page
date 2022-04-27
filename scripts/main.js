const mainMenus = document.querySelectorAll('.main-menu');
const hamburger = document.querySelector('header .wr-hamburger');
let activeMenu;

// Click event for Hamburger
hamburger.addEventListener('click', () => {
    const wrapperLinks = document.querySelector('header .wr-links');
    wrapperLinks.classList.toggle('active');
    if (wrapperLinks.classList.contains('active')) {
        hamburger.firstChild.setAttribute('src', 'images/icon-close.svg');
    } else {
        hamburger.firstChild.setAttribute('src', 'images/icon-hamburger.svg');
        if (activeMenu !== null && typeof activeMenu !== 'undefined') {
            activeMenu.classList.remove('active');
            activeMenu.nextElementSibling.classList.remove('active');
            activeMenu = null;
        }
    }
});

// closing menu on clicking outside of the manu
document.addEventListener('click', e => {

    // get the bubbled elements to check wheather the click is on menu element
    const elements = e.composedPath();
    let isClickedMenu = false;

    // checking the click is on or inside the menu container for smaller devices
    if (document.documentElement.clientWidth <= 769) {
        if (document.querySelector('header .wr-links').classList.contains('active')) {
            // here the 'elements.length - 2' is for ignoring last two element (document and window) 
            for (let index = 0; index < elements.length - 2; index++) {
                if (elements[index].classList.contains('wr-links') || elements[index].classList.contains('wr-hamburger')) {
                    isClickedMenu = true;
                    break;
                }
            }
        }

        // changes to close the menu
        if (!isClickedMenu) {
            document.querySelector('header .wr-links').classList.remove('active');
            // Changing close icon to hamburger back
            hamburger.firstChild.setAttribute('src', 'images/icon-hamburger.svg');
            // Collapsing mainmenus if it is opened
            if (activeMenu !== null && typeof activeMenu !== 'undefined') {
                activeMenu.classList.remove('active');
                activeMenu.nextElementSibling.classList.remove('active');
            }
        }
    }

    // checking the click is on or inside the sub menu container for larger devices
    else {
        // here the 'elements.length - 2' is for ignoring last two element (document and window) 
        for (let index = 0; index < elements.length - 2; index++) {
            if (elements[index].classList.contains('main-menu') || elements[index].classList.contains('wr-submenu')) {
                isClickedMenu = true;
                break;
            }
        }

        // changes to close the sub menu
        if (!isClickedMenu) {
            // Collapsing sub menu if it is opened
            if (activeMenu !== null && typeof activeMenu !== 'undefined') {
                activeMenu.classList.remove('active');
                activeMenu.nextElementSibling.classList.remove('active');
            }
        }
    }
});

// Click event for caret or main menu
for (const mainMenu of mainMenus) {
    mainMenu.addEventListener('click', (event) => {
        event.preventDefault();
        if (mainMenu.classList.contains('active')) {
            mainMenu.classList.remove('active');
            mainMenu.nextElementSibling.classList.remove('active');
            activeMenu = null;
        } else {
            if (activeMenu !== null && typeof activeMenu !== 'undefined') {
                activeMenu.classList.remove('active');
                activeMenu.nextElementSibling.classList.remove('active');
            }
            mainMenu.classList.add('active');
            mainMenu.nextElementSibling.classList.add('active');
            activeMenu = mainMenu;
        }
    });
}