package app.wcc.trend;

import org.springframework.beans.factory.annotation.Autowired;
import org.wcardinal.controller.annotation.Controller;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class TrendController {
	@Autowired
	protected TrendInstantComponent instant;

	@Autowired
	protected TrendSensorComponent sensor;
}
