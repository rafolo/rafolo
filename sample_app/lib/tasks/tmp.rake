namespace :rafolo do
  namespace :tmp do

    desc "tmp clear"
    task :clear => [:environment] do |t|

      Rake::Task["tmp:clear"].invoke

      path = File.expand_path('tmp', Rails.root)
      Dir[path + '/**/*.pid'].delete_if {|f|
        puts f.to_s
        f.end_with?('.pid')
      }

    end
  end
end