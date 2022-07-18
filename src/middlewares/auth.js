import { verify } from "jsonwebtoken";

export default async (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ error: "User not authorized!" });
    }

    // Formato do token -> Bearer dswfhsuadhusahdusahudshudsahudash;
    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, "dc39beb23b3edeaad7bc6d7d95586d4d");
    
        console.log(decoded);

        return next();

    }catch (err) {
        return response.status(401).json({ error: "Invalid Jwt Token!" });
    }
}