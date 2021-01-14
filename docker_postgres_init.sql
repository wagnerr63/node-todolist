CREATE DATABASE todolist;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS todos (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  status CHAR,
  user_id UUID,
  FOREIGN KEY(user_id) REFERENCES users(id)
);
