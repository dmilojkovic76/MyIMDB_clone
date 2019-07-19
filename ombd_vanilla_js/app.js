const OMDB_API_URL = 'http://www.omdbapi.com/?apikey=85055747&';

const searchForm = document.querySelector('form');
const searchBox = document.querySelector('#search-box');
const searchType = document.querySelector('#search-type');
const resultsDiv = document.querySelector('#results');
const realtimeSearchDiv = document.querySelector('#realtime-search');
// const moviesTvEpisodes = document.querySelector('#movies-tv-episodes');
// const celebsEventsPhotos = document.querySelector('#celebs-events-photos');
// const newsCommunity = document.querySelector('#news-community');
// const watchlist = document.querySelector('#watchlist');
// const dropdown1 = document.querySelector('.nav-drop-1');
// const dropdown2 = document.querySelector('.nav-drop-2');
// const dropdown3 = document.querySelector('.nav-drop-3');
// const dropdown4 = document.querySelector('.nav-drop-4');


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

// Build the url to fetch from API based on the input of the user
function buildURL() {
	const params = checkSearchType(searchType.value);
	return `${OMDB_API_URL}${params.param}='${searchBox.value}'&type=${params.type}`;
}

// Create the specified DOM element with the passed in parammeters
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

// function hideDropdown(e) {
// 	// if the mouse is out of the bounds of the src element hide the child
// 	// but also check if it is out of childs bounds
// 	e.srcElement.children[1].style.visibility = 'hidden';
// }

// function showDropdown(e) {
// 	e.srcElement.children[1].style.visibility = 'visible';
// }

// This fires whenever the user types something in the search box
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

// This fires when a user has committed the search either by clicking on a search button,
// or by pressing enter/return key
function startTheSearch(e) {
	e.preventDefault();
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
				// clear the results container, show it...
				resultsDiv.innerText = '';
				resultsDiv.style.visibility = 'visible';

				// then hide and clear realtime search container...
				realtimeSearchDiv.classList.add('hidden');
				realtimeSearchDiv.classList.remove('visible');
				realtimeSearchDiv.innerText = '';

				// and start filling in the results container with the data:
				// create the header with info
				resultsDiv.appendChild(createElement('h3', `Number of results: ${resp.totalResults}`));
				// create the div for movie results...
				resultsDiv.appendChild(createElement('div', 'movie-results'));
				const movieResults = document.querySelector('.movie-results');

				// loop through the list of results and for each movie create a div and populate with data.
				let i = 0;
				resp.Search.forEach((movie) => {
					movieResults.appendChild(createElement('div', 'movie-result', `movie-result-${i}`));
					const movieResult = document.querySelector(`#movie-result-${i}`);
					movieResult.appendChild(createElement('img', movie.Title, movie.Poster));
					movieResult.appendChild(createElement('p', movie.Title));
					i += 1;
				});
			}
		})
		.catch(err => console.error(err));
}

searchBox.addEventListener('input', realtimeSearch);
searchForm.addEventListener('submit', startTheSearch);

// moviesTvEpisodes.addEventListener('mouseover', showDropdown);
// moviesTvEpisodes.addEventListener('mouseout', hideDropdown);

// celebsEventsPhotos.addEventListener('mouseover', showDropdown);
// celebsEventsPhotos.addEventListener('mouseout', hideDropdown);

// newsCommunity.addEventListener('mouseover', showDropdown);
// newsCommunity.addEventListener('mouseout', hideDropdown);

// watchlist.addEventListener('mouseover', showDropdown);
// watchlist.addEventListener('mouseout', hideDropdown);
