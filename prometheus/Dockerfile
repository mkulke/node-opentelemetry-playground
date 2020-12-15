FROM alpine
ADD https://github.com/prometheus/prometheus/releases/download/v2.23.0/prometheus-2.23.0.linux-amd64.tar.gz /tmp
RUN tar xzf /tmp/prometheus-2.23.0.linux-amd64.tar.gz
WORKDIR /prometheus-2.23.0.linux-amd64
COPY prometheus.yml .
CMD ["./prometheus"]
