package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcTrendController {
	@GetMapping("/trend")
	public String main() {
		return "trend/main";
	}
}
