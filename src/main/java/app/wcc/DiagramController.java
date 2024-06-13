package app.wcc;

import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Controller;

@Controller
public class DiagramController {
	@Callable
	String hello() {
		return "Hello, World";
	}
}
