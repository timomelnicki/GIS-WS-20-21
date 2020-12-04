"use strict";
console.log("test1");
function showTheList(json) {
    console.log("Test3");
    let arrItems;
    arrItems = JSON.parse(json).Koepfe;
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
        console.log("Test2");
    }
}
//# sourceMappingURL=Anzeige.js.map