import React from "react";

// Importation des composants FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import "./footer.scss";

const Footer: React.FC = () => {
    return (
      <footer className="social-media">
        <h2>Suivez la série sur les réseaux sociaux</h2>
        <a
          className="social-link facebook"
          href="https://www.facebook.com/KaamelottOff"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} /> Facebook
        </a>
        <a
          className="social-link twitter"
          href="https://twitter.com/Kaamelott"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} /> Twitter
        </a>
        <a
          className="social-link instagram"
          href="https://www.instagram.com/Kaamelott"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} /> Instagram
        </a>
      </footer>
    );
  };
  export default Footer;