"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose = require('mongoose');
class ConfigDB {
    constructor(app) {
        mongoose.connect('mongodb+srv://' + process.env.DB_USER + ':' + encodeURIComponent(process.env.DB_PASSWORD || "") + '@apicluster.c3zjm.mongodb.net/' + process.env.DB_NAME || "" + '_db?retryWrites=true&w=majority')
            .then(() => {
            console.log('Conectado ao MongoDB');
            app.listen(3000); //configurado no nodemon
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
exports.default = ConfigDB;
