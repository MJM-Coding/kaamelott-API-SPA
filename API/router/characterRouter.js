// back/router/characterRouter.js
import express from 'express';
import { getPersonnages } from '../controllers/characterController.js';  

const router = express.Router();

// !Route pour afficher tous les personnages
router.get('/', getPersonnages);  // Appele la fonction getPersonnages du contrôleur

export default router;