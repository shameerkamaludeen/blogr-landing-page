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

document.addEventListener('click', e => {
    // checking wheather menu is active and if so closing on clicking outside of it
    if (document.documentElement.clientWidth <= 769 && document.querySelector('header .wr-links').classList.contains('active')) {

        // get the bubbled elements to check wheather menu element among them
        const elements = e.composedPath();
        let isClickedMenu = false;

        // here the 'elements.length - 2' is for ignoring last two element (document and window) 
        for (let index = 0; index < elements.length - 2; index++) {
            if (elements[index].classList.contains('wr-links') || elements[index].classList.contains('wr-hamburger')) {
                isClickedMenu = true;
                break;
            }
        }
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
});

// Click event for caret or main menu
for (const mainMenu of mainMenus) {
    mainMenu.addEventListener('click', () => {
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