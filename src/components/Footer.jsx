import { Text, Flex } from "theme-ui";
import { FormattedMessage } from "react-intl";
const Footer = () => {
  return (
    <Flex
      id="Footer"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "headerFooter",
        width: "100%",
        height: "128px",
      }}
    >
      <Text
        sx={{
          fontSize: "75px",
          fontFamily: "Thaoma",
          fontWeight: "bold",
        }}
      >
        @Mind CTI
      </Text>
    </Flex>
  );
};

export default Footer;
