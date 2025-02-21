import { useContext } from "react";
import { Flex, Text } from "theme-ui";

import { SUPPORTED_LOCALES } from "../common/intl/Localization";
import { LocalizationContext } from "../common/intl/LocalizationContext";
import IconGlobe from "./icons/IconGlobe";

const LanguageSwitch = (props) => {
  const { locale, nextLanguage, switchLanguage } =
    useContext(LocalizationContext);

  return (
    <Flex
      onClick={() => switchLanguage(locale)}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        ":hover": {
          cursor: "pointer",
        },
        ...props.sx,
      }}
    >
      <IconGlobe />
      <Text ml="0.25rem" sx={{ fontSize: "1rem", color: "text" }}>
        {SUPPORTED_LOCALES[nextLanguage(locale)]}
      </Text>
    </Flex>
  );
};

export default LanguageSwitch;
