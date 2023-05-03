PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS `tip_korisnika` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `uloga` VARCHAR(45) NOT NULL,
  UNIQUE(`id`)
);

CREATE TABLE IF NOT EXISTS `korisnik` (
  `id_korisnik` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  `ime` VARCHAR(50) NULL,
  `prezime` VARCHAR(60) NULL,
  `korime` VARCHAR(45) NOT NULL,
  `lozinka` TEXT NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `tip_korisnika_id` INT NOT NULL,
  UNIQUE  (`korime` ) ,
  FOREIGN KEY (id_korisnik) REFERENCES tip_korisnika(id)
);

CREATE TABLE IF NOT EXISTS `zanr` (
  `id_zanr` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `ime` VARCHAR(45)  NULL,
  UNIQUE(`id_zanr`));

CREATE TABLE IF NOT EXISTS `film_zanr` (
  `zanr_id_zanr` INTEGER  NOT NULL ,
  `film_id_film` INTEGER NOT NULL,
  PRIMARY KEY (film_id_film, zanr_id_zanr),
  FOREIGN KEY (zanr_id_zanr) REFERENCES zanr(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (film_id_film) REFERENCES film(id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE film_zanr;

CREATE TABLE IF NOT EXISTS `film` (
  `id_movie` int NOT NULL,
  `adult` tinyint  NULL,
  `backdrop_path` varchar(45)  NULL,
  `belongs_to_collection` varchar(45)  NULL,
  `budget` int  NULL,
  `hompage` varchar(45)  NULL,
  `imdb_id` varchar(45)  NULL,
  `original_language` varchar(45)  NULL,
  `original_title` varchar(45)  NULL,
  `overview` varchar(45)  NULL,
  `popularity` int  NULL,
  `poster_path` varchar(45)  NULL,
  `release_date` date  NULL,
  `revenue` int  NULL,
  `runtime` int  NULL,
  `status` varchar(45)  NULL,
  `genre` varchar(45)  NULL,
  `title` varchar(45)  NULL,
  `video` tinyint  NULL,
  `vote_average` float  NULL,
  `vote_count` varchar(45)  NULL,
  `users_id_users` int NOT NULL
);



INSERT or IGNORE INTO `tip_korisnika` VALUES (1, 'admin');
INSERT or IGNORE INTO `tip_korisnika` VALUES (2, 'korisnik');

INSERT or IGNORE INTO `film` VALUES (1, 0, '/path/to/backdrop.jpg', 'collection_name', 1000000, 'http://www.example.com', 'tt1234567','en', 'Original Title', 'Movie overview', 100, '/path/to/poster.jpg', '2022-01-01', 2000000, 120, 'released', 'drama', 'Title', 0, 7.5, 1000, 1);
INSERT or IGNORE INTO film VALUES (2, 0, '/path/to/backdrop3.jpg', 'collection_name3', 3000000, 'http://www.example3.com', 'tt3456789','en', 'Second Title', 'Second overview', 300, '/path/to/poster3.jpg', '2024-01-01', 4000000, 122, 'released', 'drama', 'SecondTitle', 0, 9.5, 3000, 1);
INSERT or IGNORE INTO film VALUES (3, 1, '/path/to/backdrop4.jpg', 'collection_name4', 4000000, 'http://www.example4.com', 'tt4567890','en', 'Third Title', 'Third overview', 400, '/path/to/poster4.jpg', '2025-01-01', 5000000, 123, 'released', 'komedija', 'ThirdTitle', 0, 6.5, 4000, 1);
INSERT or IGNORE INTO film VALUES (4, 0, '/path/to/backdrop5.jpg', 'collection_name5', 5000000, 'http://www.example5.com', 'tt5678901','en', 'Fourth Title', 'Fourth overview', 500, '/path/to/poster5.jpg', '2026-01-01', 6000000, 124, 'released', 'tragedija', 'FourthTitle', 0, 7.0, 5000, 1);
INSERT or IGNORE INTO `film` VALUES (5, 0, '/path/to/backdrop.jpg', 'collection_name', 1000000, 'http://www.example.com', 'tt1234567','en', 'Original Title', 'Movie overview', 100, '/path/to/poster.jpg', '2022-01-01', 2000000, 120, 'released', 'drama', 'FifthTitle', 0, 7.5, 1000, 1);
INSERT or IGNORE INTO film VALUES (6, 0, '/path/to/backdrop3.jpg', 'collection_name3', 3000000, 'http://www.example3.com', 'tt3456789','en', 'Second Title', 'Second overview', 300, '/path/to/poster3.jpg', '2024-01-01', 4000000, 122, 'released', 'drama', 'SixthTitle', 0, 9.5, 3000, 1);
INSERT or IGNORE INTO film VALUES (7, 1, '/path/to/backdrop4.jpg', 'collection_name4', 4000000, 'http://www.example4.com', 'tt4567890','en', 'Third Title', 'Third overview', 400, '/path/to/poster4.jpg', '2025-01-01', 5000000, 123, 'released', 'komedija', 'SeventhTitle', 0, 6.5, 4000, 1);
INSERT or IGNORE INTO film VALUES (8, 0, '/path/to/backdrop5.jpg', 'collection_name5', 5000000, 'http://www.example5.com', 'tt5678901','en', 'Fourth Title', 'Fourth overview', 500, '/path/to/poster5.jpg', '2026-01-01', 6000000, 124, 'released', 'tragedija', 'EightTitle', 0, 7.0, 5000, 1);


INSERT or IGNORE INTO `korisnik` VALUES (1,'John', 'Doe', 'johndoe', 'password', 'john.doe@example.com', 1);
INSERT or IGNORE INTO `korisnik` VALUES (2,'pero', 'preic', 'pperic', 'loz2', 'ppreic@example.com', 2);
INSERT or IGNORE INTO `korisnik` VALUES (3,'luka', 'lukic', 'llukic', 'password2', 'llukic@example.com', 2);

INSERT or IGNORE INTO `zanr` VALUES ('1', 'drama');
INSERT or IGNORE INTO `zanr` VALUES ('2', 'komedija');
INSERT or IGNORE INTO `zanr` VALUES ('3', 'tragedija');

INSERT or IGNORE INTO `film_zanr` VALUES (1,1);
INSERT or IGNORE INTO `film_zanr` VALUES (2,2);
INSERT or IGNORE INTO `film_zanr` VALUES (2,3);
INSERT or IGNORE INTO `film_zanr` VALUES (2,7);
INSERT or IGNORE INTO `film_zanr` VALUES (1,5);
INSERT or IGNORE INTO `film_zanr` VALUES (1,6);
INSERT or IGNORE INTO `film_zanr` VALUES (3,4);
INSERT or IGNORE INTO `film_zanr` VALUES (3,8);

SELECT * FROM tip_korisnika;
SELECT * FROM korisnik;
SELECT * FROM film;
SELECT * FROM zanr;
SELECT * FROM film_zanr;
