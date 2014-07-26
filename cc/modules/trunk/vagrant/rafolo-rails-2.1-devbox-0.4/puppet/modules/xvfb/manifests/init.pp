define check_mode($mode) {
  exec { "/bin/chmod $mode $name":
    unless => "/bin/sh -c '[ $(/usr/bin/stat -c %a $name) == $mode ]'",
  }
}

class xvfb {
  
  # Fonts 
  #exec { 'install_xvfb': command => "sudo apt-get update && sudo apt-get install -y libgl1-mesa-dri xfonts-100dpi xfonts-75dpi xfonts-scalable xfonts-cyrillic x-ttcidfont-conf xvfb x11-apps imagemagick " 
  exec { 'install_xvfb': command => "sudo apt-get update && sudo apt-get install -y xvfb  " 
  
  }
  
  # Script
  ## xvfb.sh
  file { '/home/vagrant/xvfb.sh':
    content => template('xvfb/xvfb.sh.erb'),
	ensure => present,
	mode => 777
  }
  
  check_mode { "/home/vagrant/xvfb.sh":
  mode => 777,
  }
  
  ## ff.sh
  file { '/home/vagrant/ff.sh':
    content => template('xvfb/ff.sh.erb'),
	ensure => present,
	mode => 777
  }
  
  check_mode { "/home/vagrant/ff.sh":
  mode => 777,
  }
  
  # Ruby 1.9.3
  exec { 'install_r193': command => " rvm install 1.9.3 "
  }
  exec { 'use_r193': command => " rvm use 1.9.3 --default"
  }
  
  #autostart TODO!
  exec { 'appent_bashrc':
  command => "echo '/home/vagrant/ff.sh' >> ~/.bashrc "
  }
  
  #postinstall TODO!
  ## start 
  exec { 'firstime_autostart':
  command => "echo '/home/vagrant/ff.sh' "
  }
}
