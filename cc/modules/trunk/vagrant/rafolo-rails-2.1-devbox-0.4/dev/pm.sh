#start puppet single module ad hoc
#RK

pushd /vagrant/puppet
sudo puppet apply --verbose --modulepath=modules -e "include xvfb" #
popd
