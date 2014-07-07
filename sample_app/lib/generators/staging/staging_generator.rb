class StagingGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)

  def copy_staging_file
    copy_file "files/staging.rb", "config/environments/#{file_name}.rb"
    copy_file "files/staging.rb", "config/environments/#{file_name}-adm.rb"

    str =  %Q{
#TODO! Change your db
local_production_mysql: &local_production_mysql
  adapter: mysql2
  encoding: utf8
  database: vasabi
  username: vasabi
  password: vasabi
  host: 127.0.0.1
  port: 3306

#TODO! Change name if !metter
#{file_name}:
  <<: *local_production_mysql
  database: "#{file_name}"

#{file_name}-adm:
  <<: *local_production_mysql
  database: "#{file_name}"
  username: root
  password:
}

    append_to_file 'config/database.yml', str

  end

end
