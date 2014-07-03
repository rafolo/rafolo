require File.expand_path("../helpers/templates.rb", __FILE__)

namespace :rafolo do
  namespace :production do

    namespace :dump do

      desc "dump all"
      task :all => [:mysql, :src] do
        Rake::Task['rafolo:production:dump:run'].invoke("production-mysql-dump.cmd")
        Rake::Task['rafolo:production:dump:run'].invoke("production-src-dump.cmd")
      end


      DUMPINPROGRESS_FILEPATH='tmp/dumpinprogress.pid'

      desc "run a script"
      task :run, [:cmd] => [:env, :environment] do |t, args|
        pid_file = File.expand_path(DUMPINPROGRESS_FILEPATH, Rails.root)
        raise 'Dump in progress - cannot start!' if File.exists? pid_file

        begin
          dir = Dir.pwd
          path = File.expand_path("script", Rails.root)
          Dir.chdir(path)
          cmd = args[:cmd]

          puts "Executing: " + cmd + " " + Dir.pwd

          # pid = Process.spawn(cmd).pid
          File.open(pid_file, 'w+') { |f| exec(cmd) }
          # Process.waitpid(pid)
        ensure
          Dir.chdir(dir)
          File.delete pid_file #if File.exists? pid_file #TODO! remove if and debug
        end
      end


      desc 'Dump src'
      task :src do
        require 'erb'
        PWD = Rails.root.join("script")
        CONFIG_TEMPLATE = File.read(File.join(PWD, 'production-src-dump.cmd.erb'))
        CONFIG = File.join(PWD, 'production-src-dump.cmd')

        copyTo = ENV['RAFOLO_DUMP_ROOT'].strip + "\\src\\"
        FileUtils.mkdir_p(copyTo) unless File.directory?(copyTo)

        GitCmdGenerator.new(ENV['RAFOLO_GIT_HOME'], copyTo, CONFIG_TEMPLATE).save(CONFIG)

      end

      desc 'Generate mysql dump configuration'
      task :mysql do
        require 'erb'
        PWD = Rails.root.join("script")
        CONFIG_TEMPLATE = File.read(File.join(PWD, 'production-mysql-dump.cmd.erb'))
        CONFIG = File.join(PWD, 'production-mysql-dump.cmd')

        dir = ENV['RAFOLO_DUMP_ROOT'].strip + "\\dep\\db\\";
        FileUtils.mkdir_p(dir) unless File.directory?(dir)

        copyTo = dir + "production-mysql-" + Time.now.to_s(:number) + ".sql"
        MySqlCmdGenerator.new("openshift-vasabi", copyTo, get_items, CONFIG_TEMPLATE).save(CONFIG)

      end
    end

    def get_items()
      ['rafal@pkey.pl', 'google.com']
    end


    class MySqlCmdGenerator
      include ERB::Util
      attr_accessor :session, :output, :items, :template, :date

      def initialize(session, output, items, template, date=Time.now)
        @date = date
        @session = session
        @output = output
        @items = items
        @template = template
      end

      def render()
        ERB.new(@template).result(binding)
      end

      def save(file)
        File.open(file, "w+") do |f|
          f.write(render)
        end
      end

    end

    class GitCmdGenerator
      include ERB::Util
      attr_accessor :githome, :output, :template, :date

      def initialize(githome, output, template, date=Time.now)
        @date = date
        @githome = githome
        @output = output
        @template = template
      end

      def render()
        ERB.new(@template).result(binding)
      end

      def save(file)
        File.open(file, "w+") do |f|
          f.write(render)
        end
      end

    end

  end
end