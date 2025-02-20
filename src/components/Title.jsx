import { Text } from "theme-ui";
import { FormattedMessage } from "react-intl";

const Title = () => {
  return (
    <Text
      sx={{
        color: "text",
        fontFamily: "Times news Roman",
        fontStyle: "normal",
        fontSize: "50px",
        fontWeight: "bold",
      }}
    >
      <FormattedMessage id="title" />
      {/* Display the first n-digits of Pi */}
    </Text>
  );
};

export default Title;
