    interface Bild {
        Pfad: string;
        Name: string;
    }
    interface Daten {
        Koepfe: Array<Bild>;
        Koerper: Array<Bild>;
        Beine: Array<Bild>;
    }
    interface Serverrueckgabe {
        error: string;
        message: string;
    }
    let koepfe: Array<Bild>;
    let koerper: Array<Bild>;
    let beine: Array<Bild>;

    let page: string = document.body.id;

    //jsondaten anfordern
    async function jsondaten(_url: string): Promise<void> {
        console.log("Start jsondaten");
        let response: Response = await fetch(_url);
        let daten: Daten = await response.json();
        console.log("All json", daten);
        
        koepfe = daten.Koepfe;
        koerper = daten.Koerper;
        beine = daten.Beine;

        console.log("Koepfe", koepfe);
        console.log("Koerper", koerper);
        console.log("Beine", beine);
    
    }

    //weiter Button erstellen
    function weiter( _s: string, _testStorage: string): void {
        let divButton: HTMLElement =  document.getElementById("weiter");
        let weiterButton: HTMLButtonElement = document.createElement("button");
        weiterButton.appendChild(document.createTextNode("weiter"));
        divButton.appendChild(weiterButton);

        weiterButton.addEventListener("click", link);
    
        function link(): void {
            if (localStorage.getItem(_testStorage) == null ) {
                alert("Bitte wählen Sie ein Bild aus");
            }
            else {
                document.location.href = _s;
            } 
        }  
    }

    //zurück Button erstellen
    function zurueck ( _s: string): void {
        let divButton: HTMLElement = document.getElementById("zurueck");
        let buttonWeiter: HTMLButtonElement = document.createElement("button");
        buttonWeiter.appendChild(document.createTextNode("zurück"));
        divButton.appendChild(buttonWeiter);

        buttonWeiter.addEventListener("click", link);
    
        function link(): void {
            document.location.href = _s;
        }
    }
    //Serveranfrage für Error oder Message
    async function serveranfrage(_kopf: string, _koerper: string, _beine: string, _url: string): Promise<void> {
        let query: URLSearchParams = new URLSearchParams( { _kopf: localStorage.getItem(_kopf) ,
                                                            _koerper: localStorage.getItem(_koerper) ,
                                                            _beine: localStorage.getItem(_beine) } ) ;
        _url = _url + "?" + query.toString();
        let _antwort: Response = await fetch(_url);
        let _ausgabe: Serverrueckgabe = await _antwort.json();
        let _text: HTMLDivElement = <HTMLDivElement> document.getElementById("serverantwort");
        _text.textContent = "Serverantwort: " + (_ausgabe.error || _ausgabe.message);                                  //entweder error oder message ausgeben da anderes undefined
    }
    //Charakteransicht
    function createBildFinal (_id: string, _nameStorage: string): void {
        let _div: HTMLDivElement = <HTMLDivElement> document.getElementById(_id);
        let _img: HTMLImageElement = document.createElement("img");
        console.log("Pic location: ", localStorage.getItem(_nameStorage));
        _img.setAttribute("src", localStorage.getItem(_nameStorage));
        _div.appendChild(_img);
    }


    //Bilderansicht der einzelnen Koerperteile     
    function createImages(_bilder: Array<Bild>, _koerperteilQuelleStorage: string, _koerperteilNameStorage: string): void {
        let divChoice: HTMLElement = document.getElementById("auswahl");
        let choice: HTMLImageElement = <HTMLImageElement> document.createElement("img");

        //Bilder dem Array-Wert entsprechend erzeugen
        for (let i: number = 0; i < _bilder.length; i++) {
            let divKoerperteil: HTMLDivElement = document.createElement("div");
            let bildKoerperteil: HTMLImageElement = document.createElement("img");

            bildKoerperteil.classList.add("Bild");
            bildKoerperteil.setAttribute("src", _bilder[i].Pfad + "/" + _bilder[i].Name);
            bildKoerperteil.dataset.value = _bilder[i].Name;
            divKoerperteil.appendChild(bildKoerperteil);
            let divBilder: HTMLDivElement = <HTMLDivElement> document.getElementById("Koerperteile");
            divBilder.appendChild(divKoerperteil);

            //Bild auswählen und anzeigen
            function bildAuswahl(): void {
                let auswahlName: string =  _bilder[i].Pfad + "/" + _bilder[i].Name;
                localStorage.setItem(_koerperteilNameStorage, auswahlName);
                choice.setAttribute("src", localStorage.getItem(_koerperteilNameStorage));
                divChoice.appendChild(choice);
            }
            bildKoerperteil.addEventListener("click", bildAuswahl);
        }
    }

    async function main(): Promise<void> {
        await jsondaten("BilderAuswahl.json");
        console.log("HI, my name is... ", page);
        //Entscheidungen für die einzelnen Seiten
        switch (page)  {


            case "SeiteKopf":
                weiter("Koerper.html", "nameKopfStorage");
                console.log("Length heads: ", koepfe);
                createImages( koepfe,  "storageKoepfe", "nameKopfStorage");
                break;


            case "SeiteKoerper":
                weiter("Beine.html", "nameKoerperStorage");
                zurueck("Kopf.html");
                createImages( koerper,  "storageKoerper", "nameKoerperStorage");
                break;
    
    
    
            case "SeiteBeine":
                weiter("Charakteransicht.html", "nameBeineStorage");
                zurueck("Koerper.html");
                createImages( beine,  "storageBeine", "nameBeineStorage");
                break;
    
            case "SeiteCharakteransicht":
                // Endbild erzeugen
                createBildFinal("Kopf", "nameKopfStorage");
                createBildFinal("Koerper", "nameKoerperStorage");
                createBildFinal("Beine", "nameBeineStorage");
                zurueck("Kopf.html");
                serveranfrage("nameKopfStorage", "nameKoerperStorage", "nameBeineStorage", "https://gis-communication.herokuapp.com");
                break;
        }
    }
    main();