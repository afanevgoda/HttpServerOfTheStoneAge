const fs = require("fs");
const path = require("path");

function getMainPage()
{
    const filePath = path.resolve(__dirname, "../views/index.html");
    
    return fs.readFileSync(filePath);
}

module.exports = {GET: getMainPage}