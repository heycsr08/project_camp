console.log('start of project');

import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});

let myusername = process.env.username;
console.log(myusername);

