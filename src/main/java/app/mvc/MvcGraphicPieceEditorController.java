package app.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MvcGraphicPieceEditorController {
	@GetMapping("/graphic-piece-editor")
	public String main() {
		return "graphic-piece-editor/main";
	}
}
