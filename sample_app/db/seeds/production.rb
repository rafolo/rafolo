puts 'production.rb'

User.create!("email" => "admin@pkey.pl", "name" => "Admin", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "olgierd.falat@gmail.com", "name" => "Olgierd", "password" => "123456", "password_confirmation" => "123456")
User.create!("email" => "vasabi-rafolo@rhcloud.com", "name" => "Default User", "password" => "123456", "password_confirmation" => "123456")
