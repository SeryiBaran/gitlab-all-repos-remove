const axios = require("axios");
require("dotenv").config();

// Your authorization token here
const token = process.env.GITLAB_TOKEN;
const user = process.env.GITLAB_USER;

// fetch all projects
axios
  .get(`https://gitlab.com/api/v4/users/${user}/projects?visibility=public&per_page=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(async function (response) {
    // get all projects IDs
    let ids = response.data.map((e) => e.id);
    // delete all
    for (let el of ids) {
      try {
        await axios.delete(`https://gitlab.com/api/v4/projects/${el}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
      	console.log(e)
      }
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
