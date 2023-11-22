let xmlhttp = new XMLHttpRequest();
let xmlDoc;
let nbPage = 0;
let pageSize = 9;
let startIndex = 0;
let endIndex = 0;
let page = 1;
let sFav = new Set();
let filter = false;
let xmlDoc2 = new DOMParser().parseFromString("<CATALOGUE></CATALOGUE>", "text/xml");

function loadBuyPage() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlDoc = xmlhttp.responseXML;
            fetchData(false);
            showPageLinks();
            let id_max_tab = max_price(0);
            set_max(id_max_tab);
        }
    };
    xmlhttp.open("GET", "../data/bdd2.xml", true);
    xmlhttp.send();
}
function fetchData(bool){
    let i;
    let xmlDoc = xmlhttp.responseXML;
    let table = "<div class='container py-5 bg-light'><div class='row'>";
    let biens;
    if (bool) {
        biens = xmlDoc2.getElementsByTagName("BIEN");
    }
    else {
        biens = xmlDoc.getElementsByTagName("BIEN");
    }
    filter = bool;
    nbPage = Math.ceil(biens.length / pageSize);
    //Calculer startIndex et endIndex    
    startIndex = (page - 1) * pageSize;
    endIndex = startIndex + pageSize;
    if (endIndex > biens.length) {
        endIndex = biens.length;
    }
    showPageLinks();
    for (i = startIndex; i < endIndex; i++) {
        
        let id = biens[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
        console.log(id);
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

function filterData() {
    xmlDoc2 = new DOMParser().parseFromString("<CATALOGUE></CATALOGUE>", "text/xml");
    let min_price = parseInt(document.getElementById("min_price").value);
    let max_price = parseInt(document.getElementById("max_price").value);
    let arrondissement = parseInt(document.getElementById("select_arrondissement").value);
    
    let i;
    let x = xmlDoc.getElementsByTagName("BIEN");
    //permet si aucun arrondissement n'est selectionner de selectionner tous les biens
    let verif_arrondissement = false;
    if (arrondissement == -1) {
        verif_arrondissement = true;
    }
    //
    
    
    for (i = 0; i < x.length; i++) {
        if (verif_arrondissement) {
            arrondissement = x[i].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue;
        }
        
        if (parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue) < max_price && min_price < parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue) && x[i].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue == arrondissement ) {
            console.log(parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue));
            let clone = x[i].cloneNode(true);
            xmlDoc2.getElementsByTagName("CATALOGUE")[0].appendChild(clone);
        }
    }
    
    if (parseInt(document.getElementById("tri").value) != -1) {
        tri();
    }   
    
    fetchData(true);
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
    fetchData(filter);
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
            if(myArr[i]>=startIndex && myArr[i]<endIndex && document.getElementById(myArr[i].toString()) != null){ //Vérifie que l'indice des biens favoris de l'utilisateur sont dans la page affichée
                document.getElementById(myArr[i].toString()).src = "../data/star-fold.png";
            }
            
        }
    }
}

function init_elasticLunr(){
    let index = elasticlunr();
    index.addField('TYPE');
    index.addField('PRIX');
    index.setRef('ID');
    for (let i = 0; i < doc1.length; i++) {
        index.addDoc(doc1[i]);
    }
    return index;
}
function searchWithElasticLunr() {
    let index = init_elasticLunr();
    let biens = xmlDoc.getElementsByTagName("BIEN");
    let results = index.search(document.getElementById("search_elasticlunr").value);
    xmlDoc2 = new DOMParser().parseFromString("<CATALOGUE></CATALOGUE>", "text/xml");
    for (let i = 0; i < results.length; i++) {
        let id_bien = findID(results[i].ref);
        let clone = biens[id_bien].cloneNode(true);
        xmlDoc2.getElementsByTagName("CATALOGUE")[0].appendChild(clone);
    }
    
    fetchData(true);
    
}

function findID(search, doc_search_filter) {
    let doc;
    if (doc_search_filter) {
        doc = xmlDoc2;
    }
    else {
        doc = xmlhttp.responseXML;
    }
    let x = doc.getElementsByTagName("BIEN");
    for (i = 0; i < x.length; i++) {
        if (x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == search) {
            return i;
        }
    }
    return -1;
}
function tri() {
    let biens = xmlDoc2.getElementsByTagName("BIEN");
    if (parseInt(document.getElementById("tri").value) == 1) {
        let i;
        for (i = 0; i < biens.length; i++) {
            let indice_a_changer = max_price(i);
            let ref_node = x[i];
            let node_a_changer = x[indice_a_changer];
            let node_parent = x[i].parentNode;
            node_parent.insertBefore(node_a_changer, ref_node);
        }
    }
    else {
        let i;
        for (i = 0; i < biens.length; i++) {
            let indice_a_changer = min_price(i);
            let ref_node = x[i];
            let node_a_changer = x[indice_a_changer];
            let node_parent = x[i].parentNode;
            node_parent.insertBefore(node_a_changer, ref_node);
        }
    }
}


function max_price(indice) {
    let price = 0;
    let id_price_max = 0;
    x = xmlDoc.getElementsByTagName("BIEN");
    let i;
    for (i = indice; i < x.length; i++) {
        if (parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue) > price) {
            price = parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue);
            id_price_max = i;
        }
    }
    return id_price_max;
}
function min_price(indice) {
    let price = 100000000000;
    let id_price_min = 0;
    x = xmlDoc.getElementsByTagName("BIEN");
    let i;
    for (i = indice; i < x.length; i++) {
        if (parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue) < price) {
            price = parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue);
            id_price_min = i;
        }
    }
    return id_price_min;
}

function set_max(id) {
    x = xmlDoc.getElementsByTagName("BIEN");
    document.getElementById("max_price").value = x[id].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue;
}