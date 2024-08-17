package app.wcc.graphic;

import org.wcardinal.controller.annotation.Controller;

import org.springframework.beans.factory.annotation.Autowired;

@Controller
public class GraphicController {
	@Autowired
	protected GraphicComponent graphic;
}
