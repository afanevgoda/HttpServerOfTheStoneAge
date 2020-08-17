const fs = require("fs");
const path = require("path");

function getControllerList() {
    const filePath = path.resolve(__dirname, "../controllers/");
    let result = fs.readdirSync(filePath);
    
    result.forEach((fileName, index) => {
        result[index] = fileName.split('.')[0];
    })
    
    return result;
}

module.exports = {getControllerList};