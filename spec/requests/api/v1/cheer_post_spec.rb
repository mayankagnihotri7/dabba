require "rails_helper"

RSpec.describe "Api::V1::CheerPosts", type: :request do
  let(:user) { create(:user) }

  before { user.start_session! }

  let(:headers) { { "Authorization" => "Bearer #{user.session_token}" } }

  describe "#index" do
    it "returns posts without exposing user id" do
      create(:cheer_post, user:, body: "something good")

      get "/api/v1/cheer_posts", headers: headers

      json = JSON.parse(response.body)
      expect(response).to have_http_status(:ok)
      expect(json.first).not_to have_key("user_id")
    end
  end

  describe "#create" do
    it "creates a post with tags" do
      expect {
        post "/api/v1/cheer_posts", params: { cheer_post: { body: "great day !#work !#win", tags: %w[work win] } },
        headers: headers
      }.to change(CheerPost, :count).by(1).and change(Tag, :count).by(2)
    end

    it "creates a post with no tags" do
      expect {
        post "/api/v1/cheer_posts", params: { cheer_post: { body: "no tag post" } }, headers: headers
      }.to change(CheerPost, :count).by(1)
    end

    it "rejects a post with more than 5 tags" do
      post "/api/v1/cheer_posts", params: { cheer_post: { body: "too many tags post", tags: %w[a b c d e f] } }, headers: headers
      expect(response).to have_http_status(:unprocessable_content)
    end

    it "requires authentication" do
      post "/api/v1/cheer_posts", params: { cheer_post: { body: "no auth" } }
      expect(response).to have_http_status(:unauthorized)
    end

    it "rejects a post with tag length of more than 30" do
      post "/api/v1/cheer_posts", params: { cheer_post: { body: "too length of tags post", tags: [ "h" * 31 ] } }, headers: headers
      expect(response).to have_http_status(:unprocessable_content)
    end
  end
end
