package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcTopController {
	@GetMapping("/")
	public String top() {
		return "top";
	}
}
