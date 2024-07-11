import { css } from "@emotion/react";
import { util } from "@wcardinal/wcardinal";
import { type FC } from "react";

export interface SearchResultProps {
	className?: string;
}

export const searchResultCss = css({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: 0,
	boxSizing: "border-box",
	borderRadius: 4,
	margin: 8,
	border: "1px solid #f6f6f6",
	outline: "none",
	background: "none",
	fontWeight: 400,
	fontFamily: "inherit",
	fontSize: 20,
	lineHeight: 24,
	color: "#ccc"
});

export const SearchResult: FC<SearchResultProps> = ({ className }) => {
	return (
		<div css={searchResultCss} className={className}>
			{util.messageSource.get("map.search.no-items-found")}
		</div>
	);
};
