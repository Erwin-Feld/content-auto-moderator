/* able to use async/await in parcel reason babel polyfill */
import "regenerator-runtime/runtime";
import * as bootstrap from "bootstrap";

import axios from "axios";
// https://stackoverflow.com/questions/65800993/avoiding-the-import-regenerator-runtime-runtime
// Add delete runtime import

import sentimentAnalysis from "sentiment";

const urlNewsApi = "https://saurav.tech/NewsAPI/everything/fox-news.json";


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
  
  if(score >= 2) {
    return {...article,...{sentiment: "positiv"}}
  } else if (score >= 0) {
    return {...article,...{sentiment: "neutral"}}
  } else {
    return {...article,...{sentiment: "negative"}}
  }

}

function addFilteredArticels(article){
  const parentContainer = document.getElementById("articel-container");
  const header = document.getElementById("filtered-articels");
  header.classList.remove('invisible');

  const articelComponent = `
  <div class="col-md-6 col-lg-3">
    <div class="card ">
      <div class="card-body ">
      <h5 class="card-title">${article.title}</h5>
      <img src="${article.urlToImage}" alt="" class="card-img-top mb-1" />
      <p class="card-text">${article.content}
      <a class="text-info" target="_blank" rel="noopener noreferrer" href="${article.url}" >read on...</a>
      </p>
      
    </div>
  </div>
</div>
  `
  parentContainer.innerHTML += articelComponent;

}


function renderArticelWithSentiment(article) {

  const parentContainer = document.getElementById("sentiment-analysis");
  parentContainer.innerHTML = "";

  let sentimentOutcome = ""
  if(article.sentiment === "negative") {
    sentimentOutcome = "text-danger" /* red color of text */
  } else if (article.sentiment === "neutral"){
    sentimentOutcome = "text-info" /* gray color of text */
  } else {
    sentimentOutcome = "text-success" /* red color of text */
  }

  // Add color span class="text-warning -- needs to change green red yellow
  // <p class="card-text mb-1">potential sentiment <span class="text-warning"> ${article.sentiment} </span> </p>

  const articelComponent = `
  <div class="card w-75">
    <div class="card-body">
      <h5 class="card-title">${article.title}</h5>
      <img src="${article.urlToImage}" alt="" class="card-img-top mb-1" />
      <p class="card-text">${article.description}</p>
      <p class="card-text mb-1">sentiment <span class="${sentimentOutcome} fw-bold"> ${article.sentiment} </span> </p>
    </div>
  </div>
  `;
  parentContainer.innerHTML = articelComponent;
}


function renderArticel(article) {
  const parentContainer = document.getElementById("sentiment-analysis");
  const articelComponent = `
  <div class="card w-75">
      <div class="card-body">
          <h5 class="card-title">${article.title}</h5>
          <img src="${article.urlToImage}" alt="" class="card-img-top mb-1" />
          <p class="card-text">${article.description}</p>
      </div>
  </div>
  `;
  parentContainer.innerHTML = articelComponent;
}



function timeDelayedLoop(articles) {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  async function load() {
   
    for (let article of articles) {
     
      renderArticel(article)
      
      await timer(1500); 
      const sentimentArticel = analyseSentiment(article);
      renderArticelWithSentiment(sentimentArticel)
      await timer(3000);

      if(sentimentArticel.sentiment !== "negative"){
        addFilteredArticels(sentimentArticel)
      }
      
    }
  }
  load();
}


