# participant-visit-listing
The Participant Visit Listing is a JavaScript library that visualizes the schedule of events in a clinical trial for each participant.
Each participant's schedule of events displays horizontally in a matrix with one row per participant and one column per visit.
The visualization makes the detection of participant and site compliance evident via color-coded visit cells:

![alt tag](https://user-images.githubusercontent.com/5428548/47172028-5247b480-d2d8-11e8-8e40-47e8ce4cf848.png)

[Click here](https://rhoinc.github.io/participant-visit-listing/test-page/) to view an interactive demo.

## Usage
Download the [latest release](https://github.com/RhoInc/participant-visit-listing/releases/latest), which supports anonymous AMD, CommonJS, and vanilla JavaScript environments.
You can also load the library directly from [rawgit](https://cdn.rawgit.com/RhoInc/participant-visit-listing/master/participantVisitListing.js):

```html
<script type = 'text/javascript' src = 'https://d3js.org/d3.v3.js'></script>
<script type = 'text/javascript' src = 'https://cdn.rawgit.com/RhoInc/Webcharts/master/build/webcharts.js'></script>
<script type = 'text/javascript' src = 'https://cdn.rawgit.com/RhoInc/participant-visit-listing/master/participantVisitListing.js'></script>
```

Participant Visit Listing is a modular library written with [ECMAScript 2015 syntax (ES2015)](http://es6-features.org/).
To import Participant Visit Listing into an ES2015 application, import its only module (here, `participantVisitListing`):

```js
import participantVisitListing from 'participant-visit-listing';
```

In Node:

```js
var participantVisitListing = require('participant-visit-listing');
```
## Links
More information is available in the project's [wiki](https://github.com/RhoInc/participant-visit-listing/wiki): 

* [Data Guidelines](https://github.com/RhoInc/participant-visit-listing/wiki/Data-Guidelines)
* [API Reference](https://github.com/RhoInc/participant-visit-listing/wiki/API)
* [Release Notes](https://github.com/RhoInc/participant-visit-listing/releases)
