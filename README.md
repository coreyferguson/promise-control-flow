
# Promise Control Flow

## Overview

This repository serves as a playground and example of the [bluebird API](http://bluebirdjs.com/docs/api-reference.html) that control the flow of promises. This involves multiple promises that run in sequence vs. parallel. While specific to bluebird, these same concepts can be applied to other promise libraries.

For a more basic tutorial of promises, try the [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt) tutorial.

## Parallel vs. Sequence

**Parallel**

Promises are run in parallel when all run at the same time.

```javascript
Promise.all(arrayOfPromises).then(function(arrayOfPromiseResponses) {
  // ...
});
```

**Sequence**

Promises are run in sequence when only one runs at a time. This is necessary when:

- The response from one request is necessary as input to the next promise.

```javascript
getParent({id: 1}).then(function(parent) {
  return getChildren(parent);
}).then(function(children) {
  // ...
});
```

- The order in which *requests* are made is important.

```javascript
Promise.mapSeries(queue, function(queueItem) {
  return promiseFor(queueItem);
}).then(function(arrayOfQueueItemResponses) {
  // ...
});
```
## Try it out

**Setup**

```bash
git clone git@github.com:coreyferguson/promise-control-flow.git
cd promise-control-flow
npm install
```

**Testing**

Tests can be executed once by executing `grunt`. Tests can be continually run every time you save by executing `grunt watch`.

**Source**

Open [`src/promise-client.js`](./src/promise-client.js) in your favorite IDE. Follow the instructions in block comments above each function:

- resolveUpperCase
- join
- all
- map
- mapSeries
- promisify

*Note: These examples are completely arbitrary. Obviously, converting a name to lowercase is a synchronous operation. Also, there is no need to run any of these examples in sequence. The point is to learn the bluebird API.*
