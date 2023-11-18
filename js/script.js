let xmlhttp = new XMLHttpRequest(); //Creation de la variable stockant la requete XML
let max_id = -1; //Variable stockant l'ID max au sein du fichier XML pour l'ajout de nouveau bien
let xmlDoc; //Variable globale contenant la réponse XMLhttp
let AllData; //Boolean pour le choix d'affichage de données
//permet l'affichage de la pagination
let nbPage = 0;
let pageSize = 10;
let startIndex = 0;
let endIndex = 0;
let page = 1;
let filter = false;
let xmlDoc2 = new DOMParser().parseFromString("<CATALOGUE></CATALOGUE>", "text/xml");

//Permet la récupération de du fichier avec la vérification de la réussite de l'importation
//Appel fetchData() pour l'affichage
//Appel showPageLinks pour affichage pagination
function loadXMLDoc() {
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlDoc = xmlhttp.responseXML;
            max();
            let id_max_tab = max_price(0);
            set_max(id_max_tab);
        }
    };
    xmlhttp.open("GET", "../data/bdd2.xml", true);
    xmlhttp.send();
}

//Retourne l'indice max du fichier XML
function max() {
    let i;
    let x = xmlDoc.getElementsByTagName("BIEN");
    for (i = 0; i < x.length; i++) {
        if (parseInt(x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue) > max_id) {
            max_id = parseInt(x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue);
        }
    }
}

//Gere l'affichage du fichier XML avec les différents boutons et donnees souhaitees 
function fetchData(bool) {//Prend en parametre un boolean filtre 
    let i;
    let table = "<thead><tr><th scope='col'>Surface</th><th scope='col'>Nbpièces</th><th scope='col'>Arrondissement</th><th scope='col'>Prix</th><th scope='col'></th><th></th></tr></thead><tbody id='tbody'>";
    let x;
    if (bool) {
        x = xmlDoc2.getElementsByTagName("BIEN");
    }
    else {
        x = xmlDoc.getElementsByTagName("BIEN");
    }
    filter = bool;//Sauvegarde du mode d'affichage dans un boolean permanent
    //Permet d'afficher le tableau en fonction de la pagination
    //Est recalculer a chaque affichage du tableau, pour tenir compte des ajouts ou suppressions 
    //Calculer nbPage    
    nbPage = Math.ceil(x.length / pageSize);
    //Calculer startIndex et endIndex    
    startIndex = (page - 1) * pageSize;
    endIndex = startIndex + pageSize;
    if (endIndex > x.length) {
        endIndex = x.length;
    }
    showPageLinks();
    //
    for (i = startIndex; i < endIndex; i++) {
        table += "<tr><td class='text-center'>" +
            x[i].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue +
            "</td>" +
            "<td class='text-center'><button type='button' style='margin-right:15px;' class = 'btn btn-outline-primary' onclick='editLigne(" +
            x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
            ")'>Editer</button>" +
            "<button type='button' class = 'btn btn-outline-primary' onclick='deleteLigne(" +
            parseInt(x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue) +
            ")' >Supprimer</button>" +
            "</td>" +
            "</tr>";
    }
    max(); //Initialisation de la variable globale stockant le ID_MAX
    document.getElementById("data").innerHTML = table;
    AllData = false;
}

//Permet l'affichage ou la dissimulation du formulaire
//Change le contenu du bouton pour s'adapter a l'affichage
function showForm() {
    const form = document.getElementById("formulaire");
    const button = document.getElementById("button_show_form");
    if (form.style.display == "block") {
        form.style.display = "none";
        button.innerHTML = "Afficher le formulaire d'ajout";
    }
    else {
        form.style.display = "block"
        button.innerHTML = "Cacher le formulaire d'ajout";
    }
}

//Gere l'affichage du bouton ainsi que l'appel de l'affichage du formulaire
function addBien() {
    document.getElementById("button_update_new").innerHTML = "Ajouter le bien";
    //Reinitialisation du formulaire 
    document.getElementById("id_bien").value = -1; //Valeur invalide. Sera change pour avoir une valeur unique (max+1)
    document.getElementById("photo").value = null;
    document.getElementById("prix").value = null;
    document.getElementById("nb_pieces").value = null;
    document.getElementById("surface").value = null;
    document.getElementById("nb_bains").value = null;
    document.getElementById("t_sejour").value = null;
    document.getElementById("ascenseur").value = null;
    document.getElementById("type").value = null;
    document.getElementById("digicode").value = null;
    document.getElementById("garage").value = null;
    document.getElementById("d_creation").value = null;
    document.getElementById("nb_etages").value = null;
    document.getElementById("arrondissement").value = null;
    //
    showForm();
}

//Gere l'ajout d'une nouvelle ligne 
function addLigne() {
    let id_form = document.getElementById("id_bien").value;
    //permet de creer une nouvelle ligne si la valeur de l'id est resté par défaut
    if (id_form == "-1") {

        let bien = xmlDoc.createElement("BIEN");
        let id = xmlDoc.createElement("ID");
        let photo = xmlDoc.createElement("PHOTO");
        let prix = xmlDoc.createElement("PRIX");
        let nb_pieces = xmlDoc.createElement("NB_PIECES");
        let surface = xmlDoc.createElement("SURFACE");
        let nb_bains = xmlDoc.createElement("NB_BAINS");
        let t_sejour = xmlDoc.createElement("T_SEJOUR");
        let ascenseur = xmlDoc.createElement("ASCENSEUR");
        let type = xmlDoc.createElement("TYPE");
        let digicode = xmlDoc.createElement("DIGICODE");
        let garage = xmlDoc.createElement("GARAGE");
        let d_creation = xmlDoc.createElement("DATE_CREATION");
        let nb_etages = xmlDoc.createElement("NB_ETAGES");
        let arrondissement = xmlDoc.createElement("ARRONDISSEMENT");


        let res_photo = document.getElementById("photo").value;
        let res_prix = document.getElementById("prix").value;
        let res_nb_pieces = document.getElementById("nb_pieces").value;
        let res_surface = document.getElementById("surface").value;
        let res_nb_bains = document.getElementById("nb_bains").value;
        let res_t_sejour = document.getElementById("t_sejour").value;
        let res_ascenseur = document.getElementById("ascenseur").value;
        let res_type = document.getElementById("type").value;
        let res_digicode = document.getElementById("digicode").value;
        let res_garage = document.getElementById("garage").value;
        let res_d_creation = document.getElementById("d_creation").value;
        let res_nb_etages = document.getElementById("nb_etages").value;
        let res_arrondissement = document.getElementById("arrondissement").value;


        max_id += 1;//permet d'augmenter l'id max a chaque nouvelle creation de ligne 
        let id_Text = xmlDoc.createTextNode(max_id);
        let photo_Text = xmlDoc.createTextNode(res_photo);
        let prix_Text = xmlDoc.createTextNode(res_prix);
        let nb_pieces_Text = xmlDoc.createTextNode(res_nb_pieces);
        let surface_Text = xmlDoc.createTextNode(res_surface);
        let nb_bains_Text = xmlDoc.createTextNode(res_nb_bains);
        let t_sejour_Text = xmlDoc.createTextNode(res_t_sejour);
        let ascenseur_Text = xmlDoc.createTextNode(res_ascenseur);
        let type_Text = xmlDoc.createTextNode(res_type);
        let digicode_Text = xmlDoc.createTextNode(res_digicode);
        let garage_Text = xmlDoc.createTextNode(res_garage);
        let d_creation_Text = xmlDoc.createTextNode(res_d_creation);
        let nb_etages_Text = xmlDoc.createTextNode(res_nb_etages);
        let arrondissement_Text = xmlDoc.createTextNode(res_arrondissement);

        id.appendChild(id_Text);
        photo.appendChild(photo_Text);
        prix.appendChild(prix_Text);
        nb_pieces.appendChild(nb_pieces_Text);
        surface.appendChild(surface_Text);
        nb_bains.appendChild(nb_bains_Text);
        t_sejour.appendChild(t_sejour_Text);
        ascenseur.appendChild(ascenseur_Text);
        type.appendChild(type_Text);
        digicode.appendChild(digicode_Text);
        garage.appendChild(garage_Text);
        d_creation.appendChild(d_creation_Text);
        nb_etages.appendChild(nb_etages_Text);
        arrondissement.appendChild(arrondissement_Text);

        bien.append(id);
        bien.appendChild(photo);
        bien.appendChild(prix);
        bien.append(nb_pieces);
        bien.appendChild(surface);
        bien.appendChild(nb_bains);
        bien.append(t_sejour);
        bien.appendChild(ascenseur);
        bien.appendChild(type);
        bien.append(digicode);
        bien.appendChild(garage);
        bien.appendChild(d_creation);
        bien.append(nb_etages);
        bien.appendChild(arrondissement);

        let catalogue = xmlDoc.getElementsByTagName("CATALOGUE")[0];
        catalogue.appendChild(bien);
        //Permet le recalcul de la pagination en fonction de l'ajout
        let x = xmlDoc.getElementsByTagName("BIEN");
        nbPage = Math.ceil(x.length / pageSize);
        showPageLinks();
        if (AllData) {
            fetchAllData(false);//Affichage sans les filtres car ajout
        }
        else {
            fetchData(false);//Affichage sans les filtres car ajout
        }

    }
    else {
        console.log("Error, id != -1")
        console.log("Est considéré comme une modification")
    }
}

//Permet d'afficher le formulaire avec les champs pre-rempli lors d'une modification
//Change aussi le corps des différents boutons
function editLigne(i) {
    let x;
    if (filter) {
        x = xmlDoc2.getElementsByTagName("BIEN");
    }
    else {
        x = xmlDoc.getElementsByTagName("BIEN");
    }
    let idligne = findID(i, filter);
    fetchAllEditData(idligne);
    document.getElementById("id_bien_edit").value = x[idligne].getElementsByTagName("ID")[0].childNodes[0].nodeValue;
    document.getElementById("photo_edit").value = x[idligne].getElementsByTagName("PHOTO")[0].childNodes[0].nodeValue;
    document.getElementById("prix_edit").value = x[idligne].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue;
    document.getElementById("nb_pieces_edit").value = x[idligne].getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue;
    document.getElementById("surface_edit").value = x[idligne].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue;
    document.getElementById("nb_bains_edit").value = x[idligne].getElementsByTagName("NB_BAINS")[0].childNodes[0].nodeValue;
    document.getElementById("t_sejour_edit").value = x[idligne].getElementsByTagName("T_SEJOUR")[0].childNodes[0].nodeValue;
    document.getElementById("ascenseur_edit").value = x[idligne].getElementsByTagName("ASCENSEUR")[0].childNodes[0].nodeValue;
    document.getElementById("type_edit").value = x[idligne].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue;
    document.getElementById("digicode_edit").value = x[idligne].getElementsByTagName("DIGICODE")[0].childNodes[0].nodeValue;
    document.getElementById("garage_edit").value = x[idligne].getElementsByTagName("GARAGE")[0].childNodes[0].nodeValue;
    document.getElementById("d_creation_edit").value = x[idligne].getElementsByTagName("DATE_CREATION")[0].childNodes[0].nodeValue;
    document.getElementById("nb_etages_edit").value = x[idligne].getElementsByTagName("NB_ETAGES")[0].childNodes[0].nodeValue;
    document.getElementById("arrondissement_edit").value = x[idligne].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue;
}

//Affichage de la ligne a editer
function fetchAllEditData(idligne) {
    let i;
    let table = "<thead><tr>" +
        "<th scope='col'>Id</th>" +
        "<th scope='col'>Image</th>"+
        "<th scope='col'>Prix</th>" +
        "<th scope='col'>Nb pieces</th>" +
        "<th scope='col'>Surface</th>" +
        "<th scope='col'>Nb_bains</th>" +
        "<th scope='col'>T_sejour</th>" +
        "<th scope='col'>Ascenseur</th>" +
        "<th scope='col'>Type</th>" +
        "<th scope='col'>Digicode</th>" +
        "<th scope='col'>Garage</th>" +
        "<th scope='col'>Date creation</th>" +
        "<th scope='col'>Nb etages</th>" +
        "<th scope='col'>Arrondissement</th>" +
        "<th scope='col'></th>" +//permet d'ajouter les boutons dans cette colonne
        "</tr></thead>";
    table += "<tbody id='tbody'>";
    let x;
    if (filter) {
        x = xmlDoc2.getElementsByTagName("BIEN");
    }
    else {
        x = xmlDoc.getElementsByTagName("BIEN");
    }
    for (i = startIndex; i < endIndex; i++) {
        if (i == idligne) {
            table += "<tr><td class='text-center' id='id_bien_edit'>" +
                x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue + //Empeche l'administrateur de changer les id
                "</td>" + "<td class='text-center' style='width:200px'>" +
                "<input type='text' id='photo_edit' class='form-control' >"+
                "</td><td class='text-center'>"+
                "<input type='text' id='prix_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='nb_pieces_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='surface_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='nb_bains_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='t_sejour_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='ascenseur_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='type_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='digicode_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='garage_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='d_creation_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='nb_etages_edit' class='form-control'>" +
                "</td><td class='text-center'>" +
                "<input type='text' id='arrondissement_edit' class='form-control'>" +
                "</td>" +
                "<td><button type='button' style='margin-right:15px;' class = 'btn btn-outline-primary' onclick='updateLigne(" +
                x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
                ")'>Sauvegarder les modifications</button>" +
                "</td>" +
                "</tr>";
        }
        else {
            table += "<tr><td class='text-center'>" +
                x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" + 
                "NULL</td><td class='text-center'>"+
                x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("NB_BAINS")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("T_SEJOUR")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("ASCENSEUR")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("DIGICODE")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("GARAGE")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("DATE_CREATION")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("NB_ETAGES")[0].childNodes[0].nodeValue +
                "</td><td class='text-center'>" +
                x[i].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue +
                "</td>" +
                "<td><button type='button' style='margin-right:15px;' class = 'btn btn-outline-primary' onclick='editLigne(" +
                x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
                ")'>Editer</button>" +
                "<button type='button' class = 'btn btn-outline-primary' onclick='deleteLigne(" +
                parseInt(x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue) +
                ")'>Supprimer</button>" +
                "</td>" +
                "</tr>";
        }

    }
    document.getElementById("data").innerHTML = table;
    AllData = true;
}
function updateLigne() {
    let id_form = document.getElementById("id_bien_edit").value;
    let element_filter;
    let element;
    if (filter) {
        let id_ligne_filter = findID(parseInt(id_form), true);
        let id_ligne = findID(parseInt(id_form), false);
        element_filter = xmlDoc2.getElementsByTagName("BIEN")[id_ligne_filter];
        element = xmlDoc.getElementsByTagName("BIEN")[id_ligne];
        element.getElementsByTagName("PRIX")[0].childNodes[0].nodeValue = document.getElementById("prix_edit").value;
        element.getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue = document.getElementById("nb_pieces_edit").value;
        element.getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue = document.getElementById("surface_edit").value;
        element.getElementsByTagName("NB_BAINS")[0].childNodes[0].nodeValue = document.getElementById("nb_bains_edit").value;
        element.getElementsByTagName("T_SEJOUR")[0].childNodes[0].nodeValue = document.getElementById("t_sejour_edit").value;
        element.getElementsByTagName("ASCENSEUR")[0].childNodes[0].nodeValue = document.getElementById("ascenseur_edit").value;
        element.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue = document.getElementById("type_edit").value;
        element.getElementsByTagName("DIGICODE")[0].childNodes[0].nodeValue = document.getElementById("digicode_edit").value;
        element.getElementsByTagName("GARAGE")[0].childNodes[0].nodeValue = document.getElementById("garage_edit").value;
        element.getElementsByTagName("DATE_CREATION")[0].childNodes[0].nodeValue = document.getElementById("d_creation_edit").value;
        element.getElementsByTagName("NB_ETAGES")[0].childNodes[0].nodeValue = document.getElementById("nb_etages_edit").value;
        element.getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue = document.getElementById("arrondissement_edit").value;

        element_filter.getElementsByTagName("PRIX")[0].childNodes[0].nodeValue = document.getElementById("prix_edit").value;
        element_filter.getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue = document.getElementById("nb_pieces_edit").value;
        element_filter.getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue = document.getElementById("surface_edit").value;
        element_filter.getElementsByTagName("NB_BAINS")[0].childNodes[0].nodeValue = document.getElementById("nb_bains_edit").value;
        element_filter.getElementsByTagName("T_SEJOUR")[0].childNodes[0].nodeValue = document.getElementById("t_sejour_edit").value;
        element_filter.getElementsByTagName("ASCENSEUR")[0].childNodes[0].nodeValue = document.getElementById("ascenseur_edit").value;
        element_filter.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue = document.getElementById("type_edit").value;
        element_filter.getElementsByTagName("DIGICODE")[0].childNodes[0].nodeValue = document.getElementById("digicode_edit").value;
        element_filter.getElementsByTagName("GARAGE")[0].childNodes[0].nodeValue = document.getElementById("garage_edit").value;
        element_filter.getElementsByTagName("DATE_CREATION")[0].childNodes[0].nodeValue = document.getElementById("d_creation_edit").value;
        element_filter.getElementsByTagName("NB_ETAGES")[0].childNodes[0].nodeValue = document.getElementById("nb_etages_edit").value;
        element_filter.getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue = document.getElementById("arrondissement_edit").value;
    }
    else {
        let id_ligne = findID(parseInt(id_form), false);
        element = xmlDoc.getElementsByTagName("BIEN")[id_ligne];
        element.getElementsByTagName("PRIX")[0].childNodes[0].nodeValue = document.getElementById("prix_edit").value;
        element.getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue = document.getElementById("nb_pieces_edit").value;
        element.getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue = document.getElementById("surface_edit").value;
        element.getElementsByTagName("NB_BAINS")[0].childNodes[0].nodeValue = document.getElementById("nb_bains_edit").value;
        element.getElementsByTagName("T_SEJOUR")[0].childNodes[0].nodeValue = document.getElementById("t_sejour_edit").value;
        element.getElementsByTagName("ASCENSEUR")[0].childNodes[0].nodeValue = document.getElementById("ascenseur_edit").value;
        element.getElementsByTagName("TYPE")[0].childNodes[0].nodeValue = document.getElementById("type_edit").value;
        element.getElementsByTagName("DIGICODE")[0].childNodes[0].nodeValue = document.getElementById("digicode_edit").value;
        element.getElementsByTagName("GARAGE")[0].childNodes[0].nodeValue = document.getElementById("garage_edit").value;
        element.getElementsByTagName("DATE_CREATION")[0].childNodes[0].nodeValue = document.getElementById("d_creation_edit").value;
        element.getElementsByTagName("NB_ETAGES")[0].childNodes[0].nodeValue = document.getElementById("nb_etages_edit").value;
        element.getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue = document.getElementById("arrondissement_edit").value;
    }
    fetchAllData(filter);
}
//Retourne la valeur du noeud en fonction d'un id recherche, si l'id n'est pas dans le fichier XML, retourne -1
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
//Permet la suppression d'une ligne
function deleteLigne(id_bien) {
    let id_node = findID(id_bien, filter);
    let x;
    if (filter) {
        x = xmlDoc2;
    }
    else {
        x = xmlhttp.responseXML;
    }

    let bien_delete = x.getElementsByTagName("BIEN")[id_node];
    let parent_bien_delete = x.getElementsByTagName("CATALOGUE")[0];
    parent_bien_delete.removeChild(bien_delete);
    //Calculer nbPage    
    nbPage = Math.ceil(x.length / pageSize);
    //Calculer startIndex et endIndex    
    startIndex = (page - 1) * pageSize;
    endIndex = startIndex + pageSize;
    if (endIndex > x.length) {
        endIndex = x.length;
    }
    showPageLinks();
    //
    if (AllData) {
        fetchAllData(filter);
    }
    else {
        fetchData(filter);
    }
}

//Affichage de l'entierete des donnees 
function fetchAllData(bool) {
    let i;
    let table = "<thead><tr>" +
        "<th scope='col'>Id</th>" +
        "<th scope='col'>Prix</th>" +
        "<th scope='col'>Nb pieces</th>" +
        "<th scope='col'>Surface</th>" +
        "<th scope='col'>Nb_bains</th>" +
        "<th scope='col'>T_sejour</th>" +
        "<th scope='col'>Ascenseur</th>" +
        "<th scope='col'>Type</th>" +
        "<th scope='col'>Digicode</th>" +
        "<th scope='col'>Garage</th>" +
        "<th scope='col'>Date creation</th>" +
        "<th scope='col'>Nb etages</th>" +
        "<th scope='col'>Arrondissement</th>" +
        "<th scope='col'></th>" +//permet d'ajouter les boutons dans cette colonne
        "</tr></thead>";
    table += "<tbody id='tbody'>";
    let x;
    if (bool) {
        x = xmlDoc2.getElementsByTagName("BIEN");
    }
    else {
        x = xmlDoc.getElementsByTagName("BIEN");
    }
    filter = bool;
    //permet l'affichage en fonction du nombre de page
    //Calculer nbPage    
    nbPage = Math.ceil(x.length / pageSize);
    //Calculer startIndex et endIndex    
    startIndex = (page - 1) * pageSize;
    endIndex = startIndex + pageSize;
    if (endIndex > x.length) {
        endIndex = x.length;
    }
    showPageLinks();
    for (i = startIndex; i < endIndex; i++) {
        table += "<tr><td class='text-center'>" +
            x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("NB_PIECES")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("SURFACE")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("NB_BAINS")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("T_SEJOUR")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("ASCENSEUR")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("DIGICODE")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("GARAGE")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("DATE_CREATION")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("NB_ETAGES")[0].childNodes[0].nodeValue +
            "</td><td class='text-center'>" +
            x[i].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue +
            "</td>" +
            "<td><button type='button' style='margin-right:15px;' class = 'btn btn-outline-primary' onclick='editLigne(" +
            x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue +
            ")'>Editer</button>" +
            "<button type='button' class = 'btn btn-outline-primary' onclick='deleteLigne(" +
            parseInt(x[i].getElementsByTagName("ID")[0].childNodes[0].nodeValue) +
            ")'>Supprimer</button>" +
            "</td>" +
            "</tr>";
    }
    document.getElementById("data").innerHTML = table;
    AllData = true;
}
//<button type="button" class="btn btn-outline-primary">Primary</button>
function loadPage(pageNumber) {
    //Mettre à jour la valeur de page en fonction de pageNumber
    page = pageNumber;
    //Appeler la fonction fetchData
    if (AllData) {
        fetchAllData(filter);
    }
    else {
        fetchData(filter);
    }

}
//Permet l'affichage des boutons de pagination
function showPageLinks() {
    let divpl = document.getElementById("pageLinks");
    divpl.style.display = "block";
    let i;
    let res = "Pages : ";
    for (i = 1; i <= nbPage; i++) {
        res += "<input type='button' class = 'btn btn-outline-primary' style='margin-right:5px;'onclick='loadPage(" + i + ")' value=" + i + ">";
    }
    divpl.innerHTML = res;
}




//
//Sauvegarde du nouveau fichier XML : 
//
//Cette partie a été commenté par ChatGPT pour mon UNIQUE compréhension. Cette partie du code étant récupéré du cours d'Environnements Informatique de L1 

// Cette fonction prend une chaîne de texte en entrée et crée un objet Blob
// contenant ce texte au format 'text/plain'. Elle retourne l'URL de cet objet Blob.
function makeTextFile(text) {
    let textFile = null; // Variable pour stocker l'URL de l'objet Blob
    let data = new Blob([text], { type: 'text/plain' }); // Crée un objet Blob à partir du texte

    if (textFile !== null) {
        // Révoque l'URL de l'objet Blob précédent s'il existe
        window.URL.revokeObjectURL(textFile);
    }

    // Crée un nouvel URL pour l'objet Blob actuel
    textFile = window.URL.createObjectURL(data);

    return textFile; // Retourne l'URL de l'objet Blob
}

// Cette fonction est destinée à être déclenchée lorsqu'un bouton avec l'ID 'btnSave' est cliqué.
function saveBook() {
    let create = document.getElementById('btnSave'); // Récupère l'élément de bouton par son ID

    // Crée un élément 'a' (un lien) pour permettre le téléchargement du fichier
    let link = document.createElement('a');
    link.setAttribute('download', 'eif_bdd.xml'); // Définit l'attribut 'download' avec le nom du fichier

    // Crée un objet XMLSerializer pour convertir un objet XMLHttpRequest (xmlhttp.responseXML) en chaîne XML
    const s = new XMLSerializer();

    // Définit l'URL du lien pour le téléchargement en utilisant makeTextFile
    link.href = makeTextFile(s.serializeToString(xmlhttp.responseXML));

    // Ajoute le lien à la fin du corps (body) du document
    document.body.appendChild(link);

    // Utilise window.requestAnimationFrame pour déclencher le téléchargement du fichier
    window.requestAnimationFrame(function () {
        let event = new MouseEvent('click'); // Crée un événement de clic
        link.dispatchEvent(event); // Déclenche l'événement de clic sur le lien
        document.body.removeChild(link); // Supprime le lien du document après le téléchargement
    });
}
//Fin des comment créé par ChatGPT
//Fin de la sauvegarde 

//Début filtre
function filterData() {
    xmlDoc2 = new DOMParser().parseFromString("<CATALOGUE></CATALOGUE>", "text/xml");
    let min_price = parseInt(document.getElementById("min_price").value);
    let max_price = parseInt(document.getElementById("max_price").value);
    let arrondissement = parseInt(document.getElementById("select_arrondissement").value);
    let maison_appart = parseInt(document.getElementById("maison_appart").value);
    let i;
    xmlDoc2 = new DOMParser().parseFromString("<CATALOGUE></CATALOGUE>", "text/xml");
    let x = xmlDoc.getElementsByTagName("BIEN");
    //permet si aucun arrondissement n'est selectionner de selectionner tous les biens
    let verif_arrondissement = false;
    if (arrondissement == -1) {
        verif_arrondissement = true;
    }
    //
    //même chose pour maison/appartement
    let verif_maison_appart = false;
    if (maison_appart == -1) {
        verif_maison_appart = true;
    }
    else if (maison_appart == 0) {
        maison_appart = "maison";
    }
    else {
        maison_appart = "appartement";
    }
    for (i = 0; i < x.length; i++) {
        if (verif_arrondissement) {
            arrondissement = x[i].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue;
        }
        if (verif_maison_appart) {
            maison_appart = x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue;
        }
        if (parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue) < max_price && min_price < parseInt(x[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue) && x[i].getElementsByTagName("ARRONDISSEMENT")[0].childNodes[0].nodeValue == arrondissement && x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue == maison_appart) {
            let clone = x[i].cloneNode(true);
            xmlDoc2.getElementsByTagName("CATALOGUE")[0].appendChild(clone);
        }
    }
    
    if (parseInt(document.getElementById("tri").value) != -1) {
        tri();
    }   
    if (AllData) {
        fetchAllData(true);
    }
    else {
        fetchData(true);
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
function searchByID() {
    xmlDoc2 = new DOMParser().parseFromString("<CATALOGUE></CATALOGUE>", "text/xml");
    let id_search = document.getElementById("id_search").value;
    let id_table = findID(id_search);
    let biens = xmlDoc.getElementsByTagName("BIEN");
    let clone = biens[id_table].cloneNode(true);
    xmlDoc2.getElementsByTagName("CATALOGUE")[0].appendChild(clone);
    if (AllData) {
        fetchAllData(true);
    }
    else {
        fetchData(true);
    }
}
function searchByPrice() {
    xmlDoc2 = new DOMParser().parseFromString("<CATALOGUE></CATALOGUE>", "text/xml");
    let price_search = parseInt(document.getElementById("price_search").value);
    let biens = xmlDoc.getElementsByTagName("BIEN");
    let i;
    for (i = 0; i < biens.length; i++) {

        if (biens[i].getElementsByTagName("PRIX")[0].childNodes[0].nodeValue == price_search) {
            let clone = biens[i].cloneNode(true);
            xmlDoc2.getElementsByTagName("CATALOGUE")[0].appendChild(clone);
        }

    }
    if (AllData) {
        fetchAllData(true);
    }
    else {
        fetchData(true);
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
    if (AllData) {
        fetchAllData(true);
    }
    else {
        fetchData(true);
    }
}
function showFilter(){
    if (document.getElementsByClassName("filter")[0].style.display == "block"){
        document.getElementsByClassName("filter")[0].style.display = "none";
        document.getElementById("btnShowFilter").innerHTML = "Afficher le formulaire de tri"
    }
    else{
        document.getElementsByClassName("filter")[0].style.display = "block";
        document.getElementById("btnShowFilter").innerHTML = "Cacher le formulaire de tri"
    }
}


