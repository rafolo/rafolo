ENV["RAILS_ENV"] = "test"
require File.expand_path('../../../../config/environment', __FILE__)
require 'rails/test_help'

if ENV['COVERAGE']
  require 'simplecov'
  SimpleCov.start do
    #add_filter 'test'
    #command_name 'Mintest'
  end
end

require 'minitest/autorun'

#TODO! Add libs here
#require 'my-library'

#TODO! Cleanup
# class ActiveSupport::TestCase
#   # Setup all fixtures in test/fixtures/*.(yml|csv) for all tests in alphabetical order.
#   #
#   # Note: You'll currently still have to declare fixtures explicitly in integration tests
#   # -- they do not yet inherit this setting
#   fixtures :all
#
#   # Add more helper methods to be used by all tests here...
# end