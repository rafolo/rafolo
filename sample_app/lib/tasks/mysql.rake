namespace :rafolo do
  namespace :mysql do
    MYSQL_PATH='c:\\mysql-5.1.73-winx64\\'
    desc "Start mysql!"
    task :start => :environment do |t|
      exec "#{MYSQL_PATH}bin\\mysqld.exe "
    end

    # desc 'Stop mysql'
    # task :stop do
    #   pid_file = 'tmp/pids/server.pid'
    #   pid = File.read(pid_file).to_i
    #   Process.kill 9, pid
    #   File.delete pid_file
    # end
  end

end