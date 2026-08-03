# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def otp_email
    user = User.new(email: "test@example.com")
    user.otp_code = "482913"
    UserMailer.otp_email(user)
  end
end
