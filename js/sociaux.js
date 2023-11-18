let xmlhttp2 = new XMLHttpRequest();
function loadSocialDoc() {
    xmlhttp2.onreadystatechange = function () {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            addHrefLinks();
        }
    };
    xmlhttp2.open("GET", "../data/reseaux.xml", true);
    xmlhttp2.send();
}
function loadSocialDoc_index() {
    xmlhttp2.onreadystatechange = function () {
        if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
            addHrefLinks();
        }
    };
    xmlhttp2.open("GET", "./data/reseaux.xml", true);
    xmlhttp2.send();
}

/*
    <database>
    <socialMedia>
        <platform>
            <name>Instagram</name>
            <link>https://www.instagram.com/your_instagram_account</link>
        </platform>
        <platform>
            <name>Facebook</name>
            <link>https://www.facebook.com/your_facebook_account</link>
        </platform>
        <platform>
            <name>Twitter</name>
            <link>https://www.twitter.com/your_twitter_account</link>
        </platform>
    </socialMedia>
</database>

*/ 
function addHrefLinks() {
    let xmlDoc2 = xmlhttp2.responseXML;
    let x = xmlDoc2.getElementsByTagName("platform");
    let i;
    for (i = 0; i < x.length; i++) {
        let platform = x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        let link = x[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
        let a = document.getElementById(platform);
        a.href = link;
    }
}