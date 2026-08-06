class CheerPostTag < ApplicationRecord
  belongs_to :cheer_post
  belongs_to :tag
end
