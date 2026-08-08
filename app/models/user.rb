class User < ApplicationRecord
  attr_accessor :otp_code

  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  has_many :moments
  has_many :cheer_posts

  def generate_otp!
    code = rand(100000..999999).to_s
    self.otp_code = code
    update!(otp_code_digest: BCrypt::Password.create(code), otp_expires_at: 10.minutes.from_now)
  end

  def verify_otp(code)
    return false if otp_expires_at.nil? || otp_expires_at < Time.current
    return false if otp_code_digest.nil?
    return false if failed_otp_attempts.to_i >= 5

    valid = BCrypt::Password.new(otp_code_digest) == code
    if valid
      clear_otp!
    else
      increment!(:failed_otp_attempts)
    end

    valid
  end

  def clear_otp!
    update!(otp_code_digest: nil, otp_expires_at: nil, failed_otp_attempts: 0)
  end

  def start_session!
    update!(session_token: SecureRandom.hex(32))
  end
end
