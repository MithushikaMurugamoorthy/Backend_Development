
const express = require('express');
const PORT = 5000;
const app = express();
app.use(express.json());

const genl_routes = require('./routes/general.js').general;
app.use("/", genl_routes);

//const auth_users=require('./routes/auth_users.js').auth;
//app.use("/",auth_users);

app.listen(PORT, () => console.log("Server is running on port", PORT));