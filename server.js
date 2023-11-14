const express = require("express");
const dotenv = require('dotenv');
const homeController = require('./controllers/homeController')
const postsRouter = require('./routers/postsRouter')

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;

const app = express();

app.use(express.static("public"));

app.get("/", homeController.index);
app.use("/posts", postsRouter);

app.listen(port || 3000, () => {
    console.log(`Server running on http://${host}:${port}`)
})