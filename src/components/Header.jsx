import { FormattedMessage } from "react-intl";
import { Image, Flex, Text } from "theme-ui";

import pi_header from "../assets/images/pi_header.png";
import LanguageSwitch from "./LanguageSwitch";

const Header = () => {
  return (
    <Flex
      id="Pi_Flex"
      sx={{
        backgroundColor: "DeepSkyBlue ",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "141px",
        py: "10px",
      }}
    >
      <Text color="white" sx={{ width: "10rem" }}>
        <FormattedMessage
          id="lbl.formateDate"
          values={{ dateParam: new Date() }}
        />
      </Text>

      <Image src={pi_header}></Image>

      <LanguageSwitch sx={{ width: "10rem" }} />
    </Flex>
  );
};

export default Header;
