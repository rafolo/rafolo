puts 'development.rb'

User.create!("email" => "rafal@pkey.pl", "name" => "Rafal", "password" => "123456", "password_confirmation" => "123456")

(1..3).each do |i|
  Alarm.create!("name" => "dev#{i}", "description" => "test#{i}", "active" => false, "born" => Time.now)
end