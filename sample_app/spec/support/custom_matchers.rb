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
    page.should have_selector('div.alert.alert-error', text: 'Invalid')
  end
end