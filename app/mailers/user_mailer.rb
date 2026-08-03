class UserMailer < ApplicationMailer
  def otp_email(user)
    @otp_code = user.otp_code
    mail(to: user.email, subject: "Your Dabba code: #{@otp_code}")
  end
end
