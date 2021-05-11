CREATE TABLE IF NOT EXISTS personas (
	id integer PRIMARY KEY NOT NULL,
	nombre_completo text NOT NULL,
	tipo_documento text DEFAULT 0,
	numero_documento INTEGER DEFAULT 0
);
CREATE TABLE IF NOT EXISTS diagnostico(
	id INTEGER PRIMARY KEY NOT NULL,
	nombre_diagnostico text NOT NULL,
	color text NOT NULL
);
CREATE TABLE IF NOT EXISTS personas_diagnostico(
	persona_id INTEGER,
	diagnostico_id INTEGER,
	PRIMARY KEY (persona_id, diagnostico_id),
	FOREIGN KEY(persona_id) REFERENCES personas(id) ON DELETE CASCADE,
	FOREIGN KEY(diagnostico_id) REFERENCES diagnostico(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS sesion(
	id INTEGER PRIMARY KEY NOT NULL,
	fecha text NOT NULL,
	persona_id INTEGER,
	info text NOT NULL,
	FOREIGN KEY(persona_id) REFERENCES personas(id) ON DELETE CASCADE
);
--LISTA DE TODOS LOS DIAGNOSTICOS PARA LUEGO REVISAR CAMBIOS
--ES NECESARIO REVISAR EL ACTUAR DEL USUARIO RESPECTO A ESTA TABLA 
CREATE TABLE IF NOT EXISTS lista_diagnosticos(
	id INTEGER PRIMARY KEY NOT NULL,
	color TEXT NOT NULL,
	titulo TEXT NOT NULL,
	descipcion TEXT NOT NULL
);
-- CREATE INDEX personasindex ON personas_diagnostico(persona_id);
-- CREATE INDEX diagnosticoindex ON personas_diagnostico(diagnostico_id);

