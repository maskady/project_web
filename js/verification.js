let xmlhttp_admin = new XMLHttpRequest();
function loadXMLAuthentification() {
    xmlhttp_admin.onreadystatechange = function () {
        if (xmlhttp_admin.readyState == 4 && xmlhttp_admin.status == 200) {
            verification_login();
        }
    };
    xmlhttp_admin.open("GET", "../data/admins.xml", true);
    xmlhttp_admin.send();
}
function verification_login(){
    let xmlDoc = xmlhttp_admin.responseXML;
    let i;
    let bool = 0;
    const urlParams = new URLSearchParams(window.location.search);
    let idadmin = urlParams.get("id");
    let password_hash = urlParams.get("password");
    let admins = xmlDoc.getElementsByTagName("ADMIN");
    for (i = 0; i < admins.length; i++) {
        if (admins[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == idadmin && admins[i].getElementsByTagName("PASSWORD")[0].childNodes[0].nodeValue == password_hash) {
            bool = 1;
        }
    }
    if (bool == 0) {
        alert("Votre authentification n'a pas réussi");
        window.location.href = '../index.html';
    }
}

