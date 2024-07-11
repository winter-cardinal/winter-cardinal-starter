import { css } from "@emotion/react";
import { util } from "@wcardinal/wcardinal";
import { type FC } from "react";

export interface SearchInputProps {
	className?: string;
}

export const searchInputCss = css({
	display: "flex",
	height: 36,
	padding: "0 42px 0 18px",
	boxSizing: "border-box",
	borderRadius: 4,
	margin: 0,
	border: "none",
	outline: "none",
	background: "#f6f6f6",
	backgroundImage:
		"url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewBox%3D%220%20-960%20960%20960%22%20fill%3D%22%2353617a%22%3E%3Cpath%20d%3D%22M784-120%20532-372q-30%2024-69%2038t-83%2014q-109%200-184.5-75.5T120-580q0-109%2075.5-184.5T380-840q109%200%20184.5%2075.5T640-580q0%2044-14%2083t-38%2069l252%20252-56%2056ZM380-400q75%200%20127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75%200-127.5%2052.5T200-580q0%2075%2052.5%20127.5T380-400Z%22%20%2F%3E%3C%2Fsvg%3E')",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center right 8px",
	fontWeight: 400,
	fontFamily: "inherit",
	fontSize: 14,
	lineHeight: 24,
	"&:focus": {
		outline: "#53617a solid 1.5px",
		outlineOffset: -1.5
	}
});

export const SearchInput: FC<SearchInputProps> = ({ className }) => {
	return (
		<input
			type="text"
			placeholder={util.messageSource.get("map.search.label")}
			css={searchInputCss}
			className={className}
		/>
	);
};
