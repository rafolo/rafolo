require File.expand_path("../helpers/templates.rb", __FILE__)

namespace :rafolo do
  namespace :production do

    DUMPINPROGRESS_FILEPATH='tmp/dumpinprogress.pid'

    desc "production dump"
    task :sqldump => [:env, :environment] do
      pid_file = File.expand_path(DUMPINPROGRESS_FILEPATH, Rails.root)
      raise 'Dump in progress - cannot start!' if File.exists? pid_file

      begin
        dir = Dir.pwd
        path = File.expand_path("script", Rails.root)
        Dir.chdir(path)
        cmd = "production-dump.cmd"

        # o = path + '/dump.cmd'
        #erb_resolver 'config/SomeFile.xml' do |t|
        # erb_resolver  do |t|
        #       t.file = o
        #       t.session_name = 'openshift-vasabi'
        #       t.password = 'value'
        #       t.output = 'out.sql'
        #       #t.another_param = ['a', 'b', 'c']
        #       t.template = path + '/dump.cmd.erb' # Optional - will automatically look here...
        # end


        pid = Process.spawn(cmd).pid
        File.open(pid_file, 'w+') { |f| f.puts pid }
        Process.waitpid(pid)
      ensure
        Dir.chdir(dir)
        File.delete pid_file if File.exists? pid_file #TODO! remove if and debug
      end
    end




  end
end