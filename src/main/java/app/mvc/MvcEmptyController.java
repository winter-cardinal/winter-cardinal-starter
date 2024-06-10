package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcEmptyController {
	@GetMapping("/empty")
	public String empty() {
		return "empty/main";
	}
}
