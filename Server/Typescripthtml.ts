async function registrieren(): Promise<void> {
    console.log("Sending form data.");
    let submitbutton: HTMLFormElement = <HTMLFormElement> document.getElementById("NutzerDaten");
    //let form = document.querySelector("NutzerDaten");
    let data: FormData = new FormData(submitbutton);
    
    let formData: string = JSON.stringify(
                            {"fname": data.get("fname") as string, 
                            "lname": data.get("lname") as string,
                            "strasseHauNr": data.get("strasseHauNr") as string,
                            "postzahl": data.get("postzahl") as string,
                            "stadt": data.get("stadt") as string,
                            "email": data.get("email") as string,
                            "passwort": data.get("passwort") as string
                            });

    console.log("Form data: '" + formData + "'");
    fetch("http://localhost:8100", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        
        body: formData
    })
    .then(response => {
        console.log(response.statusText);
        document.getElementById("Message").innerHTML = response.statusText;
    })

    .catch (error => {
        console.error("Error: " + error);
    });

    
    console.log("Data sent.");
}

async function einloggen(): Promise<void> {
    console.log("sending login data");
    let submitbutton: HTMLFormElement = <HTMLFormElement> document.getElementById("login");
    //let form = document.querySelector("NutzerDaten");
    let data: FormData = new FormData(submitbutton);
    
    let formData: string = JSON.stringify(
                            {
                            "email": data.get("email") as string,
                            "passwort": data.get("passwort") as string
                            });

    console.log("Form data: '" + formData + "'");
    fetch("http://localhost:8100/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        
        body: formData
    })
    .then(response => {
        console.log(response.statusText);
        document.getElementById("loginmeldung").innerHTML = response.statusText;
    })
    .catch (error => {
        console.error("Error: " + error);
    });

    
    console.log("Data sent.");
}

async function showUserlist(): Promise<void> {
    fetch("http://localhost:8100/Namen", {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log(response.statusText);
        let namen: string = "";
        response.json().then(js => {
            for (let i: number = 0; i < js.length - 1; i++ ) {
                //namen + fname + " " + lname + NEWLINE
                namen = namen + js[i].fname + " " + js[i].lname + "<br/>";    
            }
            document.getElementById("Userliste").innerHTML = namen;
        });
        
        
    })
    .catch (error => {
        console.error("Error: " + error);
    });
}