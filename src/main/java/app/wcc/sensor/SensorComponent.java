package app.wcc.sensor;

import app.db.sensor.Sensor;
import app.db.sensor.SensorService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Component;

@Component
@RequiredArgsConstructor
public class SensorComponent {
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
