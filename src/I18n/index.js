import { createI18n } from 'react-router-i18n';

import appEn from './en/app';
import appAm from './am/app';
import credentialEn from './en/credential';
import credentialAm from './am/credential';
import formEn from './en/form';
import formAm from './am/form';
import httpEn from './en/http';
import httpAm from './am/http';

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'am'];

const translations = {
    en: {
        app: appEn,
        credential: credentialEn,
        form: formEn,
        http: httpEn,
    },
    am: {
        app: appAm,
        credential: credentialAm,
        form: formAm,
        http: httpAm,
    }
}

const I18n = createI18n(
    locales,
    translations,
  );
   
  export default I18n;