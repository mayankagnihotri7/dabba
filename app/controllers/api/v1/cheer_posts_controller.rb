# frozen_string_literal: true

class Api::V1::CheerPostsController < ApplicationController
  before_action :authenticate_user!

  def index
    cheer_posts = CheerPost.all.recent
    cheer_posts = cheer_posts.for_user(current_user.id) if current_user && params[:mine_only]
    cheer_posts = cheer_posts.tagged(params[:tag]) if params[:tag].present?

    page = (params[:page] || 1).to_i
    per_page = 20
    cheer_posts = cheer_posts.limit(per_page).offset((page - 1) * per_page)

    render json: cheer_posts.as_json(
      except: [ :user_id ],
      include: :tags
    )
  end

  def create
    cheer_post = ActiveRecord::Base.transaction do
      cheer_post = current_user.cheer_posts.new(body: cheer_post_params[:body])

      cheer_post.tags = Array(cheer_post_params[:tags]).map do |tag_name|
        Tag.find_or_create_by!(name: tag_name)
      end

      cheer_post.save!
      cheer_post
    end

    render json: cheer_post.as_json(except: [ :user_id ], include: :tags), status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { error: e.record.errors.full_messages.first }, status: :unprocessable_entity
  end

  def destroy
    cheer_post = CheerPost.find(params[:id])
    return head :unauthorized unless cheer_post.user == current_user

    cheer_post.destroy
    head :no_content
  end

  private

  def cheer_post_params
    params.require(:cheer_post).permit(:body, tags: [])
  end
end
