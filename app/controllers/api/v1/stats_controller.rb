# frozen_string_litera: true

class Api::V1::StatsController < ApplicationController
  def index
    render json: {
      total_moments: Moment.size,
      total_cheer_posts: CheerPost.size,
      mood_breakdown: Moment.group(:mood).size,
      moments_last_7_days: Moment.where(created_at: 7.days.ago..).size
    }
  end
end
