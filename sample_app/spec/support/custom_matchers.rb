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