class CheerPost < ApplicationRecord
  validates :body, presence: true, length: { maximum: 280 }

  belongs_to :user
  has_many :cheer_post_tags
  has_many :tags, through: :cheer_post_tags

  scope :recent, -> { order(created_at: :desc) }
  scope :for_user, ->(user_id) { where(user_id: user_id) }
end
