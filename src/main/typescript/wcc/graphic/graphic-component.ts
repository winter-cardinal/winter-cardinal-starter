import { Graphic } from "../../db/graphic";
import { GraphicFound } from "../../db/graphic-found";
import { GraphicPieceComponent } from "./graphic-piece-component";

export interface GraphicComponent {
	readonly piece: GraphicPieceComponent;

	search(word: string): Promise<GraphicFound[]>;
	get(id: number): Promise<Graphic>;
	getByName(name: string): Promise<Graphic>;
	save(graphic: Graphic): Promise<number>;
	delete(id: number): Promise<void>;
}
