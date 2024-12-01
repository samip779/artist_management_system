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

        CREATE TABLE artists(
            id SERIAL PRIMARY KEY,  
            name VARCHAR(255) NOT NULL,
            dob TIMESTAMP,
            gender gender,
            address VARCHAR(255),
            first_release_year SMALLINT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TRIGGER set_timestamp_artists
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
  pgm.sql('DROP TABLE artists;');
};
