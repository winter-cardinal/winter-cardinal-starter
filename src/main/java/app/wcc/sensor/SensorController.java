package app.wcc.sensor;

import org.springframework.beans.factory.annotation.Autowired;
import org.wcardinal.controller.annotation.Controller;

@Controller
public class SensorController {
	@Autowired
	protected SensorComponent sensor;
}
