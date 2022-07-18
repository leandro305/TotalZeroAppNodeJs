import User from "../schemas/User";

import { hash } from "bcryptjs";

class UserController {
    async create (request, response) {
        const {name, email, username, password, phone} = request.body;

        const encryPassword = await hash(password, 8);

        const user = await User.create({
            name,
            email,
            username,
            password : encryPassword,
            phone
        });

        return response.json(user); // Caso eu não der o return response.send ele dar este error --> Error: Server returned nothing (no headers, no data)
    }

    async index (request, response) {
        const users = await User.find();

        if (!users) {
            return response.status(404).json({ error: "Nenhum usuário cadastrado!" });
        }

        return response.json(users);
    }
}

export default new UserController();
