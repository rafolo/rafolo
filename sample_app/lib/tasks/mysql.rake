namespace :rafolo do
  namespace :mysql do

    MYSQLD_FILEPATH='tmp/mysqld.pid'

=begin
    1       HUP (hang up)
    2       INT (interrupt)
    3       QUIT (quit)
    6       ABRT (abort)
    9       KILL (non-catchable, non-ignorable kill)
    14      ALRM (alarm clock)
    15      TERM (software termination signal)
=end
    task :stop => [:env, :environment] do
      pid_file = File.expand_path(MYSQLD_FILEPATH, Rails.root)
      raise 'MySQL not started - cannot stop!' if !File.exists? pid_file

      File.open(pid_file, 'r') { |f|
        pid = f.readline.to_s.strip.to_i
        Process.kill(9, pid)

      }
      File.delete pid_file
    end

    task :start => [:env, :environment] do
      pid_file = File.expand_path(MYSQLD_FILEPATH, Rails.root)
      raise 'MySQl started - cannot start!' if File.exists? pid_file

      pid = Process.spawn(ENV['RAFOLO_MYSQL_START_CMD'])
      File.open(pid_file, 'w+') { |f| f.puts pid }
    end

    # This is lock example
    #
    # task :lock => [:env, :environment] do
    #   pid_file = File.expand_path(MYSQLD_FILEPATH, Rails.root)
    #   raise 'MySQl started - cannot start!' if File.exists? pid_file
    #
    #   begin
    #     File.open(pid_file, 'w+') { |f| f.puts Process.spawn(ENV['RAFOLO_MYSQL_START_CMD']) }
    #   ensure
    #     File.delete pid_file
    #   end
    # end

  end
end