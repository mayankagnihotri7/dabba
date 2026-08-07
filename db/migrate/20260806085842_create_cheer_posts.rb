class CreateCheerPosts < ActiveRecord::Migration[8.1]
  def change
    create_table :cheer_posts, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
