import * as dotenv from 'dotenv'
dotenv.config()

declare global {
	// attributes
	var TOKEN: string
	var API_URL: string
	var MAPS_ID: string
	var GOOGLE_MAPS_APIKEY: string
	var constants: any
	var maps: any
	var credentials: any

	// getters
	function getToken(): string
	function getMapsId(): string
	function getMapsToken(): string
	function getApiUrl(): string

	// setters
	function setToken(token: string): void
	function setMapsId(id: string): void
	function setMapsToken(token: string): void
	function setApiUrl(url: string): void

	// functions
	function init(): void

	// interfaces
	interface IMaps {
		id: string
		token: string
	}

	interface ICredentials {
		token: string
		api_url: string
		maps: IMaps
	}

	interface IConstants {
		credentials: ICredentials
	}

	interface IGlobal extends Global {
		constants: IConstants
		credentials: ICredentials
		maps: IMaps
	}
}

// atributos
global.API_URL = process.env.URL || 'http://127.0.0.1:8000'
global.MAPS_ID = process.env.MAPS_ID || 'google-map-script'
global.GOOGLE_MAPS_APIKEY =
	process.env.GOOGLE_MAPS_TOKEN || 'AIzaSyCmrE9qeUQP20VEA6AT53UKRDNqbywCvYw'
global.TOKEN = 'token123'

// getters
global.getToken = () => global.TOKEN
global.getMapsId = () => global.MAPS_ID
global.getMapsToken = () => global.GOOGLE_MAPS_APIKEY
global.getApiUrl = () => global.API_URL

// setters
global.setToken = (token: string) => (global.TOKEN = token)
global.setMapsId = (id: string) => (global.MAPS_ID = id)
global.setMapsToken = (token: string) => (global.GOOGLE_MAPS_APIKEY = token)
global.setApiUrl = (url: string) => (global.API_URL = url)

/* let creds: ICredentials = {
	token: global.TOKEN,
	api_url: global.API_URL,
	maps: {
		id: global.MAPS_ID,
		token: global.GOOGLE_MAPS_APIKEY,
	},
}

let map: IMaps = {
	id: global.MAPS_ID,
	token: global.GOOGLE_MAPS_APIKEY,
}

let consts: IConstants = {
	credentials,
}

global.constants = consts
global.credentials = creds
global.maps = map

// functions
global.init = () => {
	global.credentials = {
		token: global.getToken(),
		api_url: global.getApiUrl(),
		maps: {
			id: global.getMapsId(),
			token: global.getMapsToken(),
		},
	}
} */

// set global variables
global.setToken('token123')
global.setApiUrl('http://http://127.0.0.1:8000')
global.setMapsId('google-map-script')
global.setMapsToken('AIzaSyCmrE9qeUQP20VEA6AT53UKRDNqbywCvYw')