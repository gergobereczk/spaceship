-- dbinit.sql - Docker PostgreSQL inicializációhoz

-- Létrehozzuk a spaceshipRecords táblát
CREATE TABLE IF NOT EXISTS public."spaceshipRecords" (
    "nickName" VARCHAR(15) NOT NULL,
    score INTEGER NOT NULL
);

-- Beállítjuk a tábla tulajdonosát a gergo felhasználóra
ALTER TABLE public."spaceshipRecords" OWNER TO gergo;

