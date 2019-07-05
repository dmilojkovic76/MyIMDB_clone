const OMDB_API_URL = 'http://www.omdbapi.com/?apikey=85055747&';

const h1 = document.querySelector('h1');
const searchForm = document.querySelector('form');

h1.textContent = `${h1.textContent} using Vanilla JS.`;

function startTheSearch(e) {
	e.preventDefault();
	console.log('Form Submitted!');
	console.log(searchForm.elements);
}

searchForm.addEventListener('submit', startTheSearch);