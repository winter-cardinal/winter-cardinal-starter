package app.db.graphic;

import org.springframework.stereotype.Service;

@Service
public class GraphicPieceService extends AbstractGraphicService<GraphicPiece> {
	public GraphicPieceService(final GraphicPieceRepository graphicPieceRepository) {
		super(graphicPieceRepository);
	}
}
