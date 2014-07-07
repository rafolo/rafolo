namespace :rafolo do
  namespace :travis do
    desc 'Generate deck from Travis CI and publish to GitHub Pages.'
    task :travis do
      # if this is a pull request, do a simple build of the site and stop
      if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
        puts 'Pull request detected. Executing build only.'
        system 'bundle exec rake build'
        next
      end

      repo = %x(git config remote.origin.url).gsub(/^git:/, 'https:').strip
      deploy_url = repo.gsub %r{https://}, "https://#{ENV['GH_TOKEN']}@"
      deploy_branch = repo.match(/github\.io\.git$/) ? 'master' : 'gh-pages'
      rev = %x(git rev-parse HEAD).strip


      dump_dir = %Q(c:\\dev\\cc\\Modules\\Repos\\GitHub\\rafolo\\cc\\modules\\branches\\ci\\sample_app-artifacts)
      dump_dir += "\\" + Time.now.to_s(:number)

      copy_files(Rails.root, dump_dir+"\\src\\")
      copy_files(Rails.root, dump_dir+"\\build\\", "(.git|log|tmp|spec|test|karma.*.js")
      # cov_dir=Rails.root
      # cov_dir+= "\\coverage"
      # copy_files(cov_dir, dump_dir+"\\doc\\reports\\coverage") if File.exist?(cov_dir)

      Dir.mktmpdir do |dir|
        dir = File.join dir, 'site'
        system 'bundle exec rake build'
        fail "Build failed." unless Dir.exists? dir
        system "git clone --branch #{deploy_branch} #{repo} #{dir}"
        system %Q(rsync -rt --del --exclude=".git" --exclude=".nojekyll" #{destination} #{dir})
        Dir.chdir dir do
          # setup credentials so Travis CI can push to GitHub
          system "git config user.name '#{ENV['GIT_NAME']}'"
          system "git config user.email '#{ENV['GIT_EMAIL']}'"

          system 'git add --all'
          system "git commit -m 'Built from #{rev}'."
          system "git push -q #{deploy_url} #{deploy_branch}"
        end
      end
    end

    def copy_files src_dir, dst_dir, exclude = nil
      Dir.chdir src_dir do
        Dir.glob('**/*.*').each do |file|
          dir, filename = File.dirname(file), File.basename(file)

          if (filename =~exclude)
            next
          end

          dest = File.join(dst_dir, dir)
          FileUtils.mkdir_p(dest)
          FileUtils.copy_file(file, File.join(dest, filename))
        end
      end
    end
  end
end