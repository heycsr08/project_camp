import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//default config for app

app.use(express.json({ limit: "16kb" }));  //this is for accepting json input from browser can be sended from postman 

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // this is for accepting urlencoded data

app.use(express.static("public")) // for using file present in public 

app.use(cookieParser());


//this is cors config
//basically cors is what we have in backend which tell us what/who can alllowed to use this ie what url i will let communicate with this backend


app.use(
    cors({
        origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
        credentials: true,
        methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }),
);

app.get('/', (req, res) => {
    res.send('welcome bro!')
})

app.get('/dude', (req, res) => {
    res.send('hey dude !')
})


// for route

import healthCheckRouter from "./routes/healthcheck.routes.js"

app.use("/api/v1/healthcheck", healthCheckRouter);

import authrouter from "./routes/auth.route.js"

app.use("/api/v1/auth", authrouter);


export default app