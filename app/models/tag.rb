class Tag < ApplicationRecord
  has_many :cheer_post_tags
  has_many :cheer_posts, through: :cheer_post_tags

  before_validation do
    self.name = name.to_s.strip.downcase
  end

  validates :name,
    presence: true,
    uniqueness: true,
    length: { maximum: 30 },
    format: {
      with: /\A[a-z0-9_]+\z/,
      message: "can only contain only letters, numbers and underscores"
    }
end
