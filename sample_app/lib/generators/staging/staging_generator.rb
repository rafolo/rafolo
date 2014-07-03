class StagingGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)

  def copy_staging_file
    copy_file "files/staging.rb", "config/environments/#{file_name}.rb"

    str =  %Q{

#TODO! Change name if !metter
#{file_name}:
  <<: *local_production_mysql
  database: "#{file_name}"
}

    append_to_file 'config/database.yml', str

  end

end
