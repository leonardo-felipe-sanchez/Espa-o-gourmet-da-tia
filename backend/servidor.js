import express from 'express';
import path from 'path';
import cors from 'cors';
import { rotear } from "./Rotas/rotas-refatoradas.mjs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsoptions = {
  origin: (origin, callback) => {
    // Permite requisições sem origin (ex.: curl/Postman/server-to-server) ou origens permitidas / *.vercel.app
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsoptions));
app.use(express.json());

// Mantém compatibilidade local; em produção na Vercel, prefira assets no frontend ou Storage
if (!process.env.VERCEL) {
  app.use('/imagens', express.static(path.join(__dirname, 'public/imagens')));
}

app.use("/api", rotear);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;