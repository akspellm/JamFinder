### Schema
CREATE DATABASE jammers_db;
USE jammers_db;

CREATE TABLE jammers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	age TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zipcode TEXT NOT NULL,
    photo_url TEXT,
	PRIMARY KEY (id)
);
