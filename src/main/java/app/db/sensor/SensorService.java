package app.db.sensor;

import java.util.Collections;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SensorService {
	private final SensorRepository sensorRepository;

	public List<Sensor> findAll() {
		return sensorRepository.findAll();
	}

	public List<Long> saveAll(List<Sensor> updateds, List<Long> deleteds) {
		if (!deleteds.isEmpty()) {
			sensorRepository.deleteAllByIdIn(deleteds);
		}
		if (!updateds.isEmpty()) {
			return sensorRepository.saveAll(updateds).stream()
					.map((sensor) -> sensor.getId())
					.toList();
		}
		return Collections.emptyList();
	}
}
