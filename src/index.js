/* able to use async/await in parcel reason babel polyfill */
import 'regenerator-runtime/runtime'

import { fetchContent } from "./fetchContent";


import fetchNewsData from './fetchNewsData.json'

// console.log(fetchNewsData)

const {articles} = fetchNewsData;

const singleArticle = articles[3].content;
// fetchContent()

/* for i of articles
    single articel

    display stuff in card

    add property sentiment

    function add on return

    toxic
    neutral
    positive

*/


console.log(singleArticle)
// import * as bootstrap from 'bootstrap'

// import { bigdik } from './testfunction';

// bigdik()

var sentimentAnalysis = require('sentiment');

var sentiment = new sentimentAnalysis();
var result = sentiment.analyze(singleArticle);
console.log(result);    // Score: -2, Comparative: -0.666


 