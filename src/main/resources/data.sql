insert into account (id, name, password) values
	(nextval('hibernate_sequence'), 'Account1', '{bcrypt}$2a$10$vmG149.oKSDVFxishLcodelvvAoL.u1yw1Q5tlGObqfhbXQZoxHMe');

insert into sensor (id, name, color) values
	(nextval('hibernate_sequence'), 'Sensor1', 0xc00000),
	(nextval('hibernate_sequence'), 'Sensor2', 0xff0000),
	(nextval('hibernate_sequence'), 'Sensor3', 0xffc000),
	(nextval('hibernate_sequence'), 'Sensor4', 0xffff00),
	(nextval('hibernate_sequence'), 'Sensor5', 0x92d050),
	(nextval('hibernate_sequence'), 'Sensor6', 0x00b050),
	(nextval('hibernate_sequence'), 'Sensor7', 0x00b0f0),
	(nextval('hibernate_sequence'), 'Sensor8', 0x0070c0),
	(nextval('hibernate_sequence'), 'Sensor9', 0x002060),
	(nextval('hibernate_sequence'), 'SensorA', 0x7030a0);
