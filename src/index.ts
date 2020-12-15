import express from 'express';
import axios from 'axios';
import { middleware as telemetryMiddleware } from './telemetry';

const PORT = 3000;
const ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

const app = express();

app.use(telemetryMiddleware);

app.get('/bla/:uid', (req, res, next) => {
  const uid = req.params['uid'];
  axios
    .get(`${ENDPOINT}/${uid}`, {
      validateStatus: code => code === 200,
    })
    .then(result => res.json(result.data))
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
