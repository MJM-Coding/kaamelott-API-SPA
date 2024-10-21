import express from 'express';        // Importation d'Express
import characterRouter from './characterRouter.js';  // Importer le routeur des personnages
import userRouter from './userRouter.js';  // Importer le routeur des utilisateurs

const router = express.Router();


// !utilisation du routeur secondaire characterRouter
router.use('/Les-personnages', characterRouter); // routeur secondaire characterRouter

//! utilisation du routeur secondaire userRouter
router.use ('/login', userRouter); // routeur secondaire userRouter

export default router;