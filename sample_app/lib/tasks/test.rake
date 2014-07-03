
#TODO! Add diferent locations for testing e.g. rake test #tests all tests under test/server
require 'rake/testtask'
require 'pp'

Rake::TestTask.new do |t|
  #t.libs.push 'test/server/testunit'
  #t.pattern = 'test/server/**/*_test.rb'
  t.warning = true
  #t.verbose = true
  t.test_files = FileList['test/**/*_test.rb']

  pp t
end
