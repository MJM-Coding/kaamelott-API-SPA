// Importe le modèle Character depuis les modèles
import Character from '../models/character.js';
// Importe le module 'path' pour manipuler les chemins de fichiers
import path from 'path';

//! Fonction pour récupérer tous les personnages
export const getPersonnages = async (req, res) => {
  try {
    // Définit l'URL de base à partir des variables d'environnement ou d'une valeur par défaut
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    
    // Récupère tous les personnages depuis la table 'characters'
    const characters = await Character.findAll();

    // Génère les URLs complètes des photos pour chaque personnage
    const charactersWithFullPhotoPath = characters.map(character => {
      // Utilise path.basename pour extraire uniquement le nom de fichier
      // Par exemple, si character.photo est 'images/characters/leodagan.webp', 
      // cela retourne 'leodagan.webp'.
      const photoFileName = path.basename(character.photo);

      return {
        ...character.dataValues, // Récupère les données de chaque personnage
        // Construit l'URL complète de la photo en utilisant le nom de fichier
        photo: `${baseUrl}/images/characters/${photoFileName}`
      };
    });

    // Renvoie les personnages au format JSON avec les chemins complets des photos
    res.json(charactersWithFullPhotoPath);
  } catch (error) {
    // En cas d'erreur, log l'erreur et renvoie un message d'erreur générique
    console.error('Erreur lors du chargement des personnages:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};