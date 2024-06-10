-- INSERT INTO users(pseudo) VALUES('baptiste'); -- ! simple quote

-- alter sequence users_id_seq restart -- Pour reset l'id 

-- delete from users where condition

-- delete from users where id is not null

CREATE TABLE ForumMessages(
    id_forum INT,
    PRIMARY KEY(id_forum),
    Titre VARCHAR(100),
    Texte VARCHAR(1000),
    Date_message TIMESTAMP,
    id_activite INT,
    CONSTRAINT fk_activite
        FOREIGN KEY(id_activite)
            REFERENCES Activites(id_activite)
            ON DELETE SET NULL
);