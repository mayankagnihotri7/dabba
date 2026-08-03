require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe "#otp_email" do
    let(:user) { create(:user) }

    before { user.generate_otp! }

    let(:mail) { UserMailer.otp_email(user) }

    it "sends to the right email with the right subject" do
      expect(mail.to).to eq([ user.email ])
      expect(mail.subject).to eq("Your Dabba code: #{user.otp_code}")
    end

    it "includes the code in the body" do
      expect(mail.body.encoded).to include(user.otp_code)
    end
  end
end
