#require File.expand_path("../../../config/environment.rb", __FILE__)

puts 'test.rb'

User.delete_all
user = User.create!("email" => "rafal@pkey.pl", "name" => "Rafal", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "olgierd.falat@gmail.com", "name" => "Olgierd", "password" => "123456", "password_confirmation" => "123456")

(1..3).each do |i|

  user.microposts << Micropost.create(:content => "micropost#{i}")

  Alarm.create!("name" => "dev#{i}", "description" => "test#{i}", "active" => false, "born" => Time.now)
end

user.save!