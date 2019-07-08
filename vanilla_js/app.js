const OMDB_API_URL = 'http://www.omdbapi.com/?apikey=85055747&';

const searchForm = document.querySelector('form');
const searchBox = document.querySelector('#search_box');
const searchType = document.querySelector('#search-type');
const results = document.querySelector('#results');

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

function createElement(elem, content, src) {
	const element = document.createElement(elem);
	if (elem === 'img') {
		element.setAttribute('src', src);
		element.setAttribute('alt', content);
		element.setAttribute('width', '200px');
		element.setAttribute('height', '300px');
	} else if (elem === 'div') {
		element.classList.add(content);
		(src) ? element.id = src : src;
	} else {
		element.innerText = content;
	}
	return element;
}

function startTheSearch(e) {
	e.preventDefault();
	const params = checkSearchType(searchType.value);
	const FULL_OMDB_URL = `${OMDB_API_URL}${params.param}='${searchBox.value}'&type=${params.type}`;

	fetch(FULL_OMDB_URL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error('Network response was not OK!');
		})
		.then((resp) => {
			if (resp.Response) {
				results.innerText = '';
				results.style.visibility = 'visible';
				results.appendChild(createElement('h2', `Number of results: ${resp.totalResults}`));

				results.appendChild(createElement('div', 'movie-results'));
				const movieResults = document.querySelector('.movie-results');
				let i = 0;
				resp.Search.forEach((movie) => {
					movieResults.appendChild(createElement('div', `movie-result`, `movie-result-${i}`));
					const movieResult = document.querySelector(`#movie-result-${i}`);
					movieResult.appendChild(createElement('img', movie.Title, movie.Poster));
					movieResult.appendChild(createElement('p', movie.Title));
					i += 1;
				});
			}
		})
		.catch(err => console.error(err));
}

searchForm.addEventListener('submit', startTheSearch);
