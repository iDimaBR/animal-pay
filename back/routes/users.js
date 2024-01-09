const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/User");
const authenticateToken = require("../middlewares/authMiddleware");
const Pet = require("../models/Pet");

router.post('/auth', async (req, res) => {

    const cpf = req.body.cpf.trim().replace(/[^0-9]/g, '');
    const password = req.body.password;
  
    try {
      const user = await User.findOne({ where: { cpf } });
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, type: 0 }, process.env.SECRET_JWT_TOKEN, { expiresIn: '24h' });
        return res.json({ success: true, token, data: user });
      }

      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Erro ao autenticar usuário: ' + error.message });
    }
});

router.post('/create', async (req, res) => {
    try {
  
      var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

      const { 
        name, 
        birth_date,
        email,
        phone_number,
        password,
        shelter_name
      } = req.body;

      const cpf = req.body.cpf.trim().replace(/[^0-9]/g, '');
      if(cpf.length < 11){
        return res.status(400).json({ sucess: false, message: 'CPF inválido.' });
      }
    
      if(!cpf || !name || !birth_date || !email || !phone_number || !password){
        return res.status(400).json({ success: false, message: 'Preencha todos os campos.' });
      }

      if(name.length < 3){
        return res.status(400).json({ success: false, message: 'Utilize um nome maior que 3 characteres.' });
      }

      if(shelter_name != null && shelter_name.length < 3){
        return res.status(400).json({ success: false, message: 'Utilize um nome de abrigo maior que 3 characteres.' });
      }

      if(email.length < 5 || !emailRegex.test(email) || email.length > 254 || email.split('@')[0].length > 64 || email.split('@')[1].length > 255){
        return res.status(400).json({ success: false, message: 'E-mail inválido!'});
      }

      if(phone_number.length < 10){
        return res.status(400).json({ success: false, message: 'Utilize um número de telefone maior que 10 characteres.' });
      }

      if(password.length < 10){
        return res.status(400).json({ sucess: false, message: 'Utilize uma senha maior que 10 characteres.' });
      }

      const existing = await User.findOne({ where: { cpf } });
      if (existing) {
        return res.status(400).json({ sucess: false, message: 'Esse usuário já está cadastrado.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const created = await User.create({
        cpf,
        password: hashedPassword,
        name,
        birth_date,
        email,
        phone_number,
        shelter_name
      });

      return res.status(201).json({success: true, message: 'Usuário cadastrado com sucesso!', data: created});
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });

router.get("/profile", authenticateToken, async (req, res) => {
    const id = req.id;

    const user = await User.findOne({ id: { id } });
    if (!user) {
        return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    const pets = await Pet.findAll({ where: { user_id: id }});
    const donations = await Payment.findAll({ where: { user_id: id }});

    return res.json({ 
      success: true, data: {
        user, 
        pets,
        donations
      }
    });
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