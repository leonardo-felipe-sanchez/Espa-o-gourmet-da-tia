const express = require('express');
const app = express();
const cors = require('cors');
const rotear = require("./Rotas/rota");

const corsoptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

app.use(cors(corsoptions));

app.use(express.json()); 

app.use("/api", rotear);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});