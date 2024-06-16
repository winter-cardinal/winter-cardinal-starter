package app.wcc.trend;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TrendInstantValue {
	private double value;
	private long time;

	@JsonIgnore
	private double phase;

	void update(long time) {
		this.value = Math.sin(time / ((phase + 1) * 6000.0));
		this.time = time;
	}
}
