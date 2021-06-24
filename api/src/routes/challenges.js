import {join} from 'path';
import {Low, JSONFile} from 'lowdb';
const express = require("express");
const router = express.Router();

const file = join("../models", 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

// No sé cómo se llama la db que quiero llamar
// No sé en dónde veo la DB

// Como se llama la db usuarios

router.get("/getAll", async (req, res) => {
    // Verificar que el usuario esté loggeado
    const challenges = Challengesdb.get('challenges');   
});

router.post("/takeChallenge", async (req, res) => {
    // Verificar que el usuario esté loggeado
    // Traer id usuario
    // Traer id reto
    // Asignar id reto al usuario
    // Asignar status reto = 0 ( en curso)
});

// US4 
router.put("/achieveChallenge", async (req, res) => {
    // Verificar que el usuario esté loggeado
    // Traer id usuario
    // Traer id reto seleccionado
    // Asignar status reto = 1

});

router.get("/getAchieved", async (req, res) => {
    // Verificar que el usuario esté loggeado
    // Traer id usuario
    // Traer retos where id = 1
})

module.exports = router;