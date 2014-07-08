require 'mkmf'
namespace :vasabi do
  ##
  ## cis
  namespace :cis do

    desc "script - run on every commit"
    task :script => ["rafolo:karma:phantomjs", "rafolo:karma:firefox", "spec:lib", "spec:models"] do |t|
    end

    desc "aftersuccess - run on every success"
    task :aftersuccess  do |t|
      puts "Happy codding!"
    end

  end

  ## deploy
  namespace :ide do

    desc "check"
    task :check do
      puts "Checking ide..."
      validate_executable 'ruby', 'Ruby executable is not available. Please download Ruby v1.9.3 from http://rubyinstaller.org/downloads/'
      validate_executable 'node', 'Node.js executable is not available. Please download Node.js v0.10.28 from http://nodejs.org/'
      validate_executable 'npm', 'Npm(node package manager) executable is not available. Please download Node.js v0.10.28 from http://nodejs.org/'
      validate_executable 'bower', 'Bower executable is not available. Please run: "npm install -g bower".'
      validate_executable 'karma', 'Karma executable is not available. Please run: "npm install -g karma" and "npm install -g karma-cli"'
      validate_executable 'protractor', 'Protractor executable is not available. Please run: "npm install -g protractor"'

      #TODO! Add checklist: DevKit, mySql installation
    end

    def validate_executable(executable, message)
      raise message if find_executable(executable) == nil
    end

    def validate_folder_exists(folder)

    end
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