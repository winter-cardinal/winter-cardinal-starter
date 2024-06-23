insert into account (id, name, password) values
	(nextval('account_seq'), 'Account1', '{bcrypt}$2a$10$vmG149.oKSDVFxishLcodelvvAoL.u1yw1Q5tlGObqfhbXQZoxHMe');

insert into sensor (id, name, color) values
	(nextval('sensor_seq'), 'Sensor1', 0xc00000),
	(nextval('sensor_seq'), 'Sensor2', 0xff0000),
	(nextval('sensor_seq'), 'Sensor3', 0xffc000),
	(nextval('sensor_seq'), 'Sensor4', 0xffff00),
	(nextval('sensor_seq'), 'Sensor5', 0x92d050),
	(nextval('sensor_seq'), 'Sensor6', 0x00b050),
	(nextval('sensor_seq'), 'Sensor7', 0x00b0f0),
	(nextval('sensor_seq'), 'Sensor8', 0x0070c0),
	(nextval('sensor_seq'), 'Sensor9', 0x002060),
	(nextval('sensor_seq'), 'SensorA', 0x7030a0);
