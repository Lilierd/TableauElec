INSERT INTO roles(nom) VALUES('Manager');
INSERT INTO roles(nom) VALUES('CA');
INSERT INTO roles(nom) VALUES('CSI');
INSERT INTO roles(nom) VALUES('Intervenant');

INSERT INTO utilisateurs(nom, id_role) VALUES('Vincent MERLETTE', 1);
INSERT INTO utilisateurs(nom, id_role) VALUES('Jérôme Dolignon', 2);
INSERT INTO utilisateurs(nom, id_role) VALUES('Jordan TEXEIRA', 3);
INSERT INTO utilisateurs(nom, id_role) VALUES('Rémi Petitfrère', 4);

INSERT INTO activites(nom, descript, date_activite, id_ct) VALUES('Décharge batterie', 'Décharge des batteries', TIMESTAMP '2024-10-19 09:00:00+02', 3);

INSERT INTO exec_activites(id_activite, id_exec) VALUES(1,4);
