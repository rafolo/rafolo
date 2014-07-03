class StagingGenerator < Rails::Generators::NamedBase
  source_root File.expand_path('../templates', __FILE__)

  def copy_staging_file
    copy_file "files/staging.rb", "config/environments/#{file_name}.rb"
  end
end
