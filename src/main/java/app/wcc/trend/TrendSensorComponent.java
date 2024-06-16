package app.wcc.trend;

import app.db.sensor.Sensor;
import app.db.sensor.SensorService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Component;

@Component
@RequiredArgsConstructor
public class TrendSensorComponent {
	private final SensorService sensorService;

	@Callable
	List<Sensor> findAll() {
		return sensorService.findAll();
	}
}
