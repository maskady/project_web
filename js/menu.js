const menu = document.getElementsByClassName("menu")[0]; // Sélectionnez le premier élément avec la classe "menu"
const navLiens = document.getElementsByClassName("nav_liens")[0]; // Sélectionnez le premier élément avec la classe "nav_liens"
menu.addEventListener('click', () => {
    navLiens.classList.toggle('mobile-menu'); //Si 'mobile-menu' est défini, ca le supprime, sinon ca l'ajoute
});