package app.db.sensor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
	@Modifying
	@Query(
		"delete " +
		"from " +
			"Sensor s " +
		"where " +
			"s.id in ?1"
	)
	int deleteAllByIdIn(Iterable<Long> ids);
}
