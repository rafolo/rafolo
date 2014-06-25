require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "active_resource/railtie"
require "sprockets/railtie"
require "rails/test_unit/railtie"

require 'autorefresh'

if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  Bundler.require(*Rails.groups(:assets => %w(development test)))
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
end

module SampleApp
  class Application < Rails::Application

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Custom directories with classes and modules you want to be autoloadable.
    # config.autoload_paths += %W(#{config.root}/extras)

    # Only load the plugins named here, in the order given (default is alphabetical).
    # :all can be used as a placeholder for all plugins not explicitly named.
    # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

    # Activate observers that should always be running.
    # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    # Use SQL instead of Active Record's schema dumper when creating the database.
    # This is necessary if your schema can't be completely dumped by the schema dumper,
    # like if you have constraints or database-specific column types
    # config.active_record.schema_format = :sql

    # Enforce whitelist mode for mass assignment.
    # This will create an empty whitelist of attributes available for mass-assignment for all models
    # in your app. As such, your models will need to explicitly whitelist or blacklist accessible
    # parameters by using an attr_accessible or attr_protected declaration.
    config.active_record.whitelist_attributes = true

    # Enable the asset pipeline
    config.assets.enabled = true

    config.serve_static_assets = true

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'

    # via https://github.com/sstephenson/sprockets/issues/347#issuecomment-25543201

    # We don't want the default of everything that isn't js or css, because it pulls too many things in
    config.assets.precompile.shift()

# Explicitly register the extensions we are interested in compiling
    config.assets.precompile.push(Proc.new do |path|
      (File.extname(path).in? [
                                 '.html', '.erb', '.haml',                 # Templates
                                 '.png',  '.gif', '.jpg', '.jpeg', '.svg', # Images
                                 '.eot',  '.otf', '.svc', '.woff', '.ttf', # Fonts
                             ]
      ) && (!path.include? 'jasmine')
    end)

    #config.assets.paths << Rails.root.join('vendor', 'assets', 'components')
    config.assets.paths << "#{Rails.root}/vendor/assets/components"



    #config
    #config.autoload_paths += Dir["#{Rails.root}/lib/**"]

    #no ALT+TAB anymore - refresh files on change - see: rake rafolo:watchr or type: autorefresh in terminal
    # https://github.com/mynyml/watchr
    config.refresh_autorefresh = false
    #http://www.livejs.com/
    config.refresh_livejs = false

    #TODO! Why God Why? defined in extension but does not see it till this line!
    config.app_config = YAML.load_file("#{Rails.root}/config/app_config.yml")[Rails.env]

    #show plastique examples
    config.show_examples = false

    #check modernizer
    config.check_modernizer = true

    #do not init
    config.assets.initialize_on_precompile = false
  end
end
