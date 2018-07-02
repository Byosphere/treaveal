import { COUNTRY_CODES } from '../Constants';

export function getCountryFromCountryCode(code) {
    let countryName = 'undefined';
    COUNTRY_CODES.forEach(c => {
        if (c.code === code) countryName = c.name;
    });
    return countryName;
}


export function getNavigatorLanguage(raw) {
    let language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
    if (language.length > 2 && !raw) {
        language = language.split("-")[0];
        language = language.split("_")[0];
    }

    return language;
}

export function daysBetween(date1, date2) {

    let ONE_DAY = 1000 * 60 * 60 * 24;
    let date1_ms = date1.getTime();
    let date2_ms = date2.getTime();

    let difference_ms = Math.abs(date1_ms - date2_ms);

    return Math.floor(difference_ms / ONE_DAY);

}

export function formatDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join('-');
}