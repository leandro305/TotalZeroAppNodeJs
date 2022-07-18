import {sign} from 'jsonwebtoken';
import User from '../schemas/User';
import {compare} from "bcryptjs";

class SessionController {
    async create (request, response) {
        const { username, password } = request.body;

        //Verificar se o usuário existe no sistema
        const user = await User.findOne({
            username
        });

        if (!user) {
            return response
            .status(404)
            .json({ error: "User not found!" })
        }

        const mathPassword = await compare(password, user.password);

        if (!mathPassword) {
            return response
            .status(404)
            .json({ error: "Incorrect password or username!" })
        }

        const token = sign({}, "dc39beb23b3edeaad7bc6d7d95586d4d", {
            subject: new String(user._id),
            expiresIn: "1d"

        }); //Este md5 quer dizer: "Um token qualquer e aleatório!"

        return response.json({
            token,
            user,
        });
    }
}

export default new SessionController();
