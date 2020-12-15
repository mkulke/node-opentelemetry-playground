require('./tracing');
import express from 'express';
import axios from 'axios';
import { middleware as telemetryMiddleware } from './metrics';
import config from './config';

const PORT = 3000;

const app = express();

app.use(telemetryMiddleware);

app.get('/bla/:uid', (req, res, next) => {
  const uid = req.params['uid'];
  axios
    .get(`${config.userEndpoint}/${uid}`, {
      validateStatus: code => code === 200,
    })
    .then(result => res.json(result.data))
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
