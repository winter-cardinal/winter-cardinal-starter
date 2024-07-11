import { css } from "@emotion/react";
import type { FC } from "react";
import { SearchInput } from "./search-input";
import { SearchResult } from "./search-result";

export interface ControlProps {
	className?: string;
}

export const controlCss = css({
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "stretch",
	position: "absolute",
	left: 0,
	top: 0,
	right: 0,
	bottom: 0,
	margin: 0,
	border: "none",
	boxSizing: "border-box",
	borderRadius: 4,
	background: "#fff",
	boxShadow: "0px 2px 4px #00000059"
});

export const Control: FC<ControlProps> = ({ className }) => {
	return (
		<div css={controlCss} className={className}>
			<SearchInput css={{ margin: 8 }} />
			<SearchResult css={{ flexGrow: 1, margin: 8 }} />
		</div>
	);
};
