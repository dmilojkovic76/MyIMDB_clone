# MyIMDb Clone

My clone of the popular **IMDb** movie database website using **OMDb** API.

There are more than one separate project inside:

- **omdb_vanilla_js** - The version using only vanilla JavaScript and OMDb
- **omdb_vue** - This version relies on VUE.js and OMDb
- **omdb_react** - This is React version with OBDb API of the above



For OMDb, use [this link](http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFgICBw8WAh4HVmlzaWJsZWhkAgIPFgIfAGhkAgMPFgIfAGhkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQtwYXRyZW9uQWNjdAUIZnJlZUFjY3QFCGZyZWVBY2N0x0euvR%2FzVv1jLU3mGetH4R3kWtYKWACCaYcfoP1IY8g%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAU5GG7XylwYou%2BzznFv7FbZmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulN6vYN8IikxxqwtGWTciOwQ4e4xie4N992dlfbpyqd1D&at=freeAcct&Email=) to get the API KEY

All data requests go to:
http://www.omdbapi.com/?apikey=[yourkey]&

There are two (2) types of requests that can be made to the API:

- By ID (__*i*__) or Title (__*t*__) - where parameters __*i*__ or __*t*__ must be set to IMDB ID or Movie title respectively.
- By Search (__*s*__) - where parameter __*s*__ must me set to a term to search for.

The return value asked for can be filtered by:

- __*type*__ : movie, series or episode
- __*y*__ : set this to year of release
- __*plot*__ : short or full - in case if __*i*__ or __*t*__ parametars were used
- __*page*__ : which page to return 1..100, defaults to **1** - in case if __*s*__ parameter was used