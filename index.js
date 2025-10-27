const express = require('express')
const app = express();
const port= 3000;
const db = require("./models");
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.listen(port, () => {
    console.log('Server started on port 3000');
})

db.sequelize.sync()
    .then((result)=> {
        app.listen(3000, () => {
            console.log('Server Started');
        })
    })
    .catch((err) => {
        console.log(err);
    })

app.post("/komik", async (requestAnimationFrame, res) => {
    const data = req.body;
    try{
        const komik = await db.komik.create(data);
        res.send(komik);
    }catch(err) {
        res.send(err);
    }
});

app.get('/komik', async (req, res) => {
    try {
        const komik = await db.Komik.findAll();
        res.send(komik);
    } catch (err) {
        res.send(err);
    }
});

app.put('/komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try{
        const komik = await db.komik.findByPk(id);
        if (!komik){
            return res.status(400).send({message: 'komik tidak ditemukan'})
        }

        await komik.update(data);
        res.send({ message: 'Komik berhasil diupdate', komik });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/komik/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const komik = await db.komik.findByPk(id);
        if (!komik){
            return res.status(400).send({message: 'komik tidak ditemukan'});
    }
    await komik.destroy();
        res.send({ message: "Komik berhasil dihapus"});
    } catch (err) {
        res.status(500).send(err);
    }
});