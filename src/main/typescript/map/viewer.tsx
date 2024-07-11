import { useEffect, useRef, type FC } from "react";
import * as L from "leaflet";
import { css } from "@emotion/react";

export interface ViewerProps {
	className?: string;
}

export const viewerCss = css({
	position: "absolute",
	left: 0,
	top: 0,
	right: 0,
	bottom: 0
});

export const Viewer: FC<ViewerProps> = ({ className }) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const leafletRef = useRef<L.Map>();

	useEffect(() => {
		if (leafletRef.current == null) {
			const newLeaflet = L.map(elementRef.current!);
			L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(newLeaflet);
			newLeaflet.setView([35.677894, 139.7618794], 12);
			newLeaflet.attributionControl.setPosition("bottomleft");
			leafletRef.current = newLeaflet;
		}
		return () => {
			const leaflet = leafletRef.current;
			if (leaflet != null) {
				leafletRef.current = undefined;
				leaflet.off();
				leaflet.remove();
			}
		};
	}, []);

	return <div css={viewerCss} ref={elementRef} className={className} />;
};
