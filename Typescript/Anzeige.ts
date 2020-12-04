function jsonlesen() {
    let lesen: Koerperteile = JSON.parse("BilderAuswahl.json");
}
async function jsondaten(_url: string): Promise<void> {
    let response: Response = await fetch(_url);
    let daten: string = await response.json();
    console.log("Test4", daten);
}
interface Koerperteile {
    Pfad: string;
    Name: string;
}
console.log("test1");
function showTheList(json: any): void {
    console.log("Test2");
    let arrItems: Koerperteile[];
    arrItems = json.Koepfe;

    let div: HTMLDivElement = <HTMLDivElement>document.getElementById("Kopfbilder");
    div.innerHTML = "";
    for (let i: number = 0; i <= arrItems.length - 1; i++) {
        let divLeft: HTMLDivElement = document.createElement("div");
        divLeft.innerHTML = arrItems[i].Name;

        let img: HTMLImageElement = document.createElement("img");
        img.src = arrItems[i].Pfad;

        let divRight: HTMLDivElement = document.createElement("div");
        divRight.setAttribute("style", "border-left: solid 1px #ddd;");
        divRight.appendChild(img);

        div.appendChild(divLeft);
        div.appendChild(divRight);
        console.log("Test3");
    }
}
async function warten(): Promise<void> {
    await jsondaten("BilderAuswahl.json");
}
warten();