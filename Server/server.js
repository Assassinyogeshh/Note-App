import express from "express";
import cors from "cors";
import ConnectMongo from "./DB/ConnectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import notesRoutes from "./Routes/notesRoute.js";

const app = express();


const corsOptions = {
    origin: "http://localhost:3001",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

ConnectMongo();

app.use("/Auth", authRoutes);
app.use("/Notes", notesRoutes);


app.use('/', (req, res) => {
    console.log("Connected to the Server");
    res.status(200).send("I am Successfully connected to the Server");
})

const Port = process.env.PORT || 3000;

app.listen(Port, async (req, res) => {
    try {
        console.log("Connected to the server");
    } catch (error) {
        console.log("Server Error:", error);
    }
})