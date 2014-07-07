namespace :rafolo do
  desc "watches your files and refreshes your browser!"
  task :watchr => :environment do |t|
    exec "watchr test/server/watchr/refresh.watchr"
  end

end