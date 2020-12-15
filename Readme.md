# Node.js OpenTelemetry Playground

## Build

```
npm i
$(npm bin)/tsc -p .
```

## Run

```
node dist/index.js
```

```
curl localhost:3000/bla/1
curl localhost:9464/metrics
```

## Docker Compose

This recipe will set up the web service, jaeger and prometheus.

### Startup

```
docker-compose up --build
```

### Create traffic

```
for i in $(seq 1 10); do curl localhost:3000/bla/$i; done 
```

### Jaeger

```
open http://localhost:16686
```

### Prometheus

```
open http://localhost:9090
# sample promql query: rate(requests_sum[5m])/rate(requests_count[5m])
```
