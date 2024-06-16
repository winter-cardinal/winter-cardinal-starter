package app.wcc.trend;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.wcardinal.controller.AbstractController;
import org.wcardinal.controller.annotation.Component;
import org.wcardinal.controller.annotation.OnChange;
import org.wcardinal.controller.annotation.OnTime;
import org.wcardinal.controller.data.SClass;

@Component
@RequiredArgsConstructor
public class TrendInstantComponent extends AbstractController {
	@Autowired
	protected SClass<List<String>> sensors;

	@OnChange("sensors")
	protected void onSensorsChange(final List<String> sensors) {
		final var values = new HashMap<String, TrendInstantValue>();
		for (int i = 0; i < sensors.size(); ++i) {
			final var sensor = sensors.get(i);
			values.put(sensor, new TrendInstantValue(0, 0, i));
		}
		this.cancelAll();
		this.interval("send", 0, 1000, values);
	}

	@OnTime
	protected void send(final Map<String, TrendInstantValue> values) {
		final var now = System.currentTimeMillis();
		for (final var value : values.values()) {
			value.update(now);
		}
		this.triggerDirect("update", values);
	}
}
