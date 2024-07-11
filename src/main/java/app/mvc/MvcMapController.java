package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcMapController {
	@GetMapping("/map")
	public String main() {
		return "map/main";
	}
}
