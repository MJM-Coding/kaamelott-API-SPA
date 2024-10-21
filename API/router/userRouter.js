import express from 'express';
import { scrypt, randomBytes } from 'crypto';
import User from '../models/users.js'; // Importer le modèle user  from '../models/users.js';
const router = express.Router();

// Fonction pour hacher un mot de passe avec scrypt
const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        randomBytes(16, (err, salt) => {
            if (err) reject(err);
            scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                // Concaténer le sel et le hachage pour le stockage
                resolve(salt.toString('hex') + ':' + derivedKey.toString('hex'));
            });
        });
    });
};

// Fonction pour vérifier un mot de passe
const verifyPassword = (password, storedHash) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = storedHash.split(':');
        scrypt(password, Buffer.from(salt, 'hex'), 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex') === key);
        });
    });
};

// Route pour l'inscription d'un nouvel utilisateur
router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body; // Inclure le rôle

    try {
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant.' });
        }

        // Validation du rôle
        if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({ message: 'Rôle invalide. Utilisez "admin" ou "user".' });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ username, password: hashedPassword, role }); // Enregistrer le rôle

        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

// Route pour la connexion d'un utilisateur
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
        }

        // Si la connexion est réussie, vous pouvez renvoyer les informations de l'utilisateur, y compris le rôle
        res.status(200).json({ message: 'Connexion réussie', user: { username: user.username, role: user.role } });
    } catch (error) {
        console.error('Erreur lors de la connexion de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
});

export default router;