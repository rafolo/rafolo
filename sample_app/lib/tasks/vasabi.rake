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
    task :all => ["coverage:spec", "rafolo:karma"] do |t|

      #File.open(Rails.root+ "")
    end
  end

  ## dump
  namespace :dump do
    desc "dump"
    task :all do #=> ["rafolo:production:dump:all"] do |t|

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
  end

end