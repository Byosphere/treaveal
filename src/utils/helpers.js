import { COUNTRY_CODES } from '../Constants';

export function getCountryFromCountryCode(code) {
    let countryName = 'undefined';
    COUNTRY_CODES.forEach(c => {
        if (c.code === code) countryName = c.name;
    });
    return countryName;
}


export function getNavigatorLanguage() {
    let language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
    if (language.length > 2) {
        language = language.split("-")[0];
        language = language.split("_")[0];
    }

    return language;
}