import messages_en from "../../assets/translations/en.json";
import messages_ro from "../../assets/translations/ro.json";
import messages_heb from "../../assets/translations/heb.json";

const MESSAGES = {
  en: messages_en,
  ro: messages_ro,
  heb: messages_heb,
};

const SUPPORTED_LOCALES = {
  en: "English",
  ro: "Romanian",
  heb: "Hebrew",
};

const INITIAL_LOCALE = "en";

export { MESSAGES, INITIAL_LOCALE, SUPPORTED_LOCALES };
