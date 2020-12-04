"use strict";
function jsonlesen() {
    let lesen = JSON.parse("BilderAuswahl.json");
}
async function jsondaten(_url) {
    let response = await fetch(_url);
    let daten = await response.json();
    console.log("Test4", daten);
}
console.log("test1");
function showTheList(json) {
    console.log("Test2");
    let arrItems;
    arrItems = json.Koepfe;
    let div = document.getElementById("Kopfbilder");
    div.innerHTML = "";
    for (let i = 0; i <= arrItems.length - 1; i++) {
        let divLeft = document.createElement("div");
        divLeft.innerHTML = arrItems[i].Name;
        let img = document.createElement("img");
        img.src = arrItems[i].Pfad;
        let divRight = document.createElement("div");
        divRight.setAttribute("style", "border-left: solid 1px #ddd;");
        divRight.appendChild(img);
        div.appendChild(divLeft);
        div.appendChild(divRight);
        console.log("Test3");
    }
}
async function warten() {
    await jsondaten("BilderAuswahl.json");
}
warten();
//# sourceMappingURL=Anzeige.js.map