package app.db.sensor;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Entity
@Table(
		indexes = {@Index(columnList = "name")},
		uniqueConstraints = {@UniqueConstraint(columnNames = {"name"})})
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class Sensor {
	@Id
	@GeneratedValue
	private Long id;

	@NotNull
	private String name;

	private long color;
}
