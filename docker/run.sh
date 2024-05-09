#!/bin/sh

on_ctrl_c() {
   echo "Ctrl-C received, exiting and killing all background processes"
   pkill -P $$  # this will kill all child processes i.e., your background processes
   exit
}

# trap SIGINT and call the on_ctrl_c function
trap on_ctrl_c INT

nohup httpd -p 11100 -h /html
nohup /usr/local/bin/piping-server --http-port 11101 &
nohup /usr/local/bin/reverse-ssh -l -p 11102 -s /bin/sh &
nohup /usr/local/bin/wstunnel server ws://0.0.0.0:11103 &
nohup /usr/bin/tinyproxy -d &
echo READY
wait