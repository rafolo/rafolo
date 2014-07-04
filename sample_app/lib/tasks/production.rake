require File.expand_path("../helpers/templates.rb", __FILE__)

namespace :rafolo do
  namespace :production do

    namespace :dump do

      desc "dump all"
      task :all => [:runmysql, :runsrc] do #=> [:mysql, :src] do #TODO! closes after shell exec in first task ...brrr

      end

      desc "remove errors"
      task :stripmysql do

        dir = ENV['RAFOLO_DUMP_ROOT'].strip + "/dep/db"

        #replace *!40101 ;
        begin
          cur_dir = Dir.pwd
          Dir.chdir(dir)
          files = Dir.glob("*.sql")


          # Then set the variables for find/replace
          @original_string_or_regex = /\/\*!/
          @replacement_string = "-- \\*!"

          files.each do |file_name|

            FileUtils.cp(file_name, file_name+".bak")

            puts "Striping " + file_name + "..."
            text = File.read(file_name)
            replace = text.gsub!(@original_string_or_regex, @replacement_string)
            File.open(file_name, "w") { |file| file.puts replace }
          end

        ensure
          Dir.chdir(cur_dir)
        end
      end

      task :runmysql => :scriptmysql do
        runner = CmdRunner.new
        dir = ENV['RAFOLO_DUMP_ROOT'].strip + "\\dep\\db\\"
        runner.run dir, "production-mysql-dump.cmd"

      end

      task :runsrc => :scriptsrc do
        runner = CmdRunner.new
        dir = ENV['RAFOLO_DUMP_ROOT'].strip + "\\src\\"
        runner.run dir, "production-src-dump.cmd"

      end

      desc 'rafolo:dump:scriptsrc - generates src dump configuration cmd file'
      task :scriptsrc do
        require 'erb'
        PWD = Rails.root.join("script")
        CONFIG_TEMPLATE = File.read(File.join(PWD, 'production-src-dump.cmd.erb'))
        CONFIG = File.join(PWD, 'production-src-dump.cmd')

        # copyTo = ENV['RAFOLO_DUMP_ROOT'].strip + "\\src\\"
        # FileUtils.mkdir_p(copyTo) unless File.directory?(copyTo)
        copyTo = "." #nop

        GitCmdGenerator.new(ENV['RAFOLO_GIT_HOME'], copyTo, CONFIG_TEMPLATE).save(CONFIG)

      end

      desc 'rafolo:dump:scriptmysql - generates mysql dump configuration cmd file'
      task :scriptmysql do
        require 'erb'
        PWD = Rails.root.join("script")
        CONFIG_TEMPLATE = File.read(File.join(PWD, 'production-mysql-dump.cmd.erb'))
        CONFIG = File.join(PWD, 'production-mysql-dump.cmd')

        # dir = ENV['RAFOLO_DUMP_ROOT'].strip + "\\dep\\db\\";
        # FileUtils.mkdir_p(dir) unless File.directory?(dir)
        #
        # copyTo = dir + "production-mysql-" + Time.now.to_s(:number) + ".sql"dir = ENV['RAFOLO_DUMP_ROOT'].strip + "\\dep\\db\\";

        copyTo = "production-mysql-" + Time.now.to_s(:number) + ".sql"
        MySqlCmdGenerator.new(ENV['PLINK_HOME'], "openshift-vasabi", copyTo, get_items, CONFIG_TEMPLATE).save(CONFIG)

      end
    end

    def get_items()
      ['rafal@pkey.pl', 'google.com']
    end

    class CmdRunner

      DUMPINPROGRESS_FILEPATH='tmp/dumpinprogress.pid'

      def initialize

      end

      def run working_dir, cmd

        pid_file = File.expand_path(DUMPINPROGRESS_FILEPATH, Rails.root)
        #TODO!raise 'Dump in progress - cannot start!' if File.exists? pid_file

        begin
          cur_dir = Dir.pwd

          FileUtils.mkdir_p(working_dir) unless File.directory?(working_dir)
          Dir.chdir(working_dir)

          puts "Executing: " + Dir.pwd + " " + cmd

          #pid = Process.spawn(cmd)
          #File.open(pid_file, 'w+') { |f| exec(cmd) }
          #Process.wait(pid)
          if (File.exist?(cmd))
            script_path = cmd
          else
            script_dir = Rails.root.join("script")
            script_path = File.join(script_dir, cmd)
          end

          exec(script_path)
        ensure
          Dir.chdir(cur_dir)
          #File.delete pid_file #if File.exists? pid_file #TODO! remove if and debug
        end
      end

    end


    class MySqlCmdGenerator
      include ERB::Util
      attr_accessor :plinkhome, :session, :output, :items, :template, :date

      def initialize(plinkhome, session, output, items, template, date=Time.now)
        @date = date
        @plinkhome=plinkhome
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