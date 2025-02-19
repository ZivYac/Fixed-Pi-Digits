/** @jsxImportSource theme-ui */
import PropTypes from "prop-types";

const Success = ({ background = "accent", color = "inputBack", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="118" height="118" viewBox="0 0 118 118" {...props}>
    <g transform="translate(-901 -257)">
      <circle
        cx="59"
        cy="59"
        r="59"
        transform="translate(901 257)"
        fill="#48c0b6"
        sx={{ fill: background }}
      />
      <g transform="translate(932.467 288.467)">
        <path
          d="M7,20.036l8.277,8.277L34.589,9"
          transform="translate(6.795 10.313)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          sx={{ fill: "none", stroke: color }}
        />
        <circle
          cx="28"
          cy="28"
          r="28"
          transform="translate(-0.467 -0.467)"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
          sx={{ fill: "none", stroke: color }}
        />
      </g>
    </g>
  </svg>
);
Success.propTypes = {
  color: PropTypes.string,
  background: PropTypes.string,
};

export default Success;
