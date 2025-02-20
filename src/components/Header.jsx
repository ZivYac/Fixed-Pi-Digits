import { FormattedMessage } from "react-intl";
import { Image, Flex, Text } from "theme-ui";

import pi_header from "../assets/images/pi_header.png";
import LanguageSwitch from "./LanguageSwitch";
import MyButton from "./MyButton";

import { doLogout } from "../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <Flex
      id="Pi_Flex"
      sx={{
        backgroundColor: "DeepSkyBlue",
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
      <Flex sx={{
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <LanguageSwitch sx={{ width: "10rem" }} />
        <MyButton
          id="LogOut"
          sx={{
            bg: "DeepSkyBlue",
            width: "auto",
            whiteSpace: "nowrap"
          }}
          onClick={() => {dispatch(doLogout())}}
          >
            <FormattedMessage id="lbl.logout" />
          </MyButton>
      </Flex>
    </Flex>
  );
};

export default Header;
