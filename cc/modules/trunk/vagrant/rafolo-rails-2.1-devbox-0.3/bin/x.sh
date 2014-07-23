#!/bin/bash
if [ -z "$1" ]; then  echo "`basename $0` {start|stop}"
  exit
fi

case "$1" in
start)
  /usr/bin/Xvfb :99 -ac -screen 0 1024x768x8 2>&1 >/dev/null &
  export DISPLAY=:99.0
;;
stop)
  killall Xvfb
;;
esac