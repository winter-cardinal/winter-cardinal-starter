package app.wcc.graphic;

import org.wcardinal.controller.annotation.Callable;
import org.wcardinal.controller.annotation.Component;

import app.db.graphic.GraphicFound;
import app.db.graphic.GraphicPiece;
import app.db.graphic.GraphicPieceService;

import org.springframework.beans.factory.annotation.Autowired;

@Component
public class GraphicPieceComponent {
	@Autowired
	GraphicPieceService service;

	@Callable
	Iterable<GraphicFound> search(String word) {
		return service.search(word);
	}

	@Callable
	GraphicPiece get(final Long id) {
		return service.find(id).orElse(null);
	}

	@Callable
	GraphicPiece getByName(final String name) {
		return service.find(name).orElse(null);
	}

	@Callable
	Long save(GraphicPiece graphicPiece) {
		return service.save(graphicPiece).getId();
	}

	@Callable
	void delete(Long id) {
		service.delete(id);
	}
}
