-- Drop tables if they exist
DROP TABLE IF EXISTS characters;
DROP TABLE IF EXISTS quote;

-- Create the characters table
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50),
    actor_name VARCHAR(255),
    photo VARCHAR(255),
    appearance_season_episode VARCHAR(10),
    description TEXT
);

-- Create the quote table with foreign key reference to characters
CREATE TABLE quote (
    id SERIAL PRIMARY KEY,
    character_id INTEGER NOT NULL,
    quote TEXT ,
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE
);

--- Create the users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,  -- Enregistrement avec fuseau horaire
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP   -- Enregistrement avec fuseau horaire
);


-- Créer une fonction pour mettre à jour automatiquement la colonne updatedAt lors de la modification d'une ligne
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = CURRENT_TIMESTAMP AT TIME ZONE 'UTC';  -- Mettre à jour la colonne updatedAt avec l'heure actuelle en UTC
  RETURN NEW;  -- Retourner la nouvelle ligne avec la colonne mise à jour
END;
$$ LANGUAGE plpgsql;

-- Créer un trigger pour appeler la fonction avant chaque mise à jour sur la table users
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();