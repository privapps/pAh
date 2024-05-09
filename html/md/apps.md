## Use case
### File Transfer
#### Method 1. Web apps use webrtc or piping
#### Method 2. Use command line with piping
```bash
# sender
echo 'hello, world' | curl -T - http://host:11102/hello

# receiver
curl http://host:11102/hello > hello.txt

```
### Proxy, if you are behind a file wall
#### Method 1. Directly use the tinyproxy
#### Method 2. Use ssh tunnel
```bash
sshpass -p letmeinbrudipls ssh -D 39082 -C -N -o StrictHostKeyChecking=no -o "UserKnownHostsFile=/dev/null" -o ServerAliveInterval=30 -p 11102 <host>
```
This will create local socket5 at localhost port 39082
### Reverse Proxy, if you want to expose ...
#### Method 1. Use ssh
```bash
sshpass -p letmeinbrudipls ssh -R 11110:localhost:3000 -o StrictHostKeyChecking=no -o "UserKnownHostsFile=/dev/null" -o ServerAliveInterval=30 -p 11102 <host>
```
This will make remote host 11110 relay to your localhost 3000. check [this](https://iximiuz.com/en/posts/ssh-tunnels/)
![ssh proxy](/img/ssh-t.png)

### Method 2. Use wstunnel
You need to download a client from the above links, and have same effect as above.
```bash
wstunnel client -R 'tcp://[::]:11110:localhost:3000' ws://<host>:11103
```
### Method 3. Use piping Server
See [go-piping-tunnel](https://github.com/nwtgck/go-piping-tunnel).
Similary, you can also use [socat](https://www.redhat.com/sysadmin/getting-started-socat) with piping server


