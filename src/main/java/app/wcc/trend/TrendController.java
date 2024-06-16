package app.wcc.trend;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.wcardinal.controller.annotation.Controller;

@Controller
@RequiredArgsConstructor
public class TrendController {
	@Autowired
	protected TrendInstantComponent instant;

	@Autowired
	protected TrendSensorComponent sensor;
}
