class Api::V1::MomentsController < ApplicationController
  before_action :authenticate_user!

  def create
    moment = current_user.moments.new(mood: moment_params[:mood])

    if moment.save
      render json: { mood: moment.mood }
    else
      render json: { error: moment.errors.full_messages.first }, status: :unprocessable_entity
    end
  rescue ArgumentError
    render json: { error: "Invalid mood" }, status: :unprocessable_entity
  end

  def streak
    dates = current_user.moments.distinct.pluck(Arel.sql("DATE(created_at)")).sort.reverse
    streak = 0
    expected = Date.current

    dates.each do |date|
      break unless date == expected
      streak += 1
      expected += 1
    end

    render json: { streak: }
  end

  private

  def moment_params
    params.require(:moment).permit(:mood)
  end
end
