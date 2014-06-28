# inside tasks/test.rake
require 'rake/testtask'

Rake::TestTask.new do |t|
  #t.libs.push 'test/server/testunit'
  t.pattern = 'test/server/**/*_test.rb'
  t.warning = true
  #t.verbose = true
end

task :default => :test

desc 'Generates a coverage report'
task :coverage do
  ENV['COVERAGE'] = 'true'
  Rake::Task['test'].execute
end