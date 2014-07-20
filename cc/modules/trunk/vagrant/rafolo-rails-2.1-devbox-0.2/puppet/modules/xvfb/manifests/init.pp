define check_mode($mode) {
  exec { "/bin/chmod $mode $name":
    unless => "/bin/sh -c '[ $(/usr/bin/stat -c %a $name) == $mode ]'",
  }
}

class xvfb {
  exec { 'install_xvfb': command => "sudo apt-get update && sudo apt-get install -y xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x-ttcidfont-conf xvfb x11-apps imagemagick firefox " 
  }
  
  file { '/home/vagrant/xvfb.sh':
    content => template('xvfb/xvfb.sh.erb'),
	ensure => present,
	mode => 777
  }
  
  check_mode { "/home/vagrant/xvfb.sh":
  mode => 777,
  }
  
  file { '/home/vagrant/ff-xvfb.sh':
    content => template('xvfb/ff-xvfb.sh.erb'),
	ensure => present,
	mode => 777
  }
  
  check_mode { "/home/vagrant/ff-xvfb.sh":
  mode => 777,
  }
  
  #autostart
  exec {
  "echo './ff-xvfb.sh' >> ~/.bashrc "
  }
  
  #postinstall
  ## start 
  exec {
  "echo '/home/vagrant/ff-xvfb.sh' "
  }
}
