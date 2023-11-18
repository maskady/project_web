let xmlhttp_admin = new XMLHttpRequest();
function loadXMLAuthentification() {
    xmlhttp_admin.onreadystatechange = function () {
        if (xmlhttp_admin.readyState == 4 && xmlhttp_admin.status == 200) {
            verification();
        }
    };
    xmlhttp_admin.open("GET", "../data/admins.xml", true);
    xmlhttp_admin.send();
}
function verification() {
    let xmlDoc = xmlhttp_admin.responseXML;
    let i;
    let bool = 0;
    let admins = xmlDoc.getElementsByTagName("ADMIN");
    let value_id = document.getElementById("mail").value;
    let value_password_non_hash = document.getElementById("password").value;
    let value_password_hash = CryptoJS.SHA1(value_password_non_hash);
    
    for (i = 0; i < admins.length; i++) {
        if (admins[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue == value_id && admins[i].getElementsByTagName("PASSWORD")[0].childNodes[0].nodeValue == value_password_hash) {
            let link = "./gestion.html?id=" + value_id + "&password=" + value_password_hash;
            window.location.href = link;
            bool = 1;
        }
    }
    if (bool == 0) {
        document.getElementsByClassName("input_login")[0].innerHTML += "<span style='color:red; font-weight:bold;'>Erreur d'authentification</span>";
    }
}
