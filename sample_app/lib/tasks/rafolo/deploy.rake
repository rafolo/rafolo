namespace :rafolo do
  namespace :deploy do
    desc 'Builds rafolo'
    task :copy do
      # if this is a pull request, do a simple build of the site and stop
      if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
        puts 'Pull request detected. Executing build only.'
        system 'bundle exec rake build'
        next
      end

      #init
      repo = %x(git config remote.origin.url).gsub(/^git:/, 'https:').strip
      deploy_url = repo.gsub %r{https://}, "https://#{ENV['GH_TOKEN']}@"
      deploy_branch = repo.match(/github\.io\.git$/) ? 'master' : 'gh-pages'
      rev = %x(git rev-parse HEAD).strip

      dump_dir = ENV['RAFOLO_CIS_FREEZE_DUMP_HOME']
      dump_dir += "\\" + Time.now.to_s(:number)

      #src
      src_dir = dump_dir+"\\src\\"
      #copy_files(Rails.root, src_dir)
      #build
      copy_files(Rails.root, dump_dir+"\\build\\", %r((.git|coverage|log|node_modules|spec|tmp|test|package.json|bower.json|grunt.js|karma.*.js|protractor.conf.js)))
      #doc
      cov_dir= Rails.root
      cov_dir+="coverage"
      copy_files(cov_dir, dump_dir+"\\doc\\reports\\coverage") if File.exist?(cov_dir)

      #git everything
      # Dir.chdir(src_dir) do
      #   Dir.mktmpdir do |dir|
      #     dir = File.join dir, 'site'
      #     system 'bundle exec rake build'
      #     fail "Build failed." unless Dir.exists? dir
      #     system "git clone --branch #{deploy_branch} #{repo} #{dir}"
      #     system %Q(rsync -rt --del --exclude=".git" --exclude=".nojekyll" #{destination} #{dir})
      #     Dir.chdir dir do
      #       # setup credentials so Travis CI can push to GitHub
      #       system "git config user.name '#{ENV['GIT_NAME']}'"
      #       system "git config user.email '#{ENV['GIT_EMAIL']}'"
      #
      #       system 'git add --all'
      #       system "git commit -m 'Built from #{rev}'."
      #       system "git push -q #{deploy_url} #{deploy_branch}"
      #     end
      #   end
      # end
    end

    def copy_files src_dir, dst_dir, exclude = nil
      Dir.chdir src_dir do
        Dir.glob('**/*').each do |file| #*.* returns files with extensions buhaha e.g. Gemfile not
          dir, filename = strip_io_name(File.dirname(file)), strip_io_name(File.basename(file))

          if filename.to_s=~exclude or dir.to_s =~exclude
            next
          end


          begin
            dest = File.join(dst_dir, dir)
            cmd = "mkdir:" + dest
            FileUtils.mkdir_p(dest)
            dst_file = File.join(dest, filename)
            file = strip_io_name(file)
            cmd = "copy:" + file + " to " + dst_file
            FileUtils.copy_file(file, dst_file)
          rescue => e
            puts "Unable to #{cmd}: #{e}"
          end
        end
      end
    end

    def strip_io_name name
      name = name.sub("\\\\", "\\")
      name = name.sub("/", "\\")

      if name.include?(" ")

        name2=name
        if name2.include?("\\")
          name.split('\\').each do |s|
            name2+='\"' + s + '\"' + "\\"
          end
        else
          return name2
        end
      end

      return name
    end
  end
end