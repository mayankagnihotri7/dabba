class Api::V1::MomentsController < ApplicationController
  before_action :authenticate_user!

  def create
    moment = current_user.moments.new(mood: moment_params[:mood])

    if moment.save
      render json: { mood: moment.mood }
    else
      render json: { error: moment.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  private

  def moment_params
    params.require(:moment).permit(:mood)
  end
end
