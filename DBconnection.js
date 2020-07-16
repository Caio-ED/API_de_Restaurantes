    // Importando o Mongoose.
const mongoose = require('mongoose');

    // Connectando com o Banco do MongoDB.
mongoose.connect('mongodb://127.0.0.1/test', {useNewUrlParser: true,useUnifiedTopology: true});
    
    // Pegando essa Conexão.
const db = mongoose.connection;

    // Tratando o Sucesso de Conexão.
db.once('open', () => console.log('Banco de Dados Conectado !'));

    //Tratando a Falha na Conexão.    
db.on('error', (error) => console.log('Tivemos um problema com a conexão com o banco!'));

    // Exportando a conexao com o Banco para o Server
module.exports = db;                                                    