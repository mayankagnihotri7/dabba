# frozen_string_litera: true

class Api::V1::StatsController < ApplicationController
  def index
    render json: {
      total_moments: Moment.count,
      total_cheer_posts: CheerPost.count,
      mood_breakdown: Moment.group(:mood).count,
      moments_last_7_days: Moment.where(created_at: 7.days.ago..).count
    }
  end
end
