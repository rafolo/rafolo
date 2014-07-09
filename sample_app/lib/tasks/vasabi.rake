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

      validate_executable 'ruby', 'ruby', 'Ruby executable is not available. Please download to:' + ENV['RAFOLO_RUBY_HOME'], ENV['RAFOLO_RUBY_HOME'] + "\\bin" do

        expected_version = "1.9.3"
        output = %x{ruby.exe -v}.strip
        if output.include?(expected_version)
          puts "   version #{expected_version}...ok"
        else
          raise "Ruby version icorrect expected: #{expected_version} but was: #{output}"
        end

      end

      validate_executable 'devkit', "install", 'Devkit executable is not available. Please download to:' + ENV['RAFOLO_DEVKIT_HOME'], ENV['RAFOLO_DEVKIT_HOME'] + "\\bin"
      validate_executable 'mysql', 'mysqld', 'Mysqld executable is not available. Please download to:' + ENV['RAFOLO_MYSQL_PATH'], ENV['RAFOLO_MYSQL_PATH'] + "\\bin"
      validate_executable 'node', 'node', 'Node.js executable is not available. Please download Node.js v0.10.28 from http://nodejs.org/'
      validate_executable 'npm', 'npm', 'Npm(node package manager) executable is not available. Please download Node.js v0.10.28 from http://nodejs.org/'
      validate_executable 'bower', 'bower', 'Bower executable is not available. Please run: "npm install -g bower".'
      validate_executable 'karma', 'karma', 'Karma executable is not available. Please run: "npm install -g karma" and "npm install -g karma-cli"'
      validate_executable 'protractor', 'protractor', 'Protractor executable is not available. Please run: "npm install -g protractor"'

      fputs "Done"
    end

    def validate_executable(name,  executable, message, defaultpath="", &block)

      puts "Validating:" + name
      STDOUT.write "   "

      pathname = defaultpath + "\\" + executable;
      pathname.sub!("\\\\", "\\")

      if !find_executable(executable) && defaultpath != ""
        STDOUT.write "   checking for #{executable} in #{defaultpath}..."
        pathname+=".exe" if !pathname.include?('.exe')
        if !File.exist?(pathname)
          raise message
        else
          puts "yes"
        end
      end

      block.call if block_given?

      puts "ok"
      puts ""
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

  # please start rake vasabi:dump
  #
  # open project from dump folder
  #
  # rails g staging s14
  # rake rafolo:mysql:import RAILS_ENV=s14
  namespace :dump do
    desc "dump"
    task :all do #=> ["rafolo:production:dump:all"] do |t|

      Rake::Task["rafolo:production:dump:scriptsrc"].invoke
      Rake::Task["rafolo:production:dump:scriptmysql"].invoke

      cookie = Time.now.to_s(:number)
      Rake::Task["rafolo:production:dump:runsrc"].invoke(cookie)
      Rake::Task["rafolo:production:dump:runmysql"].invoke(cookie)

    end

    ##
    namespace :import do

      desc "mysql"
      task :mysql => "rafolo:mysql:import" do

      end
    end

  end

end

