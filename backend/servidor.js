import express from 'express';
import path from 'path';
import cors from 'cors';
import {rotear} from "./Rotas/rotas-refatoradas.mjs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const corsoptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsoptions));

app.use(express.json());

app.use('/imagens', express.static(path.join(__dirname, 'public/imagens')));

app.use("/api", rotear);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});