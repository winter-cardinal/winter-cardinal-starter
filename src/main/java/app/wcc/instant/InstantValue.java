package app.wcc.instant;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InstantValue {
	private double value;
	private long time;

	@JsonIgnore
	private double phase;

	void update(long time) {
		this.value = 0.5 * (1.0 + Math.sin(time / ((phase + 1) * 6000.0)));
		this.time = time;
	}
}
