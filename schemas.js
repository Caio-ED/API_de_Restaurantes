const mongoose = require('mongoose');
                    // criando um schema

const restaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    borough: String,
    image: String,
});

                    // criando um model apartir do schema
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

                    // Exportando o schema Para onde vamos manipular a coleção
module.exports.Restaurant = Restaurant;