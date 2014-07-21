#!/bin/bash
#this installs xvfb on ur machine
#RK
#see: 

sudo apt-get -y update
sudo apt-get -y install wine

sudo apt-get -y purge xvfb
sudo apt-get -y autoremove xvfb
sudo apt-get -y install xvfb
sudo apt-get -y install xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic
sudo apt-get -y install x-ttcidfont-conf

mkfontdir



