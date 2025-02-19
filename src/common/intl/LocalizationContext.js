import React, { useState } from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";
import { INITIAL_LOCALE, SUPPORTED_LOCALES, MESSAGES } from "./Localization";

const LocalizationContext = React.createContext();

function LocalizationProvider({ children }) {
  // Method to dynamically change the language
  const nextLanguage = (locale) => {
    let localeList = Object.keys(SUPPORTED_LOCALES);
    let idx = localeList.indexOf(locale);
    return localeList[(idx + 1) % localeList.length];
  };

  const switchLanguage = (locale) => {
    setIntlParams({
      ...intlParams,
      locale: nextLanguage(locale),
    });
  };

  const [intlParams, setIntlParams] = useState({
    locale: INITIAL_LOCALE,
    nextLanguage: nextLanguage,
    switchLanguage: switchLanguage,
  });

  return (
    <LocalizationContext.Provider value={intlParams}>
      <IntlProvider
        key={intlParams.locale}
        locale={intlParams.locale}
        messages={MESSAGES[intlParams.locale]}
        defaultLocale={INITIAL_LOCALE}
      >
        {children}
      </IntlProvider>
    </LocalizationContext.Provider>
  );
}
LocalizationProvider.propTypes = {
  children: PropTypes.node,
};

export { LocalizationProvider, LocalizationContext, INITIAL_LOCALE };
