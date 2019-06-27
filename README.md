# participant-visit-listing
The Participant Visit Listing is a JavaScript library that visualizes the schedule of events in a clinical trial for each participant.
Each participant's schedule of events displays horizontally in a matrix with one row per participant and one column per visit.
The visualization offers three views to aid in the detection of participant and site compliance issues:
## Visit Chart
Compact view that provides a quick overview of visit status, even when the number of visits is large.

![visit_chart](https://user-images.githubusercontent.com/26064686/60273476-344d3d80-98c4-11e9-9324-4efdaf63a971.gif)

## Study Day Chart
Displays the exact study day for each visit and allows for the inclusion of unscheduled visits. Makes identifying out of window visit trends easy.

![study_day_chart](https://user-images.githubusercontent.com/26064686/60273527-53e46600-98c4-11e9-87a1-c105a3d0f5ee.gif)

## Listing
In-depth and highly interactive, provides sorting, searching, and subsetting functionality.

![listing](https://user-images.githubusercontent.com/26064686/60273556-61015500-98c4-11e9-8b83-ded02bbc38c8.gif)

[Click here](https://rhoinc.github.io/participant-visit-listing/test-page/) to view an interactive demo.

## Usage
With a dataset that meets the [default variable requirements](https://github.com/RhoInc/participant-visit-listing/wiki/Data-Guidelines), the renderer can be initialized with the following code:

```javascript
d3.csv(
    'https://raw.githubusercontent.com/RhoInc/viz-library/master/data/dataCleaning/visits/dmv_Visits.csv',
    function(data) {
        participantVisitListing('body', settings).init(data);
    }
);
```

Download the [latest release](https://github.com/RhoInc/participant-visit-listing/releases/latest), which supports anonymous AMD, CommonJS, and vanilla environments.
You can also load the library directly from [jsDelivr](https://cdn.jsdelivr.net/npm/participant-visit-listing/participantVisitListing.js):
Import into a webpage like so:

```html
<script type = 'text/javascript' src = 'https://d3js.org/d3.v3.js'></script>
<script type = 'text/javascript' src = 'https://cdn.jsdelivr.net/npm/webcharts/build/webcharts.js'></script>
<script type = 'text/javascript' src = 'https://cdn.jsdelivr.net/npm/participant-visit-listing/participantVisitListing.js'></script>
```

Participant Visit Listing is a modular library written with [ECMAScript 2015 syntax (ES2015)](http://es6-features.org/).
To import Participant Visit Listing into an ES2015 application, import its only module (here, `participantVisitListing`):

```js
import participantVisitListing from "participant-visit-listing";
```

And in Node:

```js
var participantVisitListing = require("participant-visit-listing");
```

More information is available in the project's [wiki](https://github.com/RhoInc/participant-visit-listing/wiki).

## Links
* [Interactive Example](https://rhoinc.github.io/participant-visit-listing/test-page/)
* [API Reference](https://github.com/RhoInc/participant-visit-listing/wiki/API)
* [Configuration](https://github.com/RhoInc/participant-visit-listing/wiki/Configuration)
* [Data Guidelines](https://github.com/RhoInc/participant-visit-listing/wiki/Data-Guidelines)
* [Technical Documentation](https://github.com/RhoInc/participant-visit-listing/wiki/Technical-Documentation)
* [Release Notes](https://github.com/RhoInc/participant-visit-listing/releases)
