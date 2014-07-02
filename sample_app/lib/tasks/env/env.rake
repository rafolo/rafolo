require 'os'

namespace :rafolo do

  desc 'Setup env variables'
  task :env
  #win
  if OS.windows?
    MYSQL_PATH='c:\\mysql-5.1.73-winx64\\'
    ENV['RAFOLO_MYSQL_START_CMD'] = "#{MYSQL_PATH}bin\\mysqld.exe "


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