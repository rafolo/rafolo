puts 'development.rb'
(1..3).each do |i|
  Alarm.create!("name" => "test#{i}", "description" => "test#{i}", "active" => false, "born" => Time.now)
end