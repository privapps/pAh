FROM --platform=$BUILDPLATFORM alpine:3.19.1

ARG TARGETOS TARGETARCH

COPY /html /html
COPY /docker/${TARGETARCH}/* /usr/local/bin/
COPY /docker/run.sh /run.sh

RUN \
    apk add --no-cache busybox-extras tinyproxy; \
    sed -i 's/Port 8888/Port 11104/g' /etc/tinyproxy/tinyproxy.conf;\
    sed -i 's/Allow 127.0.0.1/#Allow 127.0.0.1/g' /etc/tinyproxy/tinyproxy.conf;\
    sed -i 's/Allow ::1/#Allow ::1/g' /etc/tinyproxy/tinyproxy.conf;

EXPOSE 11100-11120

ENTRYPOINT ["sh","/run.sh"]