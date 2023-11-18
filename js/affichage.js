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
//Voici la structure d'un bien dans la base XML
/* <ID>2</ID>
        <PHOTO>https://images.pexels.com/photos/2030037/pexels-photo-2030037.jpeg</PHOTO>
        <TYPE>maison</TYPE>
        <PRIX>900000</PRIX>
        <NB_PIECES>5</NB_PIECES>
        <SURFACE>180</SURFACE>
        <NB_BAINS>3</NB_BAINS>
        <T_SEJOUR>75</T_SEJOUR>
        <ASCENSEUR>0</ASCENSEUR>
        
        <DIGICODE>0</DIGICODE>
        <GARAGE>1</GARAGE>
        <DATE_CREATION>2008</DATE_CREATION>
        <NB_ETAGES>2</NB_ETAGES>
        <ARRONDISSEMENT>8</ARRONDISSEMENT> */
function construction(){
    let xmlDoc = xmlhttp.responseXML;
    let page = "";
    let x = xmlDoc.getElementsByTagName("BIEN");
    page = "<div class='contain1'><div id = 'picture'><img src='"+
    x[id-1].getElementsByTagName("PHOTO")[0].childNodes[0].nodeValue+
    "'style='width:100%'> "+
    "</div ><div id='content' style='color:white;'>"+
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
    x[id-1].getElementsByTagName("ASCENSEUR")[0].childNodes[0].nodeValue+
    "</li>"+
    "<li>Garage : "+
    x[id-1].getElementsByTagName("GARAGE")[0].childNodes[0].nodeValue+
    "</li>"+
    "<li>Code d'accès : "+
    x[id-1].getElementsByTagName("DIGICODE")[0].childNodes[0].nodeValue+
    "</li>"+
    "<li>Année de construction : "+
    x[id-1].getElementsByTagName("DATE_CREATION")[0].childNodes[0].nodeValue+
    "</li>"+
    "</ul></div></div>";
    document.getElementById("main").innerHTML = page; /*table est la concaténation du code html à ajouter*/
}
