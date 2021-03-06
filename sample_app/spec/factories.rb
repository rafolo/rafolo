FactoryGirl.define do
  factory :user do
    sequence(:name)  { |n| "rafal #{n}" }
    sequence(:email) { |n| "rafal_#{n}@pkey.pl" }
    password "123456"
    password_confirmation "123456"

    factory :admin do
      admin true
    end
  end

  factory :micropost do
    content "Lorem ipsum"
    association :user
  end

  factory :node do
    sequence(:name)  { |n| "Name #{n}" }
    sequence(:description)  { |n| "Description #{n}" }

    association :users
  end
end