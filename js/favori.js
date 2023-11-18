let xmlhttp = new XMLHttpRequest();

let sFav = new Set();

function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fetchFavoriteProperty();
        }
    };
    xmlhttp.open("GET", "../data/bdd2.xml", true);
    xmlhttp.send();
}

function fetchFavoriteProperty() {
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = "<div class='container py-5 bg-light'><div class='row'>";
    let biens = xmlDoc.getElementsByTagName("BIEN");
    if (localStorage.getItem("favorites") != null) {
        console.log("in")
        let favs = localStorage.getItem("favorites");
        let myArr = favs.split(",");
        let i;
        for (i = 0; i < myArr.length; i++) {
            sFav.add(myArr[i]);
        }
        for (const id of sFav) {
            let i;
            for (i = 0; i < biens.length; i++) {
                if (id == biens[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue) {
                    table += "<div class='col-md-4 col-sm-6 ' id='card'><a href='./bien.html?bienid=" +
                        biens[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
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
                        "<div style='display:flex;justify-content:flex-end;'>" + "<img src='../data/star-fold.png' class='star' data-value='" + id + "'id='" + id + "'></div>" +
                        "</div></div></div></div>";
                }
            }
        }
        table += "</div></div>";
        document.getElementsByClassName("main")[0].innerHTML = table; /*table est la concaténation du code html à ajouter*/
        let stars = document.getElementsByClassName("star");
        for (let i = 0; i < stars.length; i++) {
            stars[i].addEventListener('click', function () {
                switch_image(this);
            });
        }
    }
    else{
        document.getElementsByClassName("main")[0].innerHTML = "Vous n'avez pas de favoris";
        document.getElementsByClassName("main")[0].style.fontweight = "bold";
        document.getElementsByClassName("main")[0].style.fontsize = "50 px";
    }
    



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
