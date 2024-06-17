package app.wcc.diagram;

import app.wcc.instant.InstantComponent;
import org.springframework.beans.factory.annotation.Autowired;
import org.wcardinal.controller.annotation.Controller;

@Controller
public class DiagramController {
	@Autowired
	protected InstantComponent instant;
}
