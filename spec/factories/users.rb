FactoryBot.define do
  factory :user do
    sequence(:phone_number) { |n| "9#{n.to_s.rjust(9, '0')}" }
  end
end
