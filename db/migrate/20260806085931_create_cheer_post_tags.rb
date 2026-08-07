class CreateCheerPostTags < ActiveRecord::Migration[8.1]
  def change
    create_table :cheer_post_tags, id: :uuid do |t|
      t.references :cheer_post, null: false, foreign_key: true, type: :uuid
      t.references :tag, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
