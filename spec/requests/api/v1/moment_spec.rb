require "rails_helper"

RSpec.describe "Api::V1::Moment", type: :request do
  describe "#create" do
  let(:user) { create(:user) }

  before { user.start_session! }

    it "creates a new moment" do
      expect {
        post "/api/v1/moments", params: { moment: { mood: "good" } }, headers: { "Authorization" => "Bearer #{user.session_token}" }
      }.to change(Moment, :count).by(1)

      expect(response).to have_http_status(:ok)
      moment = Moment.find_by(user_id: user)
      expect(moment.mood).to eq("good")
    end

    it "rejects wrong param" do
      post "/api/v1/moments", params: { moment: { mood: "bad" } }, headers: { "Authorization" => "Bearer #{user.session_token}" }
      expect(response).to have_http_status(:unprocessable_content)
    end
  end
end
