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

app.post("/Komik", async (req, res) => {
    const data = req.body;
    try{
        const Komik = await db.Komik.create(data);
        res.send(Komik);
    }catch(err) {
        res.send(err);
    }
});

app.get('/Komik', async (req, res) => {
    try {
        const Komik = await db.Komik.findAll();
        res.send(Komik);
    } catch (err) {
        res.send(err);
    }
});

app.put('/Komik/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;

    try{
        const Komik = await db.Komik.findByPk(id);
        if (!Komik){
            return res.status(400).send({message: 'komik tidak ditemukan'})
        }

        await Komik.update(data);
        res.send({ message: 'Komik berhasil diupdate', Komik });
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/Komik/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const Komik = await db.Komik.findByPk(id);
        if (!Komik){
            return res.status(400).send({message: 'komik tidak ditemukan'});
    }
    await Komik.destroy();
        res.send({ message: "Komik berhasil dihapus"});
    } catch (err) {
        res.status(500).send(err);
    }
});