import { NodeTracerProvider } from '@opentelemetry/node';
import { BatchSpanProcessor } from '@opentelemetry/tracing';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import config from './config';

function registerTracer() {
  const exporter = new JaegerExporter({
    host: config.jaegerHost,
    serviceName: config.serviceName,
  });

  const provider = new NodeTracerProvider();
  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();
}

if (config.jaegerHost !== '') {
  registerTracer();
}
