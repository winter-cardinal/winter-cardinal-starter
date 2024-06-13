package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcCrudController {
	@GetMapping("/crud")
	public String main() {
		return "crud/main";
	}
}
