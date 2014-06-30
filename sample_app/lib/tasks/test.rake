# RK this overides rake test task
#TODO! Add diferent locations for testing e.g. rake test #tests all tests under test/server
require 'rake/testtask'

Rake::TestTask.new do |t|
  #t.libs.push 'test/server/testunit'
  #t.pattern = 'test/server/**/*_test.rb'
  t.warning = true
  #t.verbose = true
  t.test_files = FileList['test/**/*_test.rb']

  pp t
end

task :default => :test

desc 'Generates a coverage report'
task :coverage do
  ENV['COVERAGE'] = 'true'
  Rake::Task['test'].execute
end