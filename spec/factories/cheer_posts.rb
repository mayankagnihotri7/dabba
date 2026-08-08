FactoryBot.define do
  factory :cheer_post do
    user
    body { "something good happened" }
  end
end
