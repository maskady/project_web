let xmlhttp = new XMLHttpRequest();
let xmlDoc;
let sFav = new Set();
function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlDoc = xmlhttp.responseXML;
            fetchVitrine();
            
        }
    };
    xmlhttp.open("GET", "./data/bdd2.xml", true);
    xmlhttp.send();
}
function fetchVitrine() {
    let vitrine = document.getElementById("vitrine");
    let biens = xmlDoc.getElementsByTagName("BIEN");
    let id = 1;
    //Variante avec des biens aléatoires
    //let id = Math.floor(Math.random() * biens.length);
    let res = "<div class='row'><div class='col-md-6 ' id='card'><a href='./html/bien.html?bienid=" +
        biens[id].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
        "'><div class='card mb-4 shadow-sm rounded'>" +
        "<img src='" +
        biens[id].getElementsByTagName("PHOTO")[0].childNodes[0].nodeValue +
        "' alt='photo bien' class='w-100 h-100'></a>" +
        "<div class='card-body' style='display:flex;flex-direction:row;justify-content:space-between;'> <p>" +
        biens[id].getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue +
        " pièces " +
        biens[id].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue +
        "m2</br>" +
        biens[id].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue +
        "<sup>e</sup> arrondissement" +
        "</p><div id='prix_annonce'>" +
        biens[id].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue +
        "€" +
        "<div style='display:flex;justify-content:flex-end;'>" + "<img src='./data/star-n-fold.png' class='star' data-value='" + biens[id].getElementsByTagName("ID")[0].childNodes[0].nodeValue + "'id='" + biens[id].getElementsByTagName("ID")[0].childNodes[0].nodeValue + "'></div>" +
        "</div></div></div></div>";
    //id = Math.floor(Math.random() * biens.length);
    id = 2;
    res += "<div class='col-md-6 ' id='card'><a href='./html/bien.html?bienid=" +
        biens[id].getElementsByTagName("ID")[0].childNodes[0].nodeValue + 
        "'>" +
        "<div class='card mb-4 shadow-sm rounded'>" +
        "<img src='" +
        biens[id].getElementsByTagName("PHOTO")[0].childNodes[0].nodeValue +
        "' alt='photo bien' class='w-100 h-100'>" +
        "</a><div class='card-body' style='display:flex;flex-direction:row;justify-content:space-between;'> <p>" +
        biens[id].getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue +
        " pièces " +
        biens[id].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue +
        "m2</br>" +
        biens[id].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue +
        "<sup>e</sup> arrondissement" +
        "</p><div id='prix_annonce'>" +
        biens[id].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue +
        "€<div style='display:flex;justify-content:flex-end;'>" + "<img src='./data/star-n-fold.png' class='star' data-value='" + biens[id].getElementsByTagName("ID")[0].childNodes[0].nodeValue + "' id='" + biens[id].getElementsByTagName("ID")[0].childNodes[0].nodeValue + "'></div>" +
        "</div></div></div></div></div>"
    vitrine.innerHTML = res;
    let stars = document.getElementsByClassName("star");
    let star1 = stars[0];
    let star2 = stars[1];
    star1.addEventListener('click', () => switch_image(star1));
    star2.addEventListener('click', () => switch_image(star2));
    initSetFavoriteBiens()
}
function switch_image(star){
    if (star.src.endsWith("star-n-fold.png")) {
        star.src = "./data/star-fold.png";
        setFavorite(star);
    } else {
        star.src = "./data/star-n-fold.png";
        setFavorite(star);
    }
}


function setFavorite(ev){
    if (ev.src.endsWith("star-fold.png")) {
        sFav.add(ev.getAttribute('data-value').toString());        
    } else {
        sFav.delete(ev.getAttribute('data-value').toString());     
        
    }
    localStorage.removeItem("favorites");
    if (sFav.size != 0){
        let fchaine = Array.from(sFav).join(',');
        localStorage.setItem("favorites",fchaine);
    }
}
function initSetFavoriteBiens() {
    if (localStorage.getItem("favorites") != null) {
        let favs = localStorage.getItem("favorites");
        let myArr = favs.split(",").map(Number);
        for (let i = 0; i < myArr.length; i++) {
            sFav.add(myArr[i].toString());
            document.getElementById(myArr[i].toString()).src = "./data/star-fold.png";
        }
    }
}




