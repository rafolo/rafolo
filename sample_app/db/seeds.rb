# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create("email"=>"rafal@pkey.pl", "name"=>"Rafal", "password"=>"password", "password_confirmation"=>"password");
User.create("email"=>"rafal1@pkey.pl", "name"=>"Rafal1", "password"=>"password", "password_confirmation"=>"password");
User.create("email"=>"rafal2@pkey.pl", "name"=>"Rafal2", "password"=>"password", "password_confirmation"=>"password");

