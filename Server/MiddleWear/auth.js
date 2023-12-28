import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const auth = async (req, res, next) => {

  try {

    if (!req.headers.authorization) {
      console.log("Middleware Error: No authorization header");
      return res.status(404).json("UnAuthorization");
    }

    const token = await req.headers.authorization.split(" ")[1];



    const decode = jwt.verify(token, process.env.SECRET_KEY, { algorithms: "HS256" });
    console.log("I am The TOken", decode);


    const timeTamp = Math.floor(Date.now() / 1000);

    if (decode.exp && decode.exp < timeTamp) {
      return res.status(401).json("Token Has Expired");
    }

    req.userId = decode?.id;

    next();


  } catch (error) {

    console.log("token error", error);
    return res.status(401).json("UnAuthorized");
  }
}

export default auth;