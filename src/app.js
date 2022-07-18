import express from "express"; 
import mongoose, {mongo} from 'mongoose';
import routes from "./routes";

class App {

    constructor () {
        this.server = express();

        this.database();

        this.middleware();

        this.routes();
    }

    middleware () {
        this.server.use(express.json()); //Dizer para o express trabalhar com json
    }

    database () {
        mongoose.connect("mongodb+srv://root:95991374293@cluster0.4erz4.mongodb.net/?retryWrites=true&w=majority");
    }

    routes () {
        this.server.use(routes);
    }

    // app.get("/xadrez", (req, res) => {
    //     return res.send("Hello World! - Esta é uma mensagem de resposta do servidor!");
    // });
    
}

export default new App().server;