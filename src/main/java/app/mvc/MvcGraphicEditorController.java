package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcGraphicEditorController {
	@GetMapping("/graphic-editor")
	public String main() {
		return "graphic-editor/main";
	}
}
