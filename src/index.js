/* able to use async/await in parcel reason babel polyfill */
import "regenerator-runtime/runtime";
import * as bootstrap from "bootstrap";
import axios from "axios";
import { async } from "regenerator-runtime";

import sentimentAnalysis from 'sentiment'

// const sentimentAnalysis = require('sentiment');


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
    //   Add dummy data if failed
    // return dummy data
  }
}


sentimentArticel()

async function init() {
  const apiData = await fetchNewsArticles(urlNewsApi);

  const articles = extractArticles(apiData);


/* time loop  */



/*  for i of articles */
// Add limit 

  // display article 
  // sentiment analize
  // display sentiment result display all 

 renderArticel(articles)
}

// sentiment change data --> new data add data to that new one
// render articel 

// 

// 

// init();

/* loop over articles and display them after 5 sec delay */

/* extract articels from fetched Data
DTO
data transfer object
what is inside if promise done 

*/
function extractArticles(apiData) {
  const { articles } = apiData;
  return articles;
}

function sentimentArticel() {
 

const sentiment = new sentimentAnalysis();
const result = sentiment.analyze("killed two fucking chicken this night");
console.log(result);    // Score: -2, Comparative: -0.666
}

function renderArticel(articles) {
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  async function load() {
    // We need to wrap the loop into an async function for this to work
    // Add limit
    for (let articel of articles) {
      console.log("gets started")
      const parentContainer = document.querySelector(".container");
      parentContainer.innerHTML = "";


      // Add this to a function 
      const articelComponent = `
      <div class="card bg-light">
          <div class="card-body text-center">
              <img src="${articel.urlToImage}" alt="" class="card-img-top mb-1" />
              <h3 class="card-title mb-1">${articel.title}</h3>
              <p class="card-text mb-1">${articel.content}</p>
          </div>
      </div>
      `;

      parentContainer.innerHTML = articelComponent;

      await timer(100); // then the created Promise can be awaited
      console.log("di other stuff")
      // change data add sentiment
      // run sentiment analyse 

      await timer(1000);
      // delete inner htl again
      // dsiplay sentiment articel
      console.log("add to all others")
      // add the element to container der unten ist hat id für vereinfachung

    }
  }

  load();
}
