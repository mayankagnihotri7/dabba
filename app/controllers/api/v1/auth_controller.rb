# frozen_string_literal: true

class Api::V1::AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def request_otp
    user = User.find_or_initialize_by(phone_number: otp_request_params[:phone_number])
    if user.persisted? && user.otp_expires_at.present? && user.otp_expires_at > 1.minute.ago
      render json: { error: "Please wait before requesting another code" }, status: :too_many_requests
      return
    end

    if user.save
      user.generate_otp!
      render json: { message: "OTP sent" }
    else
      render json: { error: user.errors.full_messages.first }, status: :unprocessable_entity
    end
  end

  def verify_otp
    user = User.find_by(phone_number: otp_verify_params[:phone_number])
    if user&.verify_otp(otp_verify_params[:code])
      user.start_session!
      render json: { token: user.session_token, name: user.name }
    else
      render json: { error: "Invalid or expired code" }, status: :unauthorized
    end
  end

  def update_name
    current_user.update!(user_name_params)
    render json: { name: curent_user.name }
  end


  private

  def otp_request_params
    params.permit(:phone_number)
  end

  def otp_verify_params
    params.permit(:phone_number, :code)
  end

  def user_name_params
    params.permit(:name)
  end
end
