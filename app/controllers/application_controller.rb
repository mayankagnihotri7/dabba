class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def current_user
    @curent_user ||= User.find_by(session_token: request.headers["Authorization"])&.remove("Bearer ")
  end

  def authenticate_user!
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_user
  end
end
