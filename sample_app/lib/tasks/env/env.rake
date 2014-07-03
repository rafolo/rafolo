require 'os'

namespace :rafolo do

  desc 'Setup env variables'
  task :env
  #win
  if OS.windows?
    MYSQL_PATH='c:\\mysql-5.1.73-winx64\\'
    ENV['RAFOLO_MYSQL_START_CMD'] = "#{MYSQL_PATH}bin\\mysqld.exe "

    ENV['RAFOLO_GIT_HOME'] = "c:\\Program Files (x86)\\Git"

    ENV['RAFOLO_DUMP_ROOT'] = "c:\\dev\\cc\\Modules\\Repos\\Openshift5"
  #mac
  elsif OS.mac?
    raise NotImplementedError; #we dunno howto on mac
  #unknown os
    raise NotImplementedError; #how comes?
  end

  ENV.each do |k, v|
    puts "#{k}=#{v}"
  end
end