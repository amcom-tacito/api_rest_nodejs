require('dotenv').config();
const mongoose = require('mongoose');

export default class ConfigDB{

    constructor(app :any){
        mongoose.connect('mongodb+srv://'+ process.env.DB_USER + ':' + encodeURIComponent(process.env.DB_PASSWORD || "") + '@apicluster.c3zjm.mongodb.net/'+ process.env.DB_NAME || "" +'_db?retryWrites=true&w=majority')
        .then(() => {
            console.log('Conectado ao MongoDB');
            app.listen(3000); //configurado no nodemon
        })
        .catch((err :any) => {
            console.log(err);
        });
    }

}