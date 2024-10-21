import express from 'express';   // Import d'Express
import cors from 'cors';        // Import de cors
import dotenv from 'dotenv';     // Import de dotenv
import path from 'path';         // Import pour gérer les chemins de fichiers
import { fileURLToPath } from 'url';  // Import de fileURLToPath pour gérer __dirname en ESM
import mainRouter from './router/mainRouter.js';  // Ton routeur principal

dotenv.config(); // Charge les variables d'environnement depuis .env

// Gestion de __dirname dans les modules ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({origin:process.env.CORS}));  // Activer CORS pour toutes les requêtes

// Définir le moteur de vue (EJS)
app.set('view engine', 'ejs');

// Définir le dossier des vues
app.set('views', path.join(__dirname, 'views'));  // Assure-toi que le dossier 'views' existe

// Middleware pour servir des fichiers statiques (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public'))); // Si tu as un dossier public pour le CSS, images, etc.

// Utilisation du routeur principal
app.use('/api', (req, res, next) => {
    console.log(`Requête reçue: ${req.method} ${req.url}`);
    next();
  }, mainRouter);

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
    console.log(`🚀 Serveur API démarré sur le port : ${PORT}`);
});
