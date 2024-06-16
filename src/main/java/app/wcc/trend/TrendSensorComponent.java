package app.wcc.trend;

import java.util.List;

import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Component;

import app.db.sensor.Sensor;
import app.db.sensor.SensorService;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class TrendSensorComponent {
	private final SensorService sensorService;

	@Callable
	List<Sensor> findAll() {
		return sensorService.findAll();
	}
}
