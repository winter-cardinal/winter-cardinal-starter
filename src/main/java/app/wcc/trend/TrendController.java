package app.wcc.trend;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.wcardinal.controller.annotation.Controller;

import app.wcc.instant.InstantComponent;
import app.wcc.sensor.SensorComponent;

@Controller
@RequiredArgsConstructor
public class TrendController {
	@Autowired
	protected InstantComponent instant;

	@Autowired
	protected SensorComponent sensor;
}
