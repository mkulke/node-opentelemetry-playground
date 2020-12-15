import express from 'express';
import axios from 'axios';

const PORT = 3000;
const ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

const app = express();

// define a route handler for the default home page
app.get('/bla/:uid', (req, res, next) => {
  const uid = req.params['uid'];
  axios
    .get(`${ENDPOINT}/${uid}`, {
      validateStatus: code => code === 200,
    })
    .then(result => res.json(result.data))
    .catch(next);
});

// start the express server
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
