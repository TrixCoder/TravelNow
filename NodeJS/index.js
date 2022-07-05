// Imported packages
let mongodb = require("mongodb");
let ObjectID = mongodb.ObjectID;
let crypto = require("crypto");
let express = require("express");
let bodyParser = require("body-parser");

var generateRandomString = function(length){
    return crypto.randomBytes(Math.cell(length/2)).toString('hex').slice(0,length);
}

var sha512 = function(password,salt){
    let hash = crypto.createHmac('sha512',salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userPassword){
    // Create random string with 16 characters
    let salt = generateRandomString(16);
    let passwordData = sha512(userPassword, salt);
    return passwordData;
}

function checkHashPassword(userPassword,salt){
    let passwordData = sha512(userPassword,salt);
    return passwordData;
}

// Create express services

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded((extended: true)));

