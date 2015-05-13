Write a program that accepts 'url' and 'cache' arguments. If cache is available, use it. If not, make an HTTP request.
In both cases, parses the JSON contained within, and return the value of the 'message' key.

Throw an error with the message 'Message is missing' if the message does not exist (empty strings are OK).

----------------------------------------------------------------------
## HINTS

So far, there may not seem to be much of a difference between callbacks and promises, besides the lack of:

    if (err) return callback(err);

...but the real power in promises is their ability to unify the handling of sync or async values and errors.

### STARTING THE CHAIN

When mixing sync/async in a function, it's important to start a promise chain. One way to do this is with Promise.try().

    Promise.try(function() {
      if (!arg1) throw new Error('missing argument');
      return arg1.key;
    }

Bluebird also supplies the Promise constructor and Promise.method, depending on cirumstances. Learn more at:
https://github.com/petkaantonov/bluebird/blob/master/API.md

### SYNC/ASYNC

Within a handler (the function within try(), then(), or any other Bluebird-provided method), you can just use return
statements as if your code were synchronous! If you return a value, it will be available in the next handler - if you
return a promise, its return value will be available once the promise is resolved. That's it!

    Promise.try(function() {
      if (config) return config;
      return fs.readFileAsync('./config');
    }).then(function(config) {
      // config is either the value of the immediately-returned config variable, or the contents of the file
    });

### THROWING ERRORS

Promises are *throw-safe*. Callbacks for async calls are not. To demonstrate:

    try {
      request(url, function(err, request, body) {
        if (err) return callback(err);
        if (!JSON.parse(body).message) throw new Error('No message found');
      }
    } catch(err) {
      console.log(err);
    }

The error thrown within the callback will not be caught, and will crash the entire process. For more details on why this
happens: https://strongloop.com/strongblog/comparing-node-js-promises-trycatch-zone-js-angular/

The same code, using Bluebird:

    return requestAsync(request, body).spread(function(request, body) {
      if (!JSON.parse(body).message) throw new Error('No message found');
    }).catch(function(err) {
      console.log(err);
    });

The error will be caught in the 'catch' handler as a rejection. This works for any length of promise chain - and nested
promises, too! More on this last bit in a later chapter.

----------------------------------------------------------------------
