class Tag < ApplicationRecord
  has_many :cheer_post_tags
  has_many :cheer_posts, through: :cheer_post_tags

  before_save { name.downcase!.strip! }
  validates :name, presence: true, uniqueness: true
end
