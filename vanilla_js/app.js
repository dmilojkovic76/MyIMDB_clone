const OMDB_API_URL = 'http://www.omdbapi.com/?apikey=85055747&';

const searchForm = document.querySelector('form');
const searchBox = document.querySelector('#search_box')

let loading = false;

function startTheSearch(e) {
	loading = true;
	e.preventDefault();
	fetch(`${OMDB_API_URL}t=${searchBox.value}`)
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
		for (const r in data) {
			console.log(r);
		}
	})
	.catch(err => console.error(err));
	loading = false;
}

searchForm.addEventListener('submit', startTheSearch);