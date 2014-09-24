RSpec::Matchers.define :include_regex do |regex|
  match do |actual|
    actual.find { |str| str =~ regex }
  end
end

RSpec::Matchers.define :include do |value|
  match do |actual|
    actual.include? value
  end
end

RSpec::Matchers.define :have_error_message do |message|
  match do |page|
    page.should have_selector('div.alert.alert-error', text: t2('InvalidEmailPassword'))
  end
end

#TODO! Create custom parameter matcher
# https://www.relishapp.com/rspec/rspec-expectations/v/2-3/docs/custom-matchers/define-matcher#define-a-matcher-with-default-messages
# RSpec::Matchers.define :have_button do |text|
#   match do |page|
#     page.should have_css('.btn', text: 'Sign up now!')
#   end
# end