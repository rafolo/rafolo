namespace :rafolo do
  desc "karma!"
  task :karma => :environment do |t|
    exec "karma start"
  end

end