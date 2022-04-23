const express = require("express");
const path = require("path");
const config = require("config");
const cors = require("cors");
const mongoose = require("mongoose");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const initDatabase = require('./startUp/initDatabase')

const app = express();
const PORT = config.get("PORT") || 5000;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: config.get("CLIENT_URL"),
    })
);

app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")));
    const indexPath = path.join(__dirname, "client", "index.html");
    app.get("*", (req, res) => {
        res.sendFile(indexPath);
    });
} else console.log(chalk.white.inverse("development"));

async function start() {
    try {
        mongoose.connection.once('open', () => {
            initDatabase()
        })
        await mongoose.connect(config.get('DB_URI'))
        app.listen(PORT, () => console.log(chalk.green(`server has been started on port ${PORT}`)))
    }
    catch(e)
{
    console.log(chalk.red(e.message))
    process.exit(1)
}
} 

start()