package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcSensorController {
	@GetMapping("/sensor")
	public String main() {
		return "sensor/main";
	}
}
