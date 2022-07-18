import express, {Router} from "express";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import auth from "./middlewares/auth";

const routes = new Router();

routes.post("/users", UserController.create);
routes.post("/session", SessionController.create);

// Daqui pra baixo, tudo que tá autenticado - E daqui pra cima,tudo o que não ta autenticado (LOGADO)

// MIDDLEWARES
routes.use(auth);

routes.get("/users", UserController.index);

export default routes;