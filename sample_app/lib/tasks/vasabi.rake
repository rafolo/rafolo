namespace :vasabi do
  ##
  ## cis
  namespace :cis do

    desc "script - run on every commit"
    task :script => ["rafolo:karma:phantomjs", "rafolo:karma:firefox", "coverage:spec"] do |t|


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
      raise "Add some checkings" #TODO! Add checklist
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