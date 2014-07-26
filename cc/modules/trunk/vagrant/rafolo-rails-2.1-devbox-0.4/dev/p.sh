#start puppet provisioning ad hoc
#RK

pushd /vagrant/puppet
sudo puppet apply --verbose --modulepath=modules manifests/default.pp
popd
