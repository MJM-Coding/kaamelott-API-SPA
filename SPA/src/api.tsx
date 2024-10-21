// !Service d'API pour la gestion des personnages
import axios, { AxiosResponse } from "axios";



// !Définit l'URL de base de l'API. Assurez-vous que cette URL est correcte pour votre backend
const API_URL = "http://localhost:3000/api";

// !Définit le type TCharacter qui représente la structure d'un personnage
export type TCharacter = {
	id: number; // ID du personnage (obligatoire)
	name: string; // Nom du personnage (obligatoire)
	role?: string; // Rôle du personnage (optionnel)
	actor_name?: string; // Nom de l'acteur (optionnel)
	photo?: string; // URL de la photo (optionnel)
	appearance_season_episode?: string; // Apparition dans la série (optionnel)
	description?: string; // Description du personnage (optionnel)
};

// !Crée une instance Axios configurée avec l'URL de base de l'API
const api = axios.create({
	baseURL: API_URL,
});

// !Fonction asynchrone pour récupérer tous les personnages
export const fetchCharacters = async (): Promise<TCharacter[]> => {
	try {
		// Effectue une requête GET à l'endpoint '/Les-personnages'
		const response: AxiosResponse<TCharacter[]> =
			await api.get("/Les-personnages");

		//* Trie les personnages par ordre de saison d'apparition
		const sortedCharacters = response.data.sort((a, b) => {
			// Vérifie si appearance_season_episode est défini avant d'appeler slice
			// Si 'appearance_season_episode' est défini, utilise 'slice(1, 3)' pour extraire les caractères de la saison (SXX),
			// puis convertit cette chaîne en nombre entier avec 'Number.parseInt'.
			// Si 'appearance_season_episode' n'est pas défini, attribue 'Number.POSITIVE_INFINITY' pour garantir que
			// les personnages sans saison apparaissent en dernier lors du tri.
			const seasonA = a.appearance_season_episode
				? Number.parseInt(a.appearance_season_episode.slice(1, 3))
				: Number.POSITIVE_INFINITY;
			const seasonB = b.appearance_season_episode
				? Number.parseInt(b.appearance_season_episode.slice(1, 3))
				: Number.POSITIVE_INFINITY;

			return seasonA - seasonB; // Retourne la différence entre les saisons
		});

		// Retourne les données triées
		return sortedCharacters;
	} catch (error) {
		// Gestion des erreurs
		if (axios.isAxiosError(error)) {
			console.error(
				"Erreur lors de la récupération des personnages:",
				error.response?.data || error.message,
			);
		} else {
			console.error("Une erreur inattendue s'est produite:", error);
		}
		throw error;
	}
};

// !Fonction asynchrone pour récupérer un personnage spécifique par son ID
export const fetchCharacterById = async (id: number): Promise<TCharacter> => {
	try {
		// Effectue une requête GET à l'endpoint '/Les-personnages/{id}'
		const response: AxiosResponse<TCharacter> = await api.get(
			`/Les-personnages/${id}`,
		);

		// Retourne les données de la réponse (le personnage spécifique)
		return response.data;
	} catch (error) {
		// Gestion des erreurs similaire à fetchCharacters
		if (axios.isAxiosError(error)) {
			console.error(
				`Erreur lors de la récupération du personnage avec l'ID ${id}:`,
				error.response?.data || error.message,
			);
		} else {
			console.error("Une erreur inattendue s'est produite:", error);
		}
		throw error;
	}
};

// Vous pouvez ajouter d'autres fonctions ici pour d'autres opérations CRUD si nécessaire
