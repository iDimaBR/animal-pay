const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require("../middlewares/authMiddleware");
const Pet = require("../models/Pet");

router.post('/add', authenticateToken, async (req, res) => {
    try {

      const user_id = req.id;

      const { 
        name,
        description,
        age,
        photo
      } = req.body;

      if(!name || !description || !age || !photo){
        return res.status(400).json({ success: false, message: 'Preencha todos os campos.' });
      }

      if(name.length < 3){
        return res.status(400).json({ success: false, message: 'Utilize um nome maior que 3 characteres.' });
      }

      if(description.length < 50){
        return res.status(400).json({ success: false, message: 'Utilize uma descrição maior que 50 characteres.' });
      }

      if(age < 0){
        return res.status(400).json({ success: false, message: 'Utilize uma idade maior que 0.' });
      }
      
      const existing = await Pet.findOne({ where: { name, user_id } });
      if (existing) {
        return res.status(400).json({ sucess: false, message: 'Esse pet já está cadastrado.' });
      }

      const created = await Pet.create({
        name,
        description,
        age,
        photo,
        user_id
      });

      return res.status(201).json({success: true, message: 'Pet cadastrado com sucesso!', data: created});
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

router.get("/list", authenticateToken, async (req, res) => {
    const id = req.id;

    const pet = await Pet.findAll({ where: { user_id: id }});
    if (!pet) {
        return res.status(404).json({ success: false, message: 'Nenhum pet encontrado.' });
    }

    return res.json({ success: true, data: pet });
});

router.put("/:id", authenticateToken, (req, res) => {
    User.update(req.body, { where: { id: req.params.id } }).then((result) => {
      return res.json({success: result ? true : false});
    }).catch((error) => {
      return res.json({success: false, message: error});
    });
});

router.delete("/:id", authenticateToken, (req, res) => {
    User.destroy({where: { id: req.params.id }}).then((result) => {
      return res.json({success: result ? true : false});
    }).catch((error) => {
      return res.json({success: false, message: error});
    });
});

module.exports = router;