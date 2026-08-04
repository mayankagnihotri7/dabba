class Moment < ApplicationRecord
  enum :mood, %i[stressed tired neutral good].index_by(&:itself)

  belongs_to :user
end
