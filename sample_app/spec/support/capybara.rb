require 'capybara-screenshot'
require 'capybara-screenshot/rspec'

def opage! filename=nil

  puts "Testing #{page.current_path}"



  screenshot_and_open_image

end

def spage! filename=nil

  puts "Testing #{page.current_path}"

  # path = "page" + page.current_path.strip.gsub(/\W+/, '.')
  # default_filename = "#{Rails.root.join("tmp")}/#{path}-#{Time.now.to_s(:number)}.png"
  #
  # filename ||= default_filename
  screenshot_and_save_page

end

#TODO! Annotate image or path with error desc 1
Capybara::Screenshot.register_filename_prefix_formatter(:rspec) do |example|
  # meta = example.metadata
  # filename = File.basename(meta[:file_path])
  # line_number = meta[:line_number]
  # desc = meta[:full_description].gsub(/\W+/, "-")[0..64]

  "#{Rails.root.join("tmp")}/capybara/" + "fail-#{example.description.gsub(' ', '-').gsub(/^.*\/spec\//, '')}"
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

Capybara.default_selector = :css

Capybara.register_driver :selenium do |app|
  require 'selenium/webdriver'

  if OS.linux?
    if (File.exists?("/vagrant/bin/ff.sh"))
      Selenium::WebDriver::Firefox::Binary.path = "/vagrant/bin/ff.sh"
    else
      #NOP TODO Override this line for travis firefox location
    end
  elsif OS.mac?
    Selenium::WebDriver::Firefox::Binary.path = "/Applications/Firefox.app/Contents/MacOS/firefox-bin"
  else
    raise "Unknown Capybara test platform"
  end

  Capybara::Selenium::Driver.new(app, :browser => :firefox)
end