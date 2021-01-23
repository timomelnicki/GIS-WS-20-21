"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const fs = require("fs");
const Mongo = require("mongodb");
//import { request } from "express";
//import express, { response } from "express";
var P_3_1Server;
(function (P_3_1Server) {
    (async function () {
        console.log("Starting server");
        let port = Number(process.env.PORT);
        if (!port)
            port = 8100;
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
        let url = "mongodb://localhost:27017";
        let options;
        let mongoClient = new Mongo.MongoClient(url, options);
        await mongoClient.connect();
        let dbconnection = mongoClient.db("Nutzer").collection("Users");
        function handleListen() {
            console.log("Listening on port " + port);
        }
        function handleRequest(_request, _response) {
            console.log("Received client request.");
            //_response.setHeader("content-type", "text/html; charset=utf-8");
            //_response.setHeader("Access-Control-Allow-Origin", "*");
            //_response.write(_request.url);
            if (_request.method === "GET") {
                console.log("Request type: GET");
                handleGet(_request, _response);
            }
            else if (_request.method === "POST") {
                console.log("Request type: POST");
                handlePost(_request, _response);
            }
            /*_response.setHeader("content-type", "text/html; charset=utf-8");
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.end();*/
        }
        function handlePost(_request, _response) {
            let body = "";
            _request.on("data", data => {
                body += data;
            });
            _request.on("end", async () => {
                let post = JSON.parse(body);
                console.log("POST body data: '" + body + "'");
                console.log("Request URL: '" + _request.url + "'");
                if (_request.url == "/login") {
                    console.log("Performing login.");
                    let result = await dbconnection.findOne({ "email": JSON.parse(body).email, "passwort": JSON.parse(body).passwort });
                    if (result) {
                        console.log("Login erfolgreich");
                        _response.writeHead(200, "Sie wurden erfolgreich eingeloggt", {
                            "Content-Type": "text/plain"
                        });
                    }
                    else {
                        console.log("Ungültige Logindaten");
                        _response.writeHead(200, "Login fehlgeschlagen, bitte überprüfen Sie Ihre Eingabe", {
                            "Content-Type": "text/plain"
                        });
                    }
                }
                else {
                    console.log("Performing registration.");
                    let result = await dbconnection.findOne({ "email": JSON.parse(body).email });
                    if (result) {
                        console.log("Email already exists.");
                        _response.writeHead(200, "Email ist bereits vorhanden, bitte eine neue eingeben", {
                            "Content-Type": "text/plain"
                        });
                    }
                    else {
                        console.log("Email doesn't exist. Created new entry.");
                        _response.writeHead(200, "Erfolgreich Registriert!", {
                            "Content-Type": "text/plain"
                        });
                        dbconnection.insertOne(JSON.parse(body)); //insert laut der documentation ist veraltet
                    }
                }
                /*_response.writeHead(200, "Erfolgreich Registriert!", {
                    "Content-Type": "text/plain"
                });*/
                _response.end();
                console.log("Post response: 200 OK");
            });
        }
        function handleGet(_request, _response) {
            console.log("Request: " + _request.url);
            if (_request.url == "/Namen") {
                dbconnection.find({}, { projection: { _id: 0,
                        fname: 1,
                        lname: 1 } })
                    .toArray((error, result) => {
                    if (error) {
                        console.log("Error: " + error);
                        _response.writeHead(500);
                        _response.write("Unerwarteter Fehler");
                    }
                    else {
                        console.log(result);
                        _response.writeHead(200, { "Content-Type": "text/html" });
                        _response.write(JSON.stringify(result));
                    }
                    _response.end();
                });
            }
            else {
                if (_request.url == "/") {
                    _request.url = "/Index.html";
                }
                fs.readFile("." + _request.url, function (error, pgResp) {
                    if (error) {
                        console.log("Error when responding with" + _request.url);
                        _response.writeHead(404);
                        _response.write("Contents you are looking are Not Found");
                    }
                    else {
                        console.log("Successfully sent Response" + _request.url);
                        _response.writeHead(200, { "Content-Type": "text/html" });
                        _response.write(pgResp);
                    }
                    _response.end();
                });
            }
        }
        /*express.get( "/" , function(request: any, response: any) {
            console.log(request.body.user.name);
            console.log(request.body.user.email);
            response.sendFile(__dirname + "/Registrierung.html");
        }); */
    })();
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=Server.js.map