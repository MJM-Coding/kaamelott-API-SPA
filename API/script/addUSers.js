import pkg from 'scrypt-js'; // Importe le module par défaut
const { scrypt } = pkg; // Extraire la fonction scrypt
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from '../models/users.js'; 
import { randomBytes } from 'crypto'; // Importe randomBytes de crypto

// !Charger les variables d'environnement
dotenv.config(); 

// !Vérifie que les variables sont bien chargées
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

// !Crée une instance de client PostgreSQL
const client = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
});

// !Fonction pour générer un salt aléatoire
const generateSalt = (length = 16) => {
    return randomBytes(length).toString('hex'); // Générer un sel aléatoire
};

// !Fonction pour insérer des utilisateurs
const insertUsers = async () => {
    try {
        // Se connecter à la base de données
        await client.authenticate();
        console.log('Connexion à la base de données réussie !');

        // Définir les mots de passe
        const adminPassword = 'Menzo0607?';
        const userPassword = 'Menzo0607?';

        // Paramètres pour scrypt
        const N = 16384; // Doit être une puissance de 2, par exemple 2^14
        const r = 8;     // Doit être un entier positif
        const p = 1;     // Doit être un entier positif

        // Générer un sel pour chaque mot de passe
        const adminSalt = generateSalt();
        const userSalt = generateSalt();

        // Hashe les mots de passe (convertir en Buffer avant)
        const hashedAdminPassword = await scrypt(Buffer.from(adminPassword), Buffer.from(adminSalt), N, r, p, 32);
        const hashedUserPassword = await scrypt(Buffer.from(userPassword), Buffer.from(userSalt), N, r, p, 32);

        // Synchronise le modèle avec la base de données
        await client.sync();

        // Insére l'admin
        await User.create({
            username: 'admin',
            email: 'j.mos@live.fr',
            password: hashedAdminPassword.toString('hex'), // Convertir le Buffer en chaîne hexadécimale
            role: 'admin',
            salt: adminSalt // Optionnel : stocker le sel dans la base de données
        });

        // Insére un utilisateur
        await User.create({
            username: 'user',
            email: 'user@live.fr',
            password: hashedUserPassword.toString('hex'), // Convertir le Buffer en chaîne hexadécimale
            role: 'user',
            salt: userSalt // Optionnel : stocker le sel dans la base de données
        });

        console.log('Admin et user ajoutés avec succès !');
    } catch (err) {
        console.error(`Erreur lors de l'insertion des utilisateurs:`, err);
    } finally {
        // Déconnexion de la base de données
        await client.close();
    }
};


insertUsers();
