class CheerPost < ApplicationRecord
  belongs_to :user
  has_many :cheer_post_tags
  has_many :tags, through: :cheer_post_tags

  validates :body, presence: true, length: { maximum: 280 }
end
