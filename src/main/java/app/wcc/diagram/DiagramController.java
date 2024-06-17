package app.wcc.diagram;

import org.springframework.beans.factory.annotation.Autowired;
import org.wcardinal.controller.annotation.Controller;

import app.wcc.instant.InstantComponent;

@Controller
public class DiagramController {
	@Autowired
	protected InstantComponent instant;
}
