package app.db.graphic;

import org.springframework.stereotype.Service;

@Service
public class GraphicService extends AbstractGraphicService<Graphic> {
	public GraphicService(final GraphicRepository graphicRepository) {
		super(graphicRepository);
	}
}
