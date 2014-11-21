#require File.expand_path("../../../config/environment.rb", __FILE__)

puts 'development.rb'

User.delete_all
user = User.create!("email" => "rafal@pkey.pl", "name" => "Rafal", "password" => "123456", "password_confirmation" => "123456")

user = User.new("email" => "olgierd.falat@gmail.com", "name" => "Olgierd", "password" => "123456", "password_confirmation" => "123456")
user.admin = true
user.save()

User.create!("email" => "vasabi-rafolo@rhcloud.com", "name" => "Default User", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "sample-user1@gmail.com", "name" => "Sample User 1", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "sample-user2@gmail.com", "name" => "Sample User 2", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "sample-user3@gmail.com", "name" => "Sample User 3", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "sample-user4@gmail.com", "name" => "Sample User 4", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "sample-user5@gmail.com", "name" => "Sample User 5", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "sample-user6@gmail.com", "name" => "Sample User 6", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "sample-user7@gmail.com", "name" => "Sample User 7", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "sample-user8@gmail.com", "name" => "Sample User 8", "password" => "123456", "password_confirmation" => "123456")
(1..3).each do |i|

  user.microposts << Micropost.create(:content => "micropost#{i}")

  Alarm.create!("name" => "dev#{i}", "description" => "test#{i}", "active" => false, "born" => Time.now)
end

user.save!