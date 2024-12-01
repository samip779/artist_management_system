/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.sql(`

        CREATE TYPE genre AS ENUM (
            'rnb',
            'country',
            'classic',
            'rock',
            'jazz'
        );

        CREATE TABLE songs(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            album_name VARCHAR(255),
            genre genre,
            artist_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_artist
                FOREIGN KEY(artist_id)
                REFERENCES  artists(id)


        );

        CREATE TRIGGER set_timestamp_songs
        BEFORE UPDATE ON artists
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
        
        `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql('DROP TABLE songs;');
};
