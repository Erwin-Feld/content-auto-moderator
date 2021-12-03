import axios from "axios";

async function fetchContent() {
    try {
      let res = await axios({
        url: "https://saurav.tech/NewsAPI/everything/fox-news.json",
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
      // Don't forget to return something
      // console.log(res.data)
      // requestData = response.data
      console.log(res.data)
      return res.data;
    } catch (err) {
      // Add display error message in vue
      console.error(err);
    }
  }

  export {fetchContent}