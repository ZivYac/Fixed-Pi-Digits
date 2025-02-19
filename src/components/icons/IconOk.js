/** @jsxImportSource theme-ui */
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const IconOk = ({ color = "#fff", background = "success", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="118" height="118" viewBox="0 0 118 118" {...props}>
    <g data-name="Group 1807" transform="translate(-901 -257)">
      <circle
        data-name="Ellipse 26"
        cx="59"
        cy="59"
        r="59"
        transform="translate(901 257)"
        sx={{
          fill: background,
        }}
      />
      <g transform="translate(932.467 288.467)">
        <path
          data-name="Path 816"
          d="m7 20.036 8.277 8.277L34.589 9"
          transform="translate(6.795 10.313)"
          sx={{
            fill: "none",
            stroke: color,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "4px",
          }}
        />
        <circle
          data-name="Ellipse 48"
          cx="28"
          cy="28"
          r="28"
          transform="translate(-.467 -.467)"
          sx={{
            fill: "none",
            stroke: color,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "4px",
          }}
        />
      </g>
    </g>
  </svg>
);
IconOk.propTypes = {
  color: PropTypes.string,
};

export default IconOk;
