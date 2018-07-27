'use strict';

export const SET_TRAVEL_INFO = "set_info";
export const SET_HOTEL = "set_hotel";
export const SET_DAY = "set_day";
export const SET_CURRENT_DAY = "set_current_day";
export const DELETE_TRAVEL = "delete_travel";
export const DELETE_DAY = "delete_day";
export const SET_NOTES = "set_notes";
export const SET_EVENT = "set_event";
export const EVENT_ACTIVITY = "event_activity";
export const EVENT_TEXT = "event_text";
export const EVENT_TRANSPORT = "event_transport";
export const TOGGLE_NOTES = 'toggle_notes';

export const COUNTRY_CODES = require(`./data/country-codes.json`);
export const HOTEL_TYPES = [
	{ id: 1, codename: "hotel", translationKey: "hotel-type" },
	{ id: 2, codename: "Auberge de Jeunesse", translationKey: "youth-type" },
	{ id: 3, codename: "Appartement", translationKey: "appart-type" },
	{ id: 4, codename: "Maison d'hôte", translationKey: "host-type" },
	{ id: 5, codename: "Chez l'habitant", translationKey: "home-type" },
	{ id: 6, codename: "Villa", translationKey: "villa-type" },
	{ id: 7, codename: "Gite", translationKey: "gite-type" },
	{ id: 8, codename: "Hotel capsule", translationKey: "caps-type" },
]