require 'mkmf'
namespace :vasabi do


  ## deploy
  namespace :ide do

    desc "about - shows ide configuration"
    task :about do

      fputs "Evaluating ", 3 #:)

      ENV.each do |item|
        puts item if item.to_s.include?('RAFOLO')
      end
    end

    desc "check"
    task :check do
      fputs "Checking ide", 3
      validate_executable 'mysqld.exe', 'Mysqld executable is not available. Please download to:' + ENV['RAFOLO_MYSQL_PATH'], ENV['RAFOLO_MYSQL_PATH'] + "\\bin"
      validate_executable 'node', 'Node.js executable is not available. Please download Node.js v0.10.28 from http://nodejs.org/'
      validate_executable 'npm', 'Npm(node package manager) executable is not available. Please download Node.js v0.10.28 from http://nodejs.org/'
      validate_executable 'bower', 'Bower executable is not available. Please run: "npm install -g bower".'
      validate_executable 'karma', 'Karma executable is not available. Please run: "npm install -g karma" and "npm install -g karma-cli"'
      validate_executable 'protractor', 'Protractor executable is not available. Please run: "npm install -g protractor"'

      #TODO! Add checklist: DevKit
      fputs "Done"
    end

    def validate_executable(executable, message, defaultpath="")

      pathname = defaultpath + "\\" + executable;
      pathname.sub!("\\\\", "\\")

      if !find_executable(executable) && defaultpath != ""
        STDOUT.write "checking for #{executable} in #{defaultpath}..."
        if !File.exist?(pathname)
          raise message
        else
          STDOUT.write "yes"
        end
      end

    end

    def validate_folder_exists(folder)

    end

    def funny_puts msg, steps=0
      STDOUT.write msg
      steps.times { |i| STDOUT.write "."; sleep 2 }
      STDOUT.write "\r"

    end

    alias fputs funny_puts
  end

  ## deploy
  namespace :deploy do

    desc "deploy"
    task :freeze => "rafolo:deploy:copy" do |t|

    end
  end

  ## test
  namespace :test do

    desc "all"
    task :all => ["rafolo:karma:all", "coverage:spec"] do |t|

      #File.open(Rails.root+ "")
    end
  end

  ## dump
  namespace :dump do
    desc "dump"
    task :all do #=> ["rafolo:production:dump:all"] do |t|

      Rake::Task["rafolo:production:dump:scriptsrc"].invoke
      Rake::Task["rafolo:production:dump:scriptmysql"].invoke

      cookie = Time.now.to_s(:number)
      Rake::Task["rafolo:production:dump:runsrc"].invoke(cookie)
      Rake::Task["rafolo:production:dump:runmysql"].invoke(cookie)

      return

      #TODO Run tasks one by one
      raise %Q(
            please start rake rafolo:dump:scriptsrc
                         rake rafolo:dump:runsrc
                         rake rafolo:dump:runmsql
                         rake rafolo:dump:scriptmysql

                         open project from dump folder

                         rails g staging
                         switch to environment
                         rake rafolo:mysql:import
)
    end

    ##
    namespace :import do

      desc "mysql"
      task :mysql => "rafolo:mysql:import" do

      end
    end

  end

end

