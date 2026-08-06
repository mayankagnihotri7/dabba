class CreateCheerPosts < ActiveRecord::Migration[8.1]
  def change
    create_table :cheer_posts do |t|
      t.references :user, null: false, foreign_key: true
      t.text :body

      t.timestamps
    end
  end
end
