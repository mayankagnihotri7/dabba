require "rails_helper"

RSpec.describe "Api::V1::Auth", type: :request do
  describe "#request_otp" do
    it "creates a new user and generates an OTP" do
      expect {
        post "/api/v1/auth/request_otp", params: { auth: { email: "test@example.com" } }
      }.to change(User, :count).by(1)

      expect(response).to have_http_status(:ok)
      user = User.find_by(email: "test@example.com")
      expect(user.otp_code_digest).to be_present
    end

    it "rejects invalid phone number" do
      post "/api/v1/auth/request_otp", params: { auth: { email: "not-an-email" } }
      expect(response).to have_http_status(:unprocessable_content)
    end

    it "does not create a user when the honeypot field is filled" do
      expect {
        post "/api/v1/auth/request_otp", params: { auth: { email: "spam@example.com", website: "spam" } }
      }.not_to change(User, :count)
    end
  end

  describe "#verify_otp" do
    let(:user) { create(:user) }

    before { user.generate_otp! }

    it "returns a session token for a correct code" do
      post "/api/v1/auth/verify_otp", params: { auth: { email: user.email, code: user.otp_code } }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["token"]).to be_present
    end

    it "rejects an incorrect code" do
      post "/api/v1/auth/verify_otp", params: { auth: { email: user.email, code: "000000" } }

      expect(response).to have_http_status(:unauthorized)
    end

    it "locks out after 5 failed attempts" do
      5.times { post "/api/v1/auth/verify_otp", params: { auth: { email: user.email, code: "000000" } } }
      post "/api/v1/auth/verify_otp", params: { auth: { email: user.email, code: user.otp_code } }

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
