require Rails.root.join("config/environments/production")

SampleApp::Application.configure do

  #overide sth
  config.show_examples = true

  # Compress JavaScripts and CSS
  config.assets.compress = false

  config.assets.compile = true

  # Generate digests for assets URLs
  config.assets.digest = false

  #TODO! Start staging error occures config.assets.js_compressor = Uglifier.new(mangle: false)

end
