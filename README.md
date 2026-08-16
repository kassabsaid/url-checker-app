# url-checker-app
A simple browser application to validate and check URLs

## Features
- Real-time URL format validation using the native `URL` constructor
- Mock asynchronous server to simulate network latency.
- Determines whether a valid URL points to a 'File' or a 'Directory' based on extensions
- Throttles server requests using a `debounce` function (500ms) to avoid API flooding while the user is typing

## Tech Stack
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3 (Custom Properties, Flexbox)

## How to run
Simply open `index.html` in any modern web browser. No build steps, dependencies, or local servers are required

## Development Time
The development of this task took approximately 1.5 hours