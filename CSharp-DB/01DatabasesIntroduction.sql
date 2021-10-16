CREATE DATABASE [Minions]

USE Minions

CREATE TABLE Minions(
[Id] INT PRIMARY KEY NOT NULL,
[Name] VARCHAR(50),
[Age]INT
)

CREATE TABLE Towns(
[Id] INT PRIMARY KEY NOT NULL,
[Name] VARCHAR(50)
)

ALTER TABLE Minions
ADD TownId INT;

ALTER TABLE Minions
ADD FOREIGN KEY ([TownId]) REFERENCES Towns(Id);