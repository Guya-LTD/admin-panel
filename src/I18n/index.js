import { createI18n } from 'react-router-i18n';

import appEn from './en/app';
import appAm from './am/app';
import credentialEn from './en/credential';
import credentialAm from './am/credential';
import formEn from './en/form';
import formAm from './am/form';
import httpEn from './en/http';
import httpAm from './am/http';
import authEn from './en/auth';
import authAm from './am/auth';
import menuEn from './en/menu';
import menuAm from './am/menu';

// Array of supported locales
// The first in the array is treated as the default locale
const locales = ['en', 'am'];

const translations = {
    en: {
        app: appEn,
        credential: credentialEn,
        form: formEn,
        http: httpEn,
        auth: authEn,
        menu: menuEn,
        'reviews': 'Reviews',
        'logout': 'Logout',
        'users_list': 'Users List',
        'users': 'Users',
        'email': 'Email',
        'name': 'Name',
        'phone_number': 'Phone Number',
        'role': 'Role',
        'status': 'Status',
        'date': 'Date',
        'blocked': 'Blocked',
        'active': 'Active',
        'account': 'Account',
        'identity': 'Identity'
    },
    am: {
        app: appAm,
        credential: credentialAm,
        form: formAm,
        http: httpAm,
        auth: authAm,
        menu: menuAm,
        'reviews': 'ግምገማዎች',
        'logout': 'ውጣ',
        'users_list': 'የተጠቃሚዎች ዝርዝር',
        'users': 'ተጠቃሚዎች',
        'email': 'ኢሜል',
        'name': 'ስም',
        'phone_number': 'ስልክ ቁጥር',
        'role': 'ሚና',
        'status': 'ሁኔታ',
        'date': 'ቀን',
        'blocked': 'ታግዷል',
        'active': 'ክፈት',
        'account': 'መለያ',
        'identity': 'መለያ'
    }
}

const I18n = createI18n(
    locales,
    translations,
  );
   
  export default I18n;