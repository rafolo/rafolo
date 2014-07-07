namespace :vasabi do
  ## deploy
  namespace :checkide do

    desc "deploy"
    task :all do
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

    desc "test"
    task :all => ["rafolo:karma:all", "coverage:spec"] do |t|

      #File.open(Rails.root+ "")
    end
  end

  ## dump
  namespace :dump do
    desc "dump"
    task :all do #=> ["rafolo:production:dump:all"] do |t|

      tasks = %w{
      rafolo:production:dump:scriptsrc
      rafolo:production:dump:runsrc
      rafolo:production:dump:scriptmysql
      rafolo:production:dump:runmysql
      }
      tasks.each do |task|


        begin
          puts "Executing: #{task}..."
          Rake::Task["#{task}"].invoke
          puts "...done #{task}"
        rescue => e
          puts "errors: #{e}"
          raise e
        end
      end

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