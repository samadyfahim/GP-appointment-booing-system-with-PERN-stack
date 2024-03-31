CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL
);


INSERT INTO users (username, email, password_hash) VALUES
    ('user1', 'user1@example.com', '$2b$10$gFpN/4cxuZaXG5/jfV1AFuYCyZtQcUFz8rS2G.tqUk2/kLTU7sB8O'), -- Hash of 'password1'
    ('user2', 'user2@example.com', '$2b$10$SAoH7C1YMB3PKVhyFbbIsOeTFeEHsUJ3eqpdd/SqV7o80HZg9KfGu'), -- Hash of 'password2'
    ('user3', 'user3@example.com', '$2b$10$2S3gZG4K7CpRJh0HfZXvbeZibPhXcFExx99tRLNT.n40pXbKex1Bq'), -- Hash of 'password3'
    ('user4', 'user4@example.com', '$2b$10$QqTn8wYz8eKqNqjAZF1YZe4.9pG//i7.dUvYLC44roCu8mLM88hzu'), -- Hash of 'password4'
    ('user5', 'user5@example.com', '$2b$10$w5FJx6k0Br34tE8Fvql3bOqqLvOIl0JvTLd1MqsBN9bPUtHR0hCvu'); -- Hash of 'password5'



INSERT INTO users (id, username, password) VALUES('fahim', 'fahim@gmail.com', 'pass');

--psql -U postgres