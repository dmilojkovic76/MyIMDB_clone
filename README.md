My IMDB clone of the popular IMDB movie database website using OMDB API.

There are more than one project inside:

- vanilla_js - The version using only vanilla JavaScript and OMDB
- vue_js - This version relies on VUE.js and OMDB



For OMDB, use [this link](http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFgICBw8WAh4HVmlzaWJsZWhkAgIPFgIfAGhkAgMPFgIfAGhkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQtwYXRyZW9uQWNjdAUIZnJlZUFjY3QFCGZyZWVBY2N0x0euvR%2FzVv1jLU3mGetH4R3kWtYKWACCaYcfoP1IY8g%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAU5GG7XylwYou%2BzznFv7FbZmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulN6vYN8IikxxqwtGWTciOwQ4e4xie4N992dlfbpyqd1D&at=freeAcct&Email=) to get the API KEY

All data requests go to:
http://www.omdbapi.com/?apikey=[yourkey]&

There are two (2) types of requests than be mabe to the API:

- By ID or Title - where parameters _i_ or _t_ must me set to IMDB ID or Movie title to search for.
- By Search - where parameter _s_ must me set to a term to search for.

The return value asked for can be filtered by:

- type : movie, series or episode
- y : set this to year of release
- plot : short or full - in case if _i_ or _t_ parametars were used
- page : which page to return 1..100, defaults to 1 - in case if _s_ parameter was used