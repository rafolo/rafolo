namespace :rafolo do

  namespace :protractor do
    desc "protractor - runs all tests."
    task :all => :environment do |t|
      exec "protractor"
    end
    desc "web-driver start."
    task :webdriver do |t|
      exec "webdriver-manager start"
    end
  end
end