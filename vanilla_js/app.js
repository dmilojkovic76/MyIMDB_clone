const OMDB_API_URL = 'http://www.omdbapi.com/?apikey=85055747&';

const searchForm = document.querySelector('form');
const searchBox = document.querySelector('#search_box');
const searchType = document.querySelector('#search-type');

function startTheSearch(e) {
	e.preventDefault();
	let param = 's';
	let type = '';
	if (searchType.value === 'titles') {
		param = 't';
		type = 'm';
	} else if (searchType.value === 'episode') {
		param = 't';
		type = 'episode';
	} else if (searchType.value === 'series') {
		param = 't';
		type = 'series';
	} else if (searchType.value === 'imdbs') {
		param = 'i';
		type = '';
	}
	const FULL_OMDB_URL = `${OMDB_API_URL}${param}='${searchBox.value}'&type=${type}`;
	console.log(FULL_OMDB_URL);
	fetch(FULL_OMDB_URL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error('Network response was not OK!');
		})
		.then((resp) => {
			const results = document.querySelector('#results');
			const data = JSON.stringify(resp);
			results.textContent = data;
		})
		.catch(err => console.error(err));
}

searchForm.addEventListener('submit', startTheSearch);
