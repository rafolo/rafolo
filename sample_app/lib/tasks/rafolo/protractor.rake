namespace :rafolo do

  namespace :protractor do
    desc "protractor - runs all tests."
    task :all => :environment do |t|
      puts "Protractor running..."
      exec "protractor"
    end
    desc "web-driver start."
    task :webdriver do |t|
      exec "webdriver-manager start"
    end
  end
end