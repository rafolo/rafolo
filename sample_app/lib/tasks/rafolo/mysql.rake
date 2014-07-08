require 'pp'

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
    desc 'Stops mysql server'
    task :stop => [:env, :environment] do
      pid_file = File.expand_path(MYSQLD_FILEPATH, Rails.root)
      raise 'MySQL not started - cannot stop!' if !File.exists? pid_file

        File.open(pid_file, 'r') { |f|
          pid = f.readline.to_s.strip.to_i
          Process.kill(9, pid)

      }
      File.delete pid_file
    end

    desc 'Starts mysql server'
    task :start => [:env, :environment] do
      pid_file = File.expand_path(MYSQLD_FILEPATH, Rails.root)
      raise 'MySQl started - cannot start!' if File.exists? pid_file

      FileUtils.mkdir(Rails.root.join('tmp'))
      pid = Process.spawn(ENV['RAFOLO_MYSQL_START_CMD'])
      File.open(pid_file, 'w+') { |f| f.puts pid }
    end

    desc 'Restarts mysql server'
    task :restart => [:env, :environment] do
      pid_file = File.expand_path(MYSQLD_FILEPATH, Rails.root)

      begin
      Rake::Task['rafolo:mysql:stop'].invoke if File.exists? pid_file
      rescue Exception => e
        raise unless e.is_a? StandardError
      end

      Rake::Task['rafolo:mysql:start'].invoke
    end

    require 'active_record'
    desc "Get all the pico HTML mess into a Ruby model"
    task :import => [:env, :environment] do

      Rake::Task["db:create"].invoke

      ActiveRecord::Base.establish_connection(Rails.env)

      path = File.expand_path('../../../../../../dep/db', __FILE__) + "/**/*.sql"
      #path = "#{ENV['RAFOLO_PRD_DUMP_ROOT']}/dep/db/"

      Dir.glob(path).each do |script|
      #Dir.foreach(path) do |script|
        next if script == '.' or script == '..'
        puts "Processing: #{script}\n"

        sql = IO.read(script)
        sqls = sql.split(/;/)

        sqls.each do |s|

          sql = s + ";"
          sql.sub!("/*!", "-- /*!")

          puts "Executing:" + sql
          ActiveRecord::Base.connection.execute s
        end
        # ActiveRecord::Base.connection.execute sql

      end

      puts "File executed\n"
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