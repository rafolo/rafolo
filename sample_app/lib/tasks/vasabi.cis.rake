require 'mkmf'
namespace :vasabi do
  ##
  ## cis
  namespace :cis do
    desc "script - run on every commit"
    task :script => ["spec", "rafolo:karma:phantomjs", "rafolo:karma:firefox", "rafolo:protractor:all"] do |t|
    end

    desc "aftersuccess - run on every success"
    task :aftersuccess  do |t|
      puts "Happy codding!"
    end

  end


end