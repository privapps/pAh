# pAh
punch a hole

## Why
If you're on a restricted network, where DNS or your browser is controlled, or you want to easily share files or chat with others on a different network, this repository is for you. It's a collection of dockerized applications designed to address these needs.

## About
see [About](./html/md/about.md)

## What is inside
* For server side [Server](./html/md/server.md)
* For client side [Client](./html/md/web.md)
* [How to use it](./html/md/apps.md)

## How to run
`docker run --dns 1.1.1.1 --rm -p 11100-11120:11100-11120 ghcr.io/privapps/pah:main`

  * Port 11100 -> [httpd](https://pkgs.alpinelinux.org/package/edge/main/x86/busybox-extras)
  * Port 11101 -> [piping-server](https://github.com/nwtgck/piping-server-rust)
  * Port 11102 -> [reverse-ssh](https://github.com/Fahrj/reverse-ssh)
  * Port 11103 -> [wstunnel](https://github.com/erebe/wstunnel)
  * Port 11104 -> [tinyproxy](https://tinyproxy.github.io/)

Use other ports for reverse port forwarding. Browser with port 11100 to view help and web apps.