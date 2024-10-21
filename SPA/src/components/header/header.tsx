import React, { useState } from "react"; // Importation de useState
import { Link, useLocation } from "react-router-dom"; // Importation de useLocation et Link
import logoTitle from "../../assets/images/logoHeader/logoTitle.webp";
import "./header.scss";

const Header: React.FC = () => {
	const location = useLocation(); // Récupérer l'URL actuelle

	// État pour gérer les champs d'input pour la connexion
	const [email, setEmail] = useState<string>(""); // État pour l'email
	const [password, setPassword] = useState<string>(""); // État pour le mot de passe

	// Fonction pour gérer la soumission du formulaire
	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault(); // Empêcher le rechargement de la page
		// Ici vous pouvez ajouter la logique de connexion (API, validation, etc.)
		console.log("Email:", email);
		console.log("Mot de passe:", password);
		// Réinitialiser les champs après la soumission si nécessaire
		setEmail(""); 
		setPassword("");
	};

	return (
		<header className="header">
			<div className="header_logoLeft">
					<img className="header_title" src={logoTitle} alt="Titre de la série" />
			</div>

			<nav className="navbar">
				<ul className="nav-links">
					{/* location.pathname : C'est une propriété de l'objet location fournie par le hook useLocation de react-router-dom. 
					Elle contient l'URL actuelle de la page, sans le domaine ni les paramètres de requête (juste le chemin). */}
					{/* Condition pour ne pas afficher le lien "Accueil" sur la page d'accueil */}
					{location.pathname !== "/" && (
						// Si l'utilisateur n'est pas sur la page d'accueil ("/"),
						// alors on affiche le lien vers la page "Accueil" dans la barre de navigation.
						// Si l'utilisateur est déjà sur la page d'accueil, ce lien ne sera pas affiché.
						<li>
							<Link to="/">Accueil</Link>
						</li>
					)}

					{/* Condition pour ne pas afficher le lien "Personnages" sur la page "Personnages" */}
					{location.pathname !== "/personnages" && (
						// Si l'utilisateur n'est pas sur la page "/characters",
						// alors on affiche le lien vers la page "Personnages" dans la barre de navigation.
						// Si l'utilisateur est déjà sur la page "/characters", ce lien ne sera pas affiché.
						<li>
							<Link to="/personnages">Personnages</Link>
						</li>
					)}

					{/* Condition pour ne pas afficher le lien "Livres" sur la page "Livres" */}
					{location.pathname !== "/livres" && (
						// Si l'utilisateur n'est pas sur la page "/livres",
						// alors on affiche le lien vers la page "Livres" dans la barre de navigation.
						// Si l'utilisateur est déjà sur la page "/livres", ce lien ne sera pas affiché.
						<li>
							<Link to="/livres">Livres</Link>
						</li>
					)}

					{/* Condition pour ne pas afficher le lien "Côté films" sur la page "Côté films" */}
					{location.pathname !== "/films" && (
						// Si l'utilisateur n'est pas sur la page "/films",
						// alors on affiche le lien vers la page "Côté films" dans la barre de navigation.
						// Si l'utilisateur est déjà sur la page "/films", ce lien ne sera pas affiché.
						<li>
							<Link to="/films">Côté films</Link>
						</li>
					)}

					
				</ul>
			
			</nav>
				{/* Formulaire de connexion */}
				<form className="login-form" onSubmit={handleSubmit}>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état de l'email
						required // Champ requis
					/>
					<input
						type="password"
						placeholder="Mot de passe"
						value={password}
						onChange={(e) => setPassword(e.target.value)} // Mettre à jour l'état du mot de passe
						required // Champ requis
					/>
					<button type="submit">Connexion</button> {/* Bouton de soumission */}
				{/* Bouton S'inscrire */}
				<Link to="/register" className="register-button">S'inscrire</Link>
			</form>
		</header>
	);
};

export default Header;
