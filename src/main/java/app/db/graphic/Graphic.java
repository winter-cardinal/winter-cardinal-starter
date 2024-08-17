package app.db.graphic;

import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(
	indexes = {
		@Index(columnList = "name")
	},
	uniqueConstraints = {
		@UniqueConstraint(columnNames = {"name"})
	}
)
public class Graphic extends AbstractGraphic {}

