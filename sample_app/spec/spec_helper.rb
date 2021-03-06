
# http://www.opinionatedprogrammer.com/2011/02/capybara-and-selenium-with-rspec-and-rails-3/#comment-220

require 'rubygems'
require 'spork'
require 'shoulda'
require 'factory_girl_rails'
require 'capybara'
require 'active_record'


#uncomment the following line to use spork with the debugger
#require 'spork/ext/ruby-debug'

# --- Instructions ---
# Sort the contents of this file into a Spork.prefork and a Spork.each_run
# block.
#
# The Spork.prefork block is run only once when the spork server is started.
# You typically want to place most of your (slow) initializer code in here, in
# particular, require'ing any 3rd-party gems that you don't normally modify
# during development.
#
# The Spork.each_run block is run each time you run your specs.  In case you
# need to load files that tend to change during development, require them here.
# With Rails, your application modules are loaded automatically, so sometimes
# this block can remain empty.
#
# Note: You can modify files loaded *from* the Spork.each_run block without
# restarting the spork server.  However, this file itself will not be reloaded,
# so if you change any of the code inside the each_run block, you still need to
# restart the server.  In general, if you have non-trivial code in this file,
# it's advisable to move it into a separate file so you can easily edit it
# without restarting spork.  (For example, with RSpec, you could move
# non-trivial code into a file spec/support/my_helper.rb, making sure that the
# spec/support/* files are require'd from inside the each_run block.)
#
# Any code that is left outside the two blocks will be run during preforking
# *and* during each_run -- that's probably not what you want.
#
# These instructions should self-destruct in 10 seconds.  If they don't, feel
# free to delete them.


Spork.prefork do

  # Loading more in this block will cause your tests to run faster. However,
  # if you change any configuration or code from libraries loaded here, you'll
  # need to restart spork for it take effect.
  # This file is copied to spec/ when you run 'rails generate rspec:install'
  ENV["RAILS_ENV"] || 'test'
  require File.expand_path("../../config/environment", __FILE__)
  require 'rspec/rails'
  require 'rspec/autorun'

  require 'capybara/rspec'
  require 'capybara/rails'

  #TODO!??
  #Spork.trap_method(Rails::Application::RoutesReloader, :reload!)
  # TODO! Remove
  # puts "TODO! RK Preparing the db..."
  # Rake::Task['db:migrate'].invoke

  #RK Simple cov
  if ENV['COVERAGE']
    require 'simplecov'
    SimpleCov.start do
      #add_filter 'test'
      #command_name 'Mintest'
      coverage_dir 'coverage/server/simplecov'
    end
  end

  # Requires supporting ruby files with custom matchers and macros, etc,
  # in spec/support/ and its subdirectories.
  Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}
  require 'shoulda/matchers/integrations/rspec' # after require 'rspec/rails'

  # #capybara
  class ActiveRecord::Base
    mattr_accessor :shared_connection
    @@shared_connection = nil

    def self.connection
      @@shared_connection || ConnectionPool::Wrapper.new(:size => 1) { retrieve_connection }
    end
  end


  Spork.each_run do
    # This code will be run each time you run your specs.
    ##BUGFIX
    #Spork ActiveRecords
    load_schema = lambda {
      load "#{Rails.root.to_s}/db/schema.rb" # use db agnostic schema by default
      # ActiveRecord::Migrator.up('db/migrate') # use migrations
    }
    silence_stream(STDOUT, &load_schema)
    require Rails.root.join('db/seeds')

    #capybara
    include Capybara::DSL

    #helpers
    # http://stackoverflow.com/questions/10217755/rails-3-2-3-with-spork-does-not-recognize-helper-methods-in-cucumber-tests
    # full_names = Dir["#{Rails.root}/app/helpers/*.rb"]
    # full_names.collect do |full_name|
    #   include Object.const_get(File.basename(full_name,'.rb').camelize)
    # end

    ## Load
    # Reloading support files each run
    Dir[Rails.root.join("spec/support/**/*.rb")].each {|f| require f}

    # Reloading extra files, all app* are already loaded by rails
    Dir[Rails.root.join("lib/extensions/menu/**/*.rb")].each {|f| require f}

    #TODO! Speed up?
    # Reload FactoryGirl2 factories
    #FactoryGirl.reload

    # Reload locales
    I18n.backend.reload!

    # #capybara
    ActiveRecord::Base.shared_connection = ActiveRecord::Base.connection
  end

  ##Config
  RSpec.configure do |config|
    # ## Mock Framework
    #
    # If you prefer to use mocha, flexmock or RR, uncomment the appropriate line:
    #
    # config.mock_with :mocha
    # config.mock_with :flexmock
    # config.mock_with :rr

    # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
    config.fixture_path = "#{::Rails.root}/spec/fixtures"

    # If you're not using ActiveRecord, or you'd prefer not to run each of your
    # examples within a transaction, remove the following line or assign false
    # instead of true.
    config.use_transactional_fixtures = false

    # If true, the base class of anonymous controllers will be inferred
    # automatically. This will be the default behavior in future versions of
    # rspec-rails.
    config.infer_base_class_for_anonymous_controllers = false

    # config.include Capybara::DSL
  end
end


  
