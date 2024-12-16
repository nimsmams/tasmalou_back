-- SQLBook: Code
-- Active: 1729777536480@@127.0.0.1@3308@tamalou
DROP DATABASE tamalou;

CREATE DATABASE tamalou; 

SHOW DATABASES ;

USE tamalou; 

--DROP DATABASE tamalou;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS category_product,

DROP TABLE IF EXISTS productline_product,

DROP TABLE IF EXISTS chemical_structure_product,

DROP TABLE IF EXISTS property_product,

DROP TABLE chemical_structure,

SET FOREIGN_KEY_CHECKS = 1;

DROP TABLE product,

DROP TABLE productline,

DROP TABLE property,

DROP TABLE 'user',

DROP TABLE category,

CREATE TABLE IF NOT EXISTS `user`(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    age DATETIME NOT NULL,
    gender VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    parent_id INT, 
    FOREIGN KEY (parent_id) REFERENCES category (id)
);

CREATE TABLE IF NOT EXISTS `application` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT,
    contraindication TEXT,
    interaction TEXT,
    side_effect TEXT
);

CREATE TABLE IF NOT EXISTS product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(100)NOT NULL,
    latin_name VARCHAR(100) NOT NULL,
    description TEXT,
    plant_section VARCHAR (100) NOT NULL,
    family VARCHAR (100) NOT NULL, 
    `application_id` INT,
    FOREIGN KEY (`application_id`) REFERENCES `application` (id)
);

CREATE TABLE IF NOT EXISTS chemical_structure (
    id INT PRIMARY KEY AUTO_INCREMENT,
    chemical_structure_name VARCHAR(100)NOT NULL,
    description TEXT
);


CREATE TABLE IF NOT EXISTS property (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_name VARCHAR(100)NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS productline (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productline_name VARCHAR(100),
    description TEXT,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES productline (id)
);

CREATE TABLE IF NOT EXISTS category_product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    category_id INT,
    FOREIGN KEY (product_id) REFERENCES product (id),
    FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE IF NOT EXISTS chemical_structure_product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    chemical_structure_id INT,
    product_id INT,
    FOREIGN KEY (chemical_structure_id) REFERENCES chemical_structure (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE IF NOT EXISTS property_product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    property_id INT,
    product_id INT,
    FOREIGN KEY (property_id) REFERENCES property (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);

CREATE TABLE IF NOT EXISTS productline_product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productline_id INT,
    product_id INT,
    FOREIGN KEY (productline_id) REFERENCES productline (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);



