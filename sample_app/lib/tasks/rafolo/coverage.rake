namespace :coverage do

  #TODO! Reactivate commented and test
  # desc 'Generates a coverage report'
  # task :lib do
  #   ENV['COVERAGE'] = 'true'
  #   Rake::Task['lib'].execute
  # end
  #
  # desc 'Generates a coverage report'
  # task :models do
  #   ENV['COVERAGE'] = 'true'
  #   Rake::Task['models'].execute
  # end
  #
  # desc 'Generates a coverage report'
  # task :helpers do
  #   ENV['COVERAGE'] = 'true'
  #   Rake::Task['helpers'].execute
  # end
  #
  # desc 'Generates a coverage report'
  # task :controllers do
  #   ENV['COVERAGE'] = 'true'
  #   Rake::Task['controllers'].execute
  # end
  #
  # desc 'Generates a coverage report'
  # task :requests do
  #   ENV['COVERAGE'] = 'true'
  #   Rake::Task['requests'].execute
  # end
  #
  # desc 'Generates a coverage report'
  # task :routing do
  #   ENV['COVERAGE'] = 'true'
  #   Rake::Task['routing'].execute
  # end
  #
  # desc 'Generates a coverage report'
  # task :view do
  #   ENV['COVERAGE'] = 'true'
  #   Rake::Task['view'].execute
  # end
  #
  desc 'Generates a coverage report'
  task :spec do
    ENV['COVERAGE'] = 'true'
    Rake::Task['spec'].execute
  end

end