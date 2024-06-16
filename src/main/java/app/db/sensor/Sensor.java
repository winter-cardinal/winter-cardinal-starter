package app.db.sensor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
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
