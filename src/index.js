// import * as bootstrap from 'bootstrap'

import { bigdik } from './testfunction';

bigdik()

var sentimentAnalysis = require('sentiment');

var sentiment = new sentimentAnalysis();
var result = sentiment.analyze('Cats are stupid.');
console.log(result);    // Score: -2, Comparative: -0.666


 