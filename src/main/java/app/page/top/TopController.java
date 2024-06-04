package app.page.top;

import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Controller;

@Controller
public class TopController {
	@Callable
	String hello() {
		return "Hello, World";
	}
}
