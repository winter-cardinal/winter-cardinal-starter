import { GraphicFound } from "../../db/graphic-found";
import { GraphicPiece } from "../../db/graphic-piece";

export interface GraphicPieceComponent {
	search(word: string): Promise<GraphicFound[]>;
	get(id: number): Promise<GraphicPiece>;
	getByName(name: string): Promise<GraphicPiece>;
	save(graphic: GraphicPiece): Promise<number>;
	delete(id: number): Promise<void>;
}
