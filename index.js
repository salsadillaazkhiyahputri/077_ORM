const express = require('express')
const app = express();
const port= 3000;
const db = require("./models");
app.use(express.json());
app.use(espress.urlencoded({
    extended: false
}));

app.listen(port, () => {
    console.log('Server started on port 3000');
})

