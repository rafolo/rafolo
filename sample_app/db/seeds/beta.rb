puts 'beta.rb'

  User.create!("email" => "rafal@pkey.pl", "name" => "Rafal", "password" => "123456", "password_confirmation" => "123456")
  User.create!("email" => "olgierd.falat@gmail.com", "name" => "Olgierd", "password" => "123456", "password_confirmation" => "123456")
  User.create!("email" => "vasabi-rafolo@rhcloud.com", "name" => "Default User", "password" => "123456", "password_confirmation" => "123456")

  (1..3).each do |i|
    Alarm.create!("name" => "beta#{i}", "description" => "test#{i}", "active" => false, "born" => Time.now)
  end