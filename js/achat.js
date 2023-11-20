let xmlhttp = new XMLHttpRequest();
let nbPage = 0;
let pageSize = 9;
let startIndex = 0;
let endIndex = 0;
let page = 1;
let sFav = new Set();
function loadBuyPage() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchData();
            showPageLinks();
        }
    };
    xmlhttp.open("GET", "../data/bdd2.xml", true);
    xmlhttp.send();
}
function fetchData(){
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = "<div class='container py-5 bg-light'><div class='row'>";
    let biens = xmlDoc.getElementsByTagName("BIEN");
    nbPage = Math.ceil(biens.length / pageSize);
    //Calculer startIndex et endIndex    
    startIndex = (page - 1) * pageSize;
    endIndex = startIndex + pageSize;
    if (endIndex > biens.length) {
        endIndex = biens.length;
    }
    for (i = startIndex; i < endIndex; i++) {
        console.log(i);
        let id = biens[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
        table += "<div class='col-md-4 col-sm-6 ' id='card'><a href='./bien.html?bienid=" +
                    id +
                    "'><div class='card mb-4 shadow-sm rounded'>" +
                    "<img src='" +
                    biens[i].getElementsByTagName("PHOTO")[0].childNodes[0].nodeValue +
                    "' alt='photo bien' class='w-100 h-100'></a>" +
                    "<div class='card-body' style='display:flex;flex-direction:row;justify-content:space-between;'> <p>" +
                    biens[i].getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue +
                    " pièces " +
                    biens[i].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue +
                    "m2</br>" +
                    biens[i].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue +
                    "<sup>e</sup> arrondissement" +
                    "</p><div id='prix_annonce'>" +
                    biens[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue +
                    "€" +
                    "<div style='display:flex;justify-content:flex-end;'>" + "<img src='../data/star-n-fold.png' class='star' data-value='" + id + "'id='" + id + "'></div>" +
                    "</div></div></div></div>";
            
        
    }
    table +="</div></div>"
    document.getElementById("container").innerHTML = table; /*table est la concaténation du code html à ajouter*/
    let stars = document.getElementsByClassName("star");
    for (let i = 0; i < stars.length; i++) {
        stars[i].addEventListener('click', function () {
            switch_image(this);
        });
    }
    initSetFavoriteBiens()
}
function showPageLinks() {
    let xmlDoc = xmlhttp.responseXML;
    let x = xmlDoc.getElementsByTagName("BIEN");
    
    let divpl = document.getElementById("pageLinks");
    divpl.style.display = "flex";
    let i;
    let res = "Pages :  ";
    for (i = 1; i <= nbPage; i++) {
        res += "<input type='button' class = 'btn btn-outline-secondary' style='margin-left:5px;'onclick='loadPage(" + i + ")' value=" + i + ">";
    }
    divpl.innerHTML = res;
}
function loadPage(pageNumber) {
    //Mettre à jour la valeur de page en fonction de pageNumber
    page = pageNumber;
    //Appeler la fonction fetchData
    fetchData();
}
function switch_image(star) {
    if (star.src.endsWith("star-n-fold.png")) {
        star.src = "../data/star-fold.png";
        setFavorite(star);
    } else {
        star.src = "../data/star-n-fold.png";
        setFavorite(star);
    }
}


function setFavorite(ev) {
    if (ev.src.endsWith("star-fold.png")) {
        sFav.add(ev.getAttribute('data-value').toString());
    } else {
        sFav.delete(ev.getAttribute('data-value').toString());

    }
    localStorage.removeItem("favorites");
    if (sFav.size != 0) {
        let fchaine = Array.from(sFav).join(',');
        localStorage.setItem("favorites", fchaine);
    }
}

function initSetFavoriteBiens() {
    if (localStorage.getItem("favorites") != null) {
        let favs = localStorage.getItem("favorites");
        let myArr = favs.split(",").map(Number);
        for (let i = 0; i < myArr.length; i++) {
            sFav.add(myArr[i].toString());
            if(myArr[i]>=startIndex && myArr[i]<endIndex){
                document.getElementById(myArr[i].toString()).src = "../data/star-fold.png";
            }
            
        }
    }
}