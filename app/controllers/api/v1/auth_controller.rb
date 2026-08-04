# frozen_string_literal: true

class Api::V1::AuthController < ApplicationController
  before_action :authenticate_user!, only: [ :update_name ]

  def request_otp
    return render json: { message: "OTP sent" } if otp_request_params[:website].present?

    user = User.find_or_initialize_by(email: otp_request_params[:email])
    if user.persisted? && user.otp_expires_at.present? && user.otp_expires_at > 1.minute.ago
      render json: { error: "Please wait before requesting another code" }, status: :too_many_requests
      return
    end

    if user.save
      user.generate_otp!
      UserMailer.otp_email(user).deliver_now
      render json: { message: "OTP sent" }
    else
      render json: { error: user.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  def verify_otp
    user = User.find_by(email: otp_verify_params[:email])
    if user&.verify_otp(otp_verify_params[:code])
      user.start_session!
      render json: { token: user.session_token, name: user.name }
    else
      render json: { error: "Invalid or expired code" }, status: :unauthorized
    end
  end

  def update_name
    current_user.update!(user_name_params)
    render json: { name: current_user.name }
  end


  private

  def otp_request_params
    params.require(:auth).permit(:email, :website)
  end

  def otp_verify_params
    params.require(:auth).permit(:email, :code)
  end

  def user_name_params
    params.require(:auth).permit(:name)
  end
end
