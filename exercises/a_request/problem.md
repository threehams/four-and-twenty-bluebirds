Write a program that uses the 'request' library to do a GET call to the URL provided, and return the length of the response body.

----------------------------------------------------------------------
## HINTS

With a single request, what's the real difference between a promise and a callback?

Not much.

With a Node-style callback, you receive both error and response with a single function.
With promises, you're looking at two functions, one with an error, and one with a response.
With simple examples, this is actually less code than the corresponding promise.

Don't worry, we'll get to the good stuff as the examples become more complex.

----------------------------------------------------------------------
