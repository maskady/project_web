const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("bienid");


let xmlhttp = new XMLHttpRequest();
function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            construction();
        }
    };
    xmlhttp.open("GET", "../data/bdd2.xml", true);
    xmlhttp.send();
}
function construction(){
    let xmlDoc = xmlhttp.responseXML;
    let page = "";
    let x = xmlDoc.getElementsByTagName("BIEN");
    //Transformation des données
    let code ;
    let ascenseur;
    let garage;
    if (x[id-1].getElementsByTagName("DIGICODE")[0].childNodes[0].nodeValue == "0"){
        code = "Non";
    }
    else{
        code = "Oui";
    }
    if (x[id-1].getElementsByTagName("ASCENSEUR")[0].childNodes[0].nodeValue == "0"){
        ascenseur = "Non";
    }
    else{
        ascenseur = "Oui";
    }
    if (x[id-1].getElementsByTagName("GARAGE")[0].childNodes[0].nodeValue == "0"){
        garage = "Non";
    }
    else{
        garage = "Oui";
    }
    //Fin de la transformation

    page = "<div class='contain1'><div id = 'picture' style = 'width:70%';><img src='"+
    x[id-1].getElementsByTagName("PHOTO")[0].childNodes[0].nodeValue+
    "'style='width:90%'> "+
    "</div ><div id='content' style='color:white;width:30%;'>"+
    "<ul><li>Type du bien : "+
    x[id-1].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue +
    " </li>"+
    "<li>Prix : "+
    x[id-1].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue+
    " €</li>"+
    "<li>Surface : "+
    x[id-1].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue +
    " m<sup>2</sup></li>"+
    
    "<li>Nombre de pièces : "+
    x[id-1].getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue+
    "</li>"+
    "<li>Arrondissement : "+
    x[id-1].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue+
    "</li>"+
    "<li>Nombre de salles de bains : "+
    x[id-1].getElementsByTagName("NB_BAINS")[0].childNodes[0].nodeValue+
    "</li>"+
    "<li>Nombre d'étages : "+
    x[id-1].getElementsByTagName("NB_ETAGES")[0].childNodes[0].nodeValue+
    "</li>"+
    "<li>Ascenseur : "+
    ascenseur +
    "</li>"+
    "<li>Garage : "+
    garage+
    "</li>"+
    "<li>Code d'accès : "+
    code +
    "</li>"+
    "<li>Année de construction : "+
    x[id-1].getElementsByTagName("DATE_CREATION")[0].childNodes[0].nodeValue+
    "</li>"+
    "</ul></div></div>";
    document.getElementById("main").innerHTML = page; /*table est la concaténation du code html à ajouter*/
}
