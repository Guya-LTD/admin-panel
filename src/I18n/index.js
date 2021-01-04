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
        'name_en': 'Name/EN',
        'name_am': 'Name/AM',
        'phone_number': 'Phone Number',
        'role': 'Role',
        'status': 'Status',
        'date': 'Date',
        'blocked': 'Blocked',
        'active': 'Active',
        'account': 'Account',
        'identity': 'Identity',
        'chat': 'Chat',
        'customer_support': 'Custommer Support',
        'online': 'Online',
        'ofline': 'Ofline',
        'branches': 'Branches',
        'open': 'Open',
        'closed': 'Closed',
        'company': 'Company',
        'branches_list': 'Branches List',
        'tracking': 'Tracking',
        'vehicle_tracking': 'Vehicle Tracking',
        'categories_list': 'Categories List',
        'facets': 'Facets',
        'categories': 'Categories',
        'permissions': 'Permissions',
        'variant_types': 'Variant types',
        'variant_types_list': 'Variant types list',
        'roles': 'Roles',
        'permissions_list': 'Permissions List',
        'key': 'Key',
        'create': 'Create',
        'read': 'Read',
        'write': 'Write',
        'delete': 'Delete',
        'true': 'True',
        'false': 'False',
        'uti': 'uti',
        'payments': 'Payments',
        'payments_list': 'Payments List',
        'invoice_number': 'Invoice Number',
        'transaction_id': 'Transaction Id',
        'transaction_date': 'Transaction Date',
        'transaction_medium': 'Transaction Medium',
        'email_status': 'Email Status',
        'approval_method': 'Approval Method',
        'pending': 'Pending',
        'sent': 'Sent',
        'failed': 'Failed',
        'transactions': 'Transactions',
        'transactions_list': 'Transactions List',
        'amount': 'Amount',
        'flag': 'Flag'
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
        'name_en': 'Name/EN',
        'name_am': 'Name/AM',
        'phone_number': 'ስልክ ቁጥር',
        'role': 'ሚና',
        'status': 'ሁኔታ',
        'date': 'ቀን',
        'blocked': 'ታግዷል',
        'active': 'ክፈት',
        'account': 'መለያ',
        'identity': 'መለያ',
        'chat': 'ቻት',
        'customer_support': 'የደንበኛ ድጋፍ',
        'online': 'Online',
        'ofline': 'Ofline',
        'branches': 'Branches',
        'open': 'Open',
        'closed': 'Closed',
        'company': 'Company',
        'branches_list': 'Branches List',
        'tracking': 'Tracking',
        'vehicle_tracking': 'Vehicle Tracking',
        'categories_list': 'Categories List',
        'facets': 'Facets',
        'categories': 'Categories',
        'permissions': 'Permissions',
        'variant_types': 'Variant types',
        'variant_types_list': 'Variant types list',
        'roles': 'Roles',
        'permissions_list': 'Permissions List',
        'key': 'Key',
        'create': 'Create',
        'read': 'Read',
        'write': 'Write',
        'delete': 'Delete',
        'true': 'True',
        'false': 'False',
        'uti': 'uti',
        'payments': 'Payments',
        'payments_list': 'Payments List',
        'invoice_number': 'Invoice Number',
        'transaction_id': 'Transaction Id',
        'transaction_date': 'Transaction Date',
        'transaction_medium': 'Transaction Medium',
        'email_status': 'Email Status',
        'approval_method': 'Approval Method',
        'pending': 'Pending',
        'sent': 'Sent',
        'failed': 'Failed',
        'transactions': 'Transactions',
        'transactions_list': 'Transactions List',
        'amount': 'Amount',
        'flag': 'Flag'
    }
}

const I18n = createI18n(
    locales,
    translations,
  );
   
  export default I18n;