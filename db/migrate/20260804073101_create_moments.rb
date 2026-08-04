class CreateMoments < ActiveRecord::Migration[8.1]
  def change
    create_table :moments do |t|
      t.references :user, null: false, foreign_key: true
      t.string :mood

      t.timestamps
    end
  end
end
