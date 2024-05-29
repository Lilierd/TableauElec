CREATE TABLE Roles(
    id_role SERIAL,
    Nom VARCHAR(30),
    PRIMARY KEY(id_role)
);

CREATE TABLE Utilisateurs(
    id_utilisateur SERIAL,
    Nom VARCHAR(100),
    id_role INT NOT NULL,
    PRIMARY KEY(id_utilisateur),
    CONSTRAINT fk_role
        FOREIGN KEY(id_role)
            REFERENCES Roles(id_role)
);

CREATE TABLE Activites(
    id_activite SERIAL,
    Nom VARCHAR(200),
    Descript VARCHAR(1000),
    Date_activite TIMESTAMP,
    id_ct INT NOT NULL,
    PRIMARY KEY(id_activite),
    CONSTRAINT fk_ct
        FOREIGN KEY(id_ct)
            REFERENCES Utilisateurs(id_utilisateur)
            ON DELETE SET NULL

);

CREATE TABLE Exec_Activites(
    id_activite INT,
    id_exec INT,
    PRIMARY KEY(id_activite, id_exec),
    CONSTRAINT fk_activite
        FOREIGN KEY(id_activite)
            REFERENCES Activites(id_activite)
            ON DELETE SET NULL,
    CONSTRAINT fk_utilisateur
        FOREIGN KEY(id_exec)
            REFERENCES Utilisateurs(id_utilisateur)
            ON DELETE SET NULL
);

CREATE TABLE ForumMessages(
    id_forum SERIAL,
    PRIMARY KEY(id_forum),
    Titre VARCHAR(100),
    Texte VARCHAR(1000),
    Date_message TIMESTAMP,
    id_activite INT,
    CONSTRAINT fk_activite
        FOREIGN KEY(id_activite)
            REFERENCES Activites(id_activite)
            ON DELETE SET NULL,
    id_author INT,
    CONSTRAINT fk_author
        FOREIGN KEY(id_author)
            REFERENCES Utilisateurs(id_utilisateur)
            ON DELETE SET NULL

);
