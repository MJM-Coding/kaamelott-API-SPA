import React from 'react';
import './homePage.scss'; // N'oublie pas de gérer le style

import photoPresentation from '../../assets/images/homePage/presentation.webp';
import photoPresentationleodagan from '../../assets/images/homePage/leodagan.webp';

const HomePage: React.FC = () => {
  return (
    <>
     
      {/* Main section */}
      <main className="main">
        <div className="main_top_section">
          {/* Left Section */}
          <section className="main_left">
            <div className="left_presentation">
              <h1>Synopsis</h1>
              <p>
                Kaamelott est une série télévisée française créée par Alexandre Astier, qui revisite avec humour et intelligence la légende arthurienne. La série raconte les aventures du roi Arthur Pendragon et de ses chevaliers de la Table Ronde dans leur quête du Saint Graal. Contrairement aux récits héroïques traditionnels, Kaamelott dépeint des personnages décalés, souvent maladroits, avec des situations comiques qui mettent en lumière les faiblesses humaines.
              </p>
              <p>
                Le ton oscille entre la comédie et le drame, et l’univers médiéval y est abordé avec une touche moderne et décalée. La série se distingue par des dialogues percutants et un humour subtil, où les conflits personnels et les relations entre les personnages sont au cœur de l'intrigue. Au fil des saisons, Kaamelott prend une dimension plus sombre, offrant des arcs narratifs profonds et une richesse psychologique rare pour une série de ce genre.
              </p>

              {/* About section */}
              <section className="info">
                <h2>À propos de Kaamelott</h2>
                <p>Nombre de saisons : 6</p>
                <p>Créateur : Alexandre Astier</p>
                <p>Diffusion : 2005 - 2009</p>
                <p>Genre : Comédie, Fantasy</p>
              </section>
            </div>
          </section>

          {/* Right Section */}
          <section className="main_right">
            <div className="image-container">
              {/* Main Image */}
              <img
                className="main-image"
                src={photoPresentation}
                alt="Casting de la série"
              />
              {/* Hover Image */}
              <img
                className="hover-image"
                src={photoPresentationleodagan}
                alt="Léodagan, j'ai appris à lire je ne souhaite ça à personne"
              />
            </div>
          </section>
        </div>
      </main>

      {/* Footer component - à inclure */}
    </>
  );
};

export default HomePage;
