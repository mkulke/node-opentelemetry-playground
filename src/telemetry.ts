import { MeterProvider } from '@opentelemetry/metrics';
import { BoundValueRecorder } from '@opentelemetry/api';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { Request, Response } from 'express';
import UrlValueParser = require('url-value-parser');
import responseTime = require('response-time');
import { parse } from 'url';

const METRICS_ENDPOINT = '/metrics';
const exporter = new PrometheusExporter();

// A meter is a global singleton to hold values
const meter = new MeterProvider({
  exporter,
  interval: 1000,
}).getMeter('express-meter');

const durationRecorder = meter.createValueRecorder('requests', {
  description: 'Record the request duration',
});

const handles = new Map<String, BoundValueRecorder>();
const urlValueParser = new UrlValueParser();

interface RedLabels {
  route: String;
  status: String;
  method: String;
}

function _createLabelKey(labels: RedLabels): String {
  return `${labels.method}__${labels.route}__${labels.status}`;
}

const middleware = responseTime((req: Request, res: Response, time: number) => {
  if (req.path === METRICS_ENDPOINT) {
    return;
  }

  const path = parse(req.originalUrl).pathname;
  const route = urlValueParser.replacePathValues(path, '#val');
  const labels = {
    route,
    status: res.statusCode.toString(),
    method: req.method,
  };
  const labelHash = _createLabelKey(labels);
  let handle = handles.get(labelHash);
  if (!handle) {
    handle = durationRecorder.bind(labels);
    handles.set(labelHash, handle);
  }
  handle.record(time / 1000);
});

export { middleware };
