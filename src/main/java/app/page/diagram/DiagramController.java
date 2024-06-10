package app.page.diagram;

import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Controller;

@Controller
public class DiagramController {
	@Callable
	String hello() {
		return "Hello, World";
	}
}
