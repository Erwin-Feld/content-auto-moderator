/* able to use async/await in parcel reason babel polyfill */
import 'regenerator-runtime/runtime'
import * as bootstrap from 'bootstrap'
import axios from "axios";


const urlNewsApi = "https://saurav.tech/NewsAPI/everything/fox-news.json";



async function fetchNewsArticles(url) {
    try {
      let res = await axios({
        url: url,
        method: "get",
        timeout: 8000,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        // test for status you want, etc
        // console.log(res.status)
      }
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }


  const promise = fetchNewsArticles(urlNewsApi);

  promise.then(data => {
      const {articles} = data
      console.log(articles);
  })




// import fetchNewsData from './fetchNewsData.json'


// import { fetchContent as fetchNewsArticles } from "./fetchContent";


// console.log(fetchNewsData)

// const {articles} = fetchNewsData;
// Add sentiment property

// const singleArticle = articles[3].content;
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



function displayNewsArticle(articles){
    const articelData = articles[3];
    console.log(articelData)
    const articel = `
    <div class="card bg-light">
        <div class="card-body text-center">
            <img src="${articelData.urlToImage}" alt="" class="card-img-top mb-1" />
            <h3 class="card-title mb-1">${articelData.title}</h3>
            <p class="card-text mb-1">${articelData.content}</p>
        </div>
    </div>
    `
   return document.querySelector(".container").innerHTML = articel;

}

function loopOver(articles){
    for(let articelData of articles){

        const parentContainer = document.querySelector(".container");

        parentContainer.innerHTML= "";

        const articel = `
        <div class="card bg-light">
            <div class="card-body text-center">
                <img src="${articelData.urlToImage}" alt="" class="card-img-top mb-1" />
                <h3 class="card-title mb-1">${articelData.title}</h3>
                <p class="card-text mb-1">${articelData.content}</p>
            </div>
        </div>
        `
        parentContainer.innerHTML = articel
        // setTimeout(() => {
        //     parentContainer.innerHTML = "";
        // }, 5000);

    }
}

// displayNewsArticle(articles)


/* console.log(singleArticle)
// import * as bootstrap from 'bootstrap'

// import { bigdik } from './testfunction';

// bigdik()

var sentimentAnalysis = require('sentiment');

var sentiment = new sentimentAnalysis();
var result = sentiment.analyze(singleArticle);
console.log(result);    // Score: -2, Comparative: -0.666


  */