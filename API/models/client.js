import dotenv from 'dotenv';  // Charger les variables d'environnement
import { Sequelize } from 'sequelize';  // Importer Sequelize

dotenv.config();  // Charger les variables d'environnement du fichier .env

// Créer une nouvelle instance de Sequelize pour se connecter à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME,  
  process.env.DB_USER,  
  process.env.DB_PASSWORD,  
  {
    host: process.env.DB_HOST,  
    dialect: 'postgres',  
    port: process.env.DB_PORT,  
    logging: false,
  }
);

// Fonction pour se connecter à la base de données
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();  // Authentifier la connexion à la base de données
    console.log(`🚀 Connexion à la base de données ${process.env.DB_NAME} réussie !`);
  } catch (error) {
    console.error(`❌ Impossible de se connecter à la base de données ${process.env.DB_NAME} : ${error.message}`);
  }
};


// Lancer la connexion
connectToDatabase();

export default sequelize;