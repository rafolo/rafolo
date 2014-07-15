require 'capybara-screenshot'
require 'capybara-screenshot/rspec'

def page! filename=nil

  puts "Testing #{page.current_path}"

  # path = "page" + page.current_path.strip.gsub(/\W+/, '.')
  # default_filename = "#{Rails.root.join("tmp")}/#{path}-#{Time.now.to_s(:number)}.png"
  #
  # filename ||= default_filename
  #screenshot_and_save_page

  screenshot_and_open_image

end

#TODO! Annotate image or path with error desc 1
Capybara::Screenshot.register_filename_prefix_formatter(:rspec) do |example|
  # meta = example.metadata
  # filename = File.basename(meta[:file_path])
  # line_number = meta[:line_number]
  # desc = meta[:full_description].gsub(/\W+/, "-")[0..64]

  "fail-#{example.description.gsub(' ', '-').gsub(/^.*\/spec\//,'')}"
end

#TODO! Annotate image or path with error desc 2
# RSpec.configure do |config|
#   config.after(:each) do
#     if example.exception && example.metadata[:js]
#       meta = example.metadata
#       filename = File.basename(meta[:file_path])
#       line_number = meta[:line_number]
#       screenshot_name = "failed-#{filename}-#{line_number}.txt"
#       screenshot_path = "#{Rails.root.join("tmp")}/capybara/#{screenshot_name}"
#
#       desc = meta[:full_description] + "\n  Screenshot: #{screenshot_path}"
#
#       File.open(screenshot_path, "w") { |file| file.write desc }
#     end
#   end
# end