const db = require('./DBconnection');
const {Restaurant} = require('./schemas');

function rotas (app){

                                //Pegar Todos os Restaurantes
        app.get('/restaurants', async (request, response) => {
            const limit = parseInt(request.query.limit);
            const page = parseInt(request.query.page);
            const skip = (page - 1) * limit;
            const restaurants = await Restaurant.find({}, {name: true, cuisine: true, borough:true}).limit(limit).skip(skip)
            const total = await Restaurant.count()
            const resp = {
                restaurants,
            }
            if( Math.ceil(total/limit) > page){
                resp.nextpage = `http://localhost:3000/restaurants?limit=${limit}&page=${(page + 1)}`
            }
            response.status(200).json(resp);
        });
        
                                //Pegar um Restaurante pelo ID
        app.get('/restaurant/:id', async (request, response) => {
            const _id = request.params.id;
            const restaurants = await Restaurant.find({_id: _id}, {name: true, cuisine:true, borough: true})
            response.status(200).json(restaurants)
        });
        
                                //Filtrar Restaurantes
        app.get('/restaurants/search', async (request, response) => {
            const campos = {...request.query};
            const restaurants = await Restaurant.find(campos, {name: true, cuisine:true, borough: true})
            response.status(200).json({restaurants})
        })
                                //Cadastrar um Restaurante
        app.post('/restaurant', (request, response) => {
            const {name, cuisine, bairro} = request.body;
            const restaurant = new Restaurant({name: name, cuisine: cuisine, borough: bairro})
            restaurant.save()
                .then((res) => {
                    console.log(res);
                    response.status(200).json({message: 'Restaurante Cadastrado! '})
                })
        });
                                //Atualiza um Restaurante
        app.put('/restaurant/:id', async (request, response) => {
            const id = request.params.id;
            const {name, cuisine, borough} = request.body; 
            await Restaurant.updateOne({_id: id},{name: name, cuisine: cuisine,borough: borough});
            response.status(200).json({message:'Restaurante Atualizado!'})
        });
                                //Deleta um Restaurante
        app.delete('/restaurant/:id', async (request, response) => {
            const id = request.params.id;
            await Restaurant.deleteOne({_id: id})
                .then((result) => {
                    if(result.deletedCount > 0) {
                        response.status(200).json({message: 'Restaurante excluido!'})
                    } else {
                        response.status(404).json({message: 'Restaurante não Existe'})
                    }
                })
        })
}

module.exports = rotas;
