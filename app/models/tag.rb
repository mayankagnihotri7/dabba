class Tag < ApplicationRecord
  has_many :cheer_post_tags
  has_many :cheer_posts, through: :cheer_post_tags

  before_validation do
    self.name = name.to_s.strip.downcase
  end

  validates :name, presence: true, uniqueness: true
end
