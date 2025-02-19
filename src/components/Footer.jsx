import { Text, Flex } from "theme-ui";
const Footer = () => {
  return (
    <Flex
      id="Footer"
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "DeepSkyBlue",
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
