"use strict";
async function registrieren() {
    console.log("Sending form data.");
    let submitbutton = document.getElementById("NutzerDaten");
    //let form = document.querySelector("NutzerDaten");
    let data = new FormData(submitbutton);
    let formData = JSON.stringify({ "fname": data.get("fname"),
        "lname": data.get("lname"),
        "strasseHauNr": data.get("strasseHauNr"),
        "postzahl": data.get("postzahl"),
        "stadt": data.get("stadt"),
        "email": data.get("email"),
        "passwort": data.get("passwort")
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
        .catch(error => {
        console.error("Error: " + error);
    });
    console.log("Data sent.");
}
async function einloggen() {
    console.log("sending login data");
    let submitbutton = document.getElementById("login");
    //let form = document.querySelector("NutzerDaten");
    let data = new FormData(submitbutton);
    let formData = JSON.stringify({
        "email": data.get("email"),
        "passwort": data.get("passwort")
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
        .catch(error => {
        console.error("Error: " + error);
    });
    console.log("Data sent.");
}
async function showUserlist() {
    fetch("http://localhost:8100/Namen", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
        console.log(response.statusText);
        let namen = "";
        response.json().then(js => {
            for (let i = 0; i < js.length - 1; i++) {
                //namen + fname + " " + lname + NEWLINE
                namen = namen + js[i].fname + " " + js[i].lname + "<br/>";
            }
            document.getElementById("Userliste").innerHTML = namen;
        });
    })
        .catch(error => {
        console.error("Error: " + error);
    });
}
//# sourceMappingURL=Typescripthtml.js.map