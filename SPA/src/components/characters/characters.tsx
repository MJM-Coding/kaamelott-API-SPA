import React, { useState, useEffect } from "react";
import { fetchCharacters, TCharacter } from '../../api'; // Assurez-vous que le chemin d'importation est correct
import "./characters.scss";

const Characters: React.FC = () => {
    // ! État pour stocker les personnages, l'état de chargement et les erreurs
    const [characters, setCharacters] = useState<TCharacter[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // !Effet pour charger les personnages au montage du composant
    useEffect(() => {
        const loadCharacters = async () => {
            try {
                setIsLoading(true);
                const data = await fetchCharacters();
                console.log("Données récupérées:", data); // Vérification des données
                setCharacters(data);
            } catch (err) {
                setError('Erreur lors du chargement des personnages');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadCharacters();
    }, []);

    // !Fonction pour rendre un élément de personnage
    const renderCharacter = (character: TCharacter) => (
        <li key={character.id} className="character-item">
            <h2>{character.name}</h2>
            {character.photo && (
                <img 
                    src={character.photo}  // L'URL complète est envoyée par le backend
                    alt={character.name} 
                    className="character-photo" 
                />
            )}
            {character.role && <p><strong>Rôle:</strong> {character.role}</p>}
            {character.actor_name && <p><strong>Acteur:</strong> {character.actor_name}</p>}
            {character.appearance_season_episode && <p><strong>Première apparition:</strong> {character.appearance_season_episode}</p>}
            {character.description && <p><strong>Description:</strong> {character.description}</p>}
        </li>
    );

    // !Rendu du composant Characters
    return (
        <main className="characters">
            <h1>Page des personnages</h1>
            {isLoading && <p className="loading">Chargement...</p>}
            {error && <p className="error">{error}</p>}
            {!isLoading && !error && (
                characters.length > 0 ? (
                    <ul className="character-list">
                        {characters.map(renderCharacter)}
                    </ul>
                ) : (
                    <p>Aucun personnage trouvé.</p>
                )
            )}
        </main>
    );
};

export default Characters;
