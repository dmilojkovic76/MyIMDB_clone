/**
 * The URL prefix of the API endpoint with the API key generated for this purpsoe
 * @const {string}
 */
const OMDB_API_URL = 'http://www.omdbapi.com/?apikey=85055747&';

// Constants for storing the references to DOM elements I'll need later
const searchForm = document.querySelector('form');
const searchBox = document.querySelector('#search-box');
const searchType = document.querySelector('#search-type');
const resultsDiv = document.querySelector('#results');
const realtimeSearchDiv = document.querySelector('#realtime-search');

/**
 * Return the string value of available search types in OMDb's API
 * based on the string that was passed in as an argument.
 * @param {string} value
 * @example
 * // returns {'param' : 't', 'type' : 'm'}
 * checkSearchType('titles');
 * @returns {Object} Object with 2 keys 'Param' and 'Type' { 'param': 't | i | s', 'type': 'm | episode | series | imdbs | ""' }
 */
function checkSearchType(value) {
	const obj = {};
	if (value === 'titles') {
		obj.param = 't';
		obj.type = 'm';
	} else if (value === 'episode') {
		obj.param = 't';
		obj.type = 'episode';
	} else if (value === 'series') {
		obj.param = 't';
		obj.type = 'series';
	} else if (value === 'imdbs') {
		obj.param = 'i';
		obj.type = '';
	} else {
		obj.param = 's';
		obj.type = '';
	}
	return obj;
}

/** Return the URL of the OMDb API endpoint to fetch from - based on users input */
function buildURL() {
	const params = checkSearchType(searchType.value);
	return `${OMDB_API_URL}${params.param}=${searchBox.value}&type=${params.type}`;
}

/** Return the URL of the OMDb API endpoint to fetch the random title - based on IMDb IDs */
function buildRandomURL() {
	const randomID = `tt0${Math.floor(Math.random() * 1000000)}`;
	return `${OMDB_API_URL}i=${randomID}`;
}

/**
 * 1. Fetch the random title from the OMDb API.
 * 2. Create DOM elements and display fetched data on the page.
 */
function loadRandomMovieDropdown() {
	const randomMovieImg = document.querySelector('#random-movie-img');
	const randomMovieTitle = document.querySelector('#random-movie-title');
	const randomMOvieRating = document.querySelector('#random-movie-rating');
	const RANDOM_URL = buildRandomURL();
	fetch(RANDOM_URL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error('Network response was not OK');
		})
		.then((resp) => {
			fetch(resp.Poster, { mode: 'cors' })
				.then((poster) => {
					if (poster.ok) {
						randomMovieImg.setAttribute('src', poster.url);
						randomMovieImg.setAttribute('alt', resp.Title);
					} else randomMovieImg.alt = 'NO Image!';
				})
				.catch((errorPoster) => {
					randomMovieImg.alt = 'IMDb Restricted Image!';
					console.error(errorPoster);
				});
			randomMovieTitle.innerText = resp.Title;
			randomMovieTitle.setAttribute('Title', resp.Title);
			randomMovieTitle.setAttribute('onClick', `startTheSearch(null, "${RANDOM_URL}");return false;`);
			randomMOvieRating.innerText = `IMDb rating: ${resp.imdbRating}/10 from ${resp.imdbVotes} IMDb user votes`;
			randomMOvieRating.setAttribute('Title', resp.Title);
			randomMOvieRating.setAttribute('onClick', `startTheSearch(null, "${RANDOM_URL}");return false;`);
		})
		.catch(err => console.error('An error occured: ', err));
}

/**
 * Return the DOM element with the passed in parammeters.
 * @param {string} elem HTML element to be created.
 * @param {string} content Depending on elem, this will either be img alt text, div classname or text to render on the page.
 * @param {string} src Depending on elem, this will either be img src attribute or div id.
 * @returns {DOMelement} DOM element
 */
function createElement(elem, content, src) {
	const element = document.createElement(elem);
	if (elem === 'img') {
		element.setAttribute('src', src);
		element.setAttribute('alt', content);
		element.setAttribute('width', '200px');
		element.setAttribute('height', '300px');
	} else if (elem === 'div') {
		element.classList.add(content);
		// eslint-disable-next-line no-unused-expressions
		(src) ? element.id = src : src;
	} else {
		element.innerText = content;
	}
	return element;
}

/**
 * This gets called whenever the user types something in the search box
 * to update the DOM accordingly by creating elements on the page.
 * @param {event} e Object of the caller event
 */
function realtimeSearch(e) {
	const FULL_OMDB_URL = buildURL();

	fetch(FULL_OMDB_URL)
		.then((res) => {
			// check if the call was good and pass on the data
			if (res.ok) {
				return res.json();
			}
			// or throw an error
			throw new Error('Network response was not OK!');
		})
		.then((resp) => {
			// The response was OK so check for results
			if (resp.Response === 'True') {
				// The search results came back so
				// clear the realtime results container, show it...
				realtimeSearchDiv.innerText = '';
				realtimeSearchDiv.classList.remove('hidden');
				realtimeSearchDiv.classList.add('visible');

				// and start filling in the realtime results container with the data:
				// create the header with info
				realtimeSearchDiv.appendChild(createElement('h3', `Number of results: ${resp.totalResults}`));
			} else if (resp.Response === 'False') {
				// There are no search results so hide the realtime search container
				realtimeSearchDiv.classList.add('hidden');
				realtimeSearchDiv.classList.remove('visible');
			}
		})
		.catch(err => console.error(`Event ${e} caused an error`, err));
}

/**
 * This fires when a user has committed the search either by clicking on a search button,
 * or by pressing enter/return key.
 * @param {event} e Object of the caller event.
 * @param {string} value (optional) The full OMDb APIs enpoint URL to fetch.
 */
function startTheSearch(e, value) {
	if (e) e.preventDefault();
	console.log(e);

	const FULL_OMDB_URL = value || buildURL();

	fetch(FULL_OMDB_URL)
		.then((res) => {
			// check if the call was good and pass on the data
			if (res.ok) {
				return res.json();
			}
			// or throw an error
			throw new Error('Network response was not OK!');
		})
		.then((resp) => {
			// The response was OK so check for results
			if (resp.Response === 'True') {
				// The search results came back so
				// clear the results container, show it...
				resultsDiv.innerText = '';
				resultsDiv.style.visibility = 'visible';

				// then hide and clear realtime search container...
				realtimeSearchDiv.classList.add('hidden');
				realtimeSearchDiv.classList.remove('visible');
				realtimeSearchDiv.innerText = '';

				// and start filling in the results container with the data:
				// create the header with info
				if (resp.totalResults) {
					resultsDiv.appendChild(createElement('h3', `Number of results: ${resp.totalResults}`));
				}
				// create the div for movie results...
				resultsDiv.appendChild(createElement('div', 'movie-results'));
				const movieResults = document.querySelector('.movie-results');

				if (resp.Search) {
					// loop through results and for each movie - create a div and populate it with data.
					let i = 0;
					resp.Search.forEach((movie) => {
						movieResults.appendChild(createElement('div', 'movie-result', `movie-result-${i}`));
						const movieResult = document.querySelector(`#movie-result-${i}`);
						movieResult.appendChild(createElement('img', movie.Title, movie.Poster));
						movieResult.appendChild(createElement('p', movie.Title));
						i += 1;
					});
				} else {
					movieResults.appendChild(createElement('div', 'movie-result', 'movie-result'));
					const movieResult = document.querySelector('#movie-result');
					movieResult.appendChild(createElement('img', resp.Title, resp.Poster));
					movieResult.appendChild(createElement('p', resp.Title));
				}
			}
		})
		.catch(err => console.error(err));
}

// Whenever a change is made inside the Search input box on a page
searchBox.addEventListener('input', realtimeSearch);

// When a user has submitted the search request
searchForm.addEventListener('submit', startTheSearch);

// When the page fully loads, populate the first dropdown menu with the random movie
document.addEventListener('DOMContentLoaded', loadRandomMovieDropdown);
