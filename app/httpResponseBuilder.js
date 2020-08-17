const fs = require("fs");
const path = require("path");
const {getControllerList} = require("./utils/controllerParser");

function buildResponse(req) {

    const request = req.toString();

    let body;

    if (getMethod(request) === "GET")
        body = getResponseBody(getPath(request)) ?? "NO PAGE";

    return 'HTTP/1.0 ' + buildStatus() +
        'Content-Type: text \r\n' +
        'X-Content-Type-Options: nosniff \r\n' +
        "\r\n" +
        body;
}

function buildStatus() {
    return "200 OK \n";
}

function buildBody() {
    return "Hello world";
}

function getMethod(request) {
    return request.split(" ")[0];
}

function getPath(request) {
    const pathWithSlash = request.split(" ")[1];
    const pathWithNoSlash = pathWithSlash.substring(1, pathWithSlash.length);
    
    return pathWithNoSlash;
}

function getResponseBody(requested) {
    if (requested.indexOf(".") !== -1)
        return getFile(requested);
    else if (getControllerList().indexOf(requested) !== -1)
        return getAction(requested);
    
    return;
}

function getPage(fileName) {
    const filePath = path.resolve(__dirname, "./views/" + fileName + ".html");
    return fs.existsSync(filePath) ? fs.readFileSync(filePath) : "";
}

function getAction(fileName) {
    const {GET} = require(`./controllers/${fileName}`);
    return GET();
}

function getFile(fileName) {
    const filePath = path.resolve(__dirname, "./" + fileName);
    return fs.existsSync(filePath) ? fs.readFileSync(filePath) : "";
}

module.exports = {buildResponse};