package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcDiagramController {
	@GetMapping("/diagram")
	public String diagram() {
		return "diagram/main";
	}
}
