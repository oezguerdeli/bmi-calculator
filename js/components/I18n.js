import i18n from 'i18n-js';
import { NativeModules } from 'react-native';

//import translation files
import en from './en.json';
import de from './de.json';

//get current language of phone
const phoneLanguage = NativeModules.I18nManager.localeIdentifier;

i18n.defaultLocale = 'en';
i18n.locale = phoneLanguage;
i18n.fallbacks = true;
i18n.translations = {
    en,
    de
};

export default i18n;