const OMDB_API_URL = 'http://www.omdbapi.com/?apikey=85055747&';

const searchForm = document.querySelector('form');
const searchBox = document.querySelector('#search-box');
const searchType = document.querySelector('#search-type');
const resultsDiv = document.querySelector('#results');
const realtimeSearchDiv = document.querySelector('#realtime-search');

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

function buildURL() {
	const params = checkSearchType(searchType.value);
	return `${OMDB_API_URL}${params.param}='${searchBox.value}'&type=${params.type}`;
}

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

function realtimeSearch(e) {
	console.log('realtimeSearch Started');
	const FULL_OMDB_URL = buildURL();

	fetch(FULL_OMDB_URL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error('Network response was not OK!');
		})
		.then((resp) => {
			if (resp.Response) {
				realtimeSearchDiv.classList.toggle('hidden');
				realtimeSearchDiv.innerText = '';
				realtimeSearchDiv.appendChild(createElement('h2', `Number of results: ${resp.totalResults}`));
			} else {
				realtimeSearchDiv.classList.toggle('hidden');
			}
		})
		.catch(err => console.error(err));
}

function startTheSearch(e) {
	e.preventDefault();
	const FULL_OMDB_URL = buildURL();

	fetch(FULL_OMDB_URL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error('Network response was not OK!');
		})
		.then((resp) => {
			if (resp.Response) {
				resultsDiv.innerText = '';
				resultsDiv.style.visibility = 'visible';
				resultsDiv.appendChild(createElement('h2', `Number of results: ${resp.totalResults}`));

				resultsDiv.appendChild(createElement('div', 'movie-results'));
				const movieResults = document.querySelector('.movie-results');
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

searchBox.addEventListener('keydown', realtimeSearch);
searchForm.addEventListener('submit', startTheSearch);
