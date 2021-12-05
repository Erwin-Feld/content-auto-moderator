/* able to use async/await in parcel reason babel polyfill */
import "regenerator-runtime/runtime";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { async } from "regenerator-runtime";
// https://stackoverflow.com/questions/65800993/avoiding-the-import-regenerator-runtime-runtime
// Add delete runtime import

import sentimentAnalysis from "sentiment";

const urlNewsApi = "https://saurav.tech/NewsAPI/everything/fox-news.json";

/* start operation
do this with button click am bestem
header 

p tag with info 

*/
// init()
// workaorund parcel can not find onclick on html element
function getButton(){
  document.getElementById("start-sentiment").addEventListener("click",init)
}

getButton()


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
      // console.log(res.status)
    }
    return res.data;
  } catch (err) {
    console.error(err);
  }
}



async function init() {
  const apiData = await fetchNewsArticles(urlNewsApi);

  const articles = extractArticles(apiData);

  // console.log(articles[0].description)
  // console.log(articles[0].content)
  // console.log(articles[0])
  
  timeDelayedLoop(articles)
}


function extractArticles(apiData) {
  const { articles } = apiData;
  return articles;
}

function analyseSentiment(article) {
  //Add refine function

  // Add if not enough words for assomtion --> not enough data for sentiment analysis
  const sentiment = new sentimentAnalysis();
  const sentimentResult = sentiment.analyze(article.description);

  const {score} = sentimentResult
  console.log(sentimentResult)
  
  if(score >= 2) {
    return {...article,...{sentiment: "positiv"}}
  } else if (score >= 0) {
    return {...article,...{sentiment: "neutral"}}
  } else {
    return {...article,...{sentiment: "negative"}}
  }

}

function addArticels(article){
  const parentContainer = document.getElementById("articel-container");


  const articelComponent = `
  <div class="col-md-6 col-lg-3">
  <div class="card bg-light">
    <div class="card-body text-center">
      <img src="${article.urlToImage}" alt="" class="card-img-top mb-1" />
      <h3 class="card-title mb-1">${article.title}</h3>
      <p class="card-text mb-1">${article.content}</p>
      <p class="card-text mb-1">as ${article.sentiment}</p>
   
    </div>
  </div>
</div>
  `
  parentContainer.innerHTML += articelComponent;

}


function renderArticelSentiment(article) {
  // Add url 

  const parentContainer = document.getElementById("sentiment-analysis");
  parentContainer.innerHTML = "";

  // Add color span class="text-warning -- needs to change green red yellow

  const articelComponent = `
  <div class="card bg-light">
      <div class="card-body text-center">
          <img src="${article.urlToImage}" alt="" class="card-img-top mb-1" />
          <h3 class="card-title mb-1">${article.title}</h3>
          <p class="card-text mb-1">${article.content}</p>
        
          <p class="card-text mb-1">potential sentiment <span class="text-warning"> ${article.sentiment} </span> </p>
      </div>
  </div>
  `;
  parentContainer.innerHTML = articelComponent;
}


function renderArticelClean(article) {
  const parentContainer = document.getElementById("sentiment-analysis");
  const articelComponent = `
  <div class="card bg-light">
      <div class="card-body text-center">
          <img src="${article.urlToImage}" alt="" class="card-img-top mb-1" />
          <h3 class="card-title mb-1">${article.title}</h3>
          <p class="card-text mb-1">${article.content}</p>
      </div>
  </div>
  `;
  parentContainer.innerHTML = articelComponent;
}



function timeDelayedLoop(articles) {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  async function load() {
    // Add limit

    /* articels with added sentiment */
   
    for (let article of articles) {
     
      renderArticelClean(article)
      
      await timer(1500); 
      const sentimentArticel = analyseSentiment(article);
      renderArticelSentiment(sentimentArticel)
   
      await timer(3000);

      if(sentimentArticel.sentiment !== "negative"){
        addArticels(sentimentArticel)
      }
      
    }
  }
  load();
}


