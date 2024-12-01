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
            CREATE TYPE gender AS ENUM ('m', 'f', 'o');
            
            CREATE TYPE role AS ENUM(
                'super_admin',
                'artist_manager',
                'artist'
            );

            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                email varchar(255) NOT NULL,
                password varchar(500) NOT NULL,
                phone varchar(20),
                dob TIMESTAMP,
                gender gender,
                address VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        
        `);

  pgm.sql(`

            CREATE OR REPLACE FUNCTION trigger_set_timestamp()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;


            CREATE TRIGGER set_timestamp_users
            BEFORE UPDATE ON users
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
  pgm.sql(`
        
        DROP TABLE users;

        DROP TYPE role;

        `);
};
