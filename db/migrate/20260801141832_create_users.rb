class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :otp_code_digest
      t.datetime :otp_expires_at
      t.string :session_token
      t.string :name
      t.integer :failed_otp_attempts

      t.timestamps
    end
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
