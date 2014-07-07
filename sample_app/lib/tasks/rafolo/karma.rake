namespace :rafolo do

  namespace :karma do
    desc "karma!"
    task :all => :environment do |t|
      exec "karma start"
    end

    desc "karma PhantomJS!"
    task :phantomjs => :environment do |t|
      exec "karma start --browsers PhantomJS"
    end

    desc "karma PhantomJS!"
    task :firefox => :environment do |t|
      exec "karma start --browsers firefox"
    end

    desc "karma PhantomJS!"
    task :chrome => :environment do |t|
      exec "karma start --browsers chrome"
    end

  end


end