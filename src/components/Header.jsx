import { FormattedMessage } from "react-intl";
import { Image, Flex, Text, ThemeProvider } from "theme-ui";

import pi_header from "../assets/images/pi_header.png";
import LanguageSwitch from "./LanguageSwitch";
import MyButton from "./MyButton";

import { doLogout } from "../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

import { useColorMode } from "theme-ui";
import { theme } from "../common/theme";



const Header = () => {
  const dispatch = useDispatch();
  const [colorMode, setColorMode] = useColorMode();  
  
  return (
      <ThemeProvider theme={theme}>
        <Flex
          id="Pi_Flex"
          sx={{
            backgroundColor: "headerFooterBlue",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "141px",
            py: "10px",
          }}
        >
          <Flex sx={{
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Text color="text" sx={{width: "auto"}}>
              <FormattedMessage
                id="lbl.formateDate"
                values={{ dateParam: new Date() }}
              />
            </Text>
            <LanguageSwitch sx={{ width: "10rem" }} />
          </Flex>

          <Image src={pi_header}></Image>

          <Flex sx={{
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}>
            
            <MyButton
              id="LogOut"
              sx={{
                color: "text",
                backgroundColor: "background",
                width: "auto",
                whiteSpace: "nowrap"
              }}
              onClick={() => {dispatch(doLogout())}}
              >
                <FormattedMessage id="lbl.logout" />
              </MyButton>

              <MyButton sx={{
                color: "text",
                backgroundColor: "background",
                width: "auto",
                whiteSpace: "nowrap"
                }}
                onClick={() => {
                  setColorMode(colorMode === 'light' ? 'dark' : 'light');
                }}
                >
                {colorMode === 'light' ?   <FormattedMessage id="lbl.theme_button_light" /> :   <FormattedMessage id="lbl.theme_button_dark" />}
          </MyButton>
          </Flex>
        </Flex>
      </ThemeProvider>
  );
};

export default Header;
