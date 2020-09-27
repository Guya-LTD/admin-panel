import { createI18n } from 'react-router-i18n';

import appEn from './en/app';
import appAm from './am/app';

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'am'];

const translations = {
    en: {
        app: appEn
    },
    am: {
        app: appAm
    }
}

console.log(translations)

const I18n = createI18n(
    locales,
    translations,
  );
   
  export default I18n;