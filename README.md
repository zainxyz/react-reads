# MyReads Library

[https://zainxyz.github.io/react-reads/](https://zainxyz.github.io/react-reads/)

A MyReads Books Library, which categorizes a group of selected books via 3 distinct bookshelves:
1. Currently Enjoy Reading
2. Want to Read
3. Already Read

----

Each book has a set of controls that allow the user to move the book to a different bookshelf. If you would like to view more details about the book, click the `View Details` link underneath each of the books in the bookshelf.

NOTE: The **View Details** page will take you back to the homepage.

---

There is an available `/search` page, where you can search for a particular book and add it to your Library, on one of the available bookshelves off course. Access this page by clicking on the search icon towards the bottom right of the browser's window.

---

## Installation

````javascript
$ git clone git@github.com:zainxyz/react-reads.git
````

## Running app for development

````javascript
$ npm i && npm start
````

`npm start` will fire up the react-scripts server (with auto compile / reload)

## Bundling it up for Production

````javascript
$ npm run build
````

## Running Unit Tests

````javascript
$ npm test
````

## Linting

````javascript
$ npm run lint
````

## Building Documentation

````javascript
$ npm i -g documentation
````

Then build the documentation via: `documentation build src/** -f html -o docs` command.

## Allowed Search Terms

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## License and Use

Please read [LICENSE](LICENSE)

## Contributing

For details, check out [CONTRIBUTING](CONTRIBUTING.md)