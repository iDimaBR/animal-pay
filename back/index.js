require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require("./config/database");
const cors = require("cors");
const userRoutes = require("./routes/users");
const petRoutes = require("./routes/pets");
const paymentRoutes = require("./routes/payments");

database.sync().then(() => {
    console.log("Banco de dados sincronizado");
}).catch((error) => {
    console.log(error);
    throw new Error("Erro ao sincronizar banco de dados: ", error);
});

app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.use("/pet", petRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});