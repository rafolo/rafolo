#this installs ff17 on ur machine
#RK
#see: Available versions http://thinstation.org/download/firefox/


site_name=http://thinstation.org/download/firefox
tar_name=firefox-17.x-current.tar.bz2
dest_dir=/opt/firefox17

echo "Instaling $site_name/$tar_name to $dest_dir" 
#clear all
echo "Deinstalling..."
##firefox 
sudo apt-get purge -y firefox 2>&1 > /dev/null
##dir 
sudo rm -rf dest_dir
##link
sudo rm /usr/bin/firefox 2>&1> /dev/null
##others
sudo rm -rf /opt/firefox*
suo rm -rf /usr/bin/firefox*

#install
echo "Downloading..."
[ -d /opt ] || sudo mkdir -m  755 /opt
cd /opt

##this version works for 32/64, but this may change
if [ `uname -m` = x86_64 ]
then
    sudo wget $site_name/$tar_name
else
    sudo wget $site_name/$tar_name
fi

echo "Unpacking..."
sudo mkdir $dest_dir
sudo tar xjf  $tar_name -C $dest_dir


#pathing
echo "Patching...$dest_dir"
sudo chmod -R +x $dest_dir
sudo apt-get -y install libdbus-glib-1-2
sudo apt-get install ia32-libs-gtk

#create link in path to make it use as firefox not ./firefox.sh :)
echo "Finishing...$dest_dir"
sudo ln -s $dest_dir/firefox/firefox /usr/bin/firefox
echo "...done"