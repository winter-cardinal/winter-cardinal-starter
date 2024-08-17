package app.db.graphic;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@MappedSuperclass
@Data
@Accessors(chain=true)
@NoArgsConstructor
@AllArgsConstructor
public abstract class AbstractGraphic {
	private long version;

	@Id @GeneratedValue
	private Long id;

	@NotNull
	private String name;

	private String label;

	private String category;

	private String summary;

	@Column(columnDefinition="TEXT")
	private String description;

	@Column(columnDefinition="TEXT")
	private String tags;

	@Column(columnDefinition="TEXT")
	private String pieces;

	@Column(columnDefinition="TEXT")
	private String thumbnail;

	@Column(columnDefinition="TEXT")
	private String data;
}

