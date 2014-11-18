DatabaseCleaner.strategy = :truncation, {:except => %w[device_types]}

RSpec.configure do |config|
  config.use_transactional_fixtures = false
  config.before :each do
    DatabaseCleaner.start
  end
  config.after :each do
    DatabaseCleaner.clean
  end
end