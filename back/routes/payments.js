const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticateToken = require("../middlewares/authMiddleware");
const Pet = require("../models/Pet");
const PaymentData = require("../models/Payment");
const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const { uuid } = require("uuidv4");

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});

const payment_client = new Payment(client);

router.post('/create', authenticateToken, async (req, res) => {
    try {
      const user_id = req.id;

      const { 
        pet_id,
        amount
      } = req.body;

      if(!pet_id || !amount){
        return res.status(400).json({ success: false, message: 'Preencha todos os campos.' });
      }

      if(amount < 0){
        return res.status(400).json({ success: false, message: 'Utilize um valor maior que 0.' });
      }

      const pet = await Pet.findOne({ where: { id: pet_id } });
      if (!pet) {
        return res.status(404).json({ success: false, message: 'Pet não encontrado.' });
      }

      const ref_id = uuid();

      const preference = new Preference(client);
      const payment = await preference.create({
        body: {
          external_reference: ref_id,
          notification_url: "https://11ed-2804-14c-c4-adec-a97f-c1c9-b277-8271.ngrok-free.app/payment/hook_receive",
          items: [{
            title: "Apadrinhamento do(a) Pet '" + pet.name + "'",
            unit_price: amount,
            quantity: 1,
          }]},
      });

      if(!payment){
        return res.status(500).json({ success: false, message: 'Erro ao criar pedido.' });
      }

      const payment_id = payment.id;
      const payment_init_point = payment.init_point;
      const payment_sandbox_init_point = payment.sandbox_init_point;

      const created = await PaymentData.create({
        user_id,
        pet_id,
        amount,
        status: "pending",
        payment_id,
        ref_id
      });

      return res.status(201).json({success: true, message: 'Pedido registrado.', data: created, payment_url: payment_init_point, payment_sandbox_url: payment_sandbox_init_point});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });

router.get("/list", authenticateToken, async (req, res) => {
    const id = req.id;

    const payments = await PaymentData.findAll({ where: { user_id: id }});
    if (!payments) {
        return res.status(404).json({ success: false, message: 'Nenhum pagamento encontrado.' });
    }

    return res.json({ success: true, data: payments });
});

router.post("/hook_receive", async (req, res) => {
  try {
    const id = req.body.data?.id;
    if(!id){
      return res.json({success: false, message: "ID não encontrado."});
    }

    const payment_info = await payment_client.get({id});
    const ref_id = payment_info.external_reference;
    const status = payment_info.status;

    const updated = await PaymentData.update({ status }, { where: { ref_id } });
    if(!updated){
      return res.json({success: false, message: "Erro ao atualizar pagamento."});
    }

    return res.json({success: true, message: "Pagamento atualizado."});
  } catch (error) {
    console.log(error);
    return res.json({success: false, message: error.message});
  }

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