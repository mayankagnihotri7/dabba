class CheerPost < ApplicationRecord
  validates :body, presence: true, length: { maximum: 280 }
  validate :maximum_tags

  belongs_to :user
  has_many :cheer_post_tags
  has_many :tags, through: :cheer_post_tags

  scope :recent, -> { order(created_at: :desc) }
  scope :for_user, ->(user_id) { where(user_id: user_id) }

  private

  def maximum_tags
    if tags.size > 5
      errors.add(:tags, "cannot have more than 5 tags")
    end
  end
end
