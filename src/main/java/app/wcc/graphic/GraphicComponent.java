package app.wcc.graphic;

import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Component;

import app.db.graphic.Graphic;
import app.db.graphic.GraphicFound;
import app.db.graphic.GraphicService;

import org.springframework.beans.factory.annotation.Autowired;

@Component
public class GraphicComponent {
	@Autowired
	GraphicService service;

	@Autowired
	GraphicPieceComponent piece;

	@Callable
	Iterable<GraphicFound> search(String word) {
		return service.search(word);
	}

	@Callable
	Graphic get(final Long id) {
		return service.find(id).orElse(null);
	}

	@Callable
	Graphic getByName(final String name) {
		return service.find(name).orElse(null);
	}

	@Callable
	Long save(final Graphic graphic) {
		return service.save(graphic).getId();
	}

	@Callable
	void delete(Long id) {
		service.delete(id);
	}
}
