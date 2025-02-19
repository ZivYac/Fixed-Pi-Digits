/** @jsxImportSource theme-ui */
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const IconError = ({ color = "#9f1e1e", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26.065"
    height="22.792"
    viewBox="0 0 26.065 22.792"
    {...props}>
    <path
      data-name="Path 882"
      d="M11.588 4 1.86 20.243a2.3 2.3 0 0 0 1.964 3.446H23.28a2.3 2.3 0 0 0 1.964-3.446L15.516 4a2.3 2.3 0 0 0-3.928 0z"
      transform="translate(-.521 -1.897)"
      sx={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2px",
      }}
    />
    <path
      data-name="Line 138"
      transform="translate(13.032 8.267)"
      d="M0 0v5.234"
      sx={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2px",
      }}
    />
    <path
      data-name="Line 139"
      transform="translate(13.032 17.198)"
      d="M0 0h.01"
      sx={{
        fill: "none",
        stroke: color,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: "2px",
      }}
    />
  </svg>
);
IconError.propTypes = {
  color: PropTypes.string,
};

export default IconError;
