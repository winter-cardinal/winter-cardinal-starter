import { GraphicComponent } from "../graphic/graphic-component";
import { InstantComponent } from "../instant/instant-component";

export interface DiagramController {
	instant: InstantComponent;
	graphic: GraphicComponent;
}
