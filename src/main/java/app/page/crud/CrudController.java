package app.page.crud;

import java.util.List;

import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Controller;

import app.db.sensor.Sensor;
import app.db.sensor.SensorService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class CrudController {
	private final SensorService sensorService;

	@Callable
	List<Sensor> findAll() {
		return sensorService.findAll();
	}

	@Callable
	List<Long> saveAll(List<Sensor> updateds, List<Long> deleteds) {
		return sensorService.saveAll(updateds, deleteds);
	}
}
