/** @jsxImportSource theme-ui */
import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const IconHint = ({ background = "#fff", color = "#7392bb", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" {...props}>
    <g data-name="Group 1823">
      <g data-name="Group 276" transform="translate(.5 .5)">
        <circle
          data-name="Ellipse 45"
          cx="12"
          cy="12"
          r="12"
          sx={{ fill: background, stroke: color, strokeMiterlimit: 10 }}
        />
      </g>
      <g data-name="Group 277">
        <path
          data-name="Path 791"
          d="M27.774 7.518A1.517 1.517 0 0 1 29.325 6a1.471 1.471 0 0 1 1.5 1.518A1.443 1.443 0 0 1 29.325 9a1.489 1.489 0 0 1-1.551-1.482zM30.6 16h-2.546v-6H30.6z"
          transform="translate(-16.825 1.5)"
          sx={{ fill: color }}
        />
      </g>
    </g>
  </svg>
);
IconHint.propTypes = {
  color: PropTypes.string,
};

export default IconHint;
