namespace :rafolo do
  namespace :tmp do

    desc "tmp clear"
    task :clear => [:environment] do |t|


      Rake::Task["tmp:clear"].invoke

      path = File.expand_path('tmp', Rails.root)
      if !File.exists?(path)
        return
      end
      Dir[path + '/**/*.pid'].each {|f|
        FileUtils.rm(f.to_s)
      }

    end
  end
end