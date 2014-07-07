require 'os'

namespace :rafolo do

  desc 'Setup env variables'
  task :env
  #win
  if OS.windows?
    MYSQL_PATH='c:\\mysql-5.1.73-winx64\\'
    ENV['RAFOLO_MYSQL_START_CMD'] = "#{MYSQL_PATH}bin\\mysqld.exe "

    ENV['RAFOLO_GIT_HOME'] = "c:\\Program Files (x86)\\Git"

    ENV['PLINK_HOME'] = "c:\\Program Files (x86)\\PuTTY\\"


    #TODO Get rid of absolute path
    #where production dump lives
    ENV['RAFOLO_PRD_DUMP_ROOT'] = "c:\\dev\\cc\\Modules\\Repos\\Openshift5"

    #TODO Get rid of absolute path
    #where prepared version lives
    ENV['RAFOLO_CIS_FREEZE_DUMP_HOME'] = %Q(c:\\dev\\cc\\Modules\\Repos\\GitHub\\rafolo\\cc\\modules\\branches\\ci\\sample_app-artifacts)

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