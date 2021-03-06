class CreateNodes < ActiveRecord::Migration
  def change
    create_table :nodes do |t|
      t.string :name, null: false
      t.string :description, null: false

      t.timestamps
    end

    create_table :nodes_users, id: false do |t|
      t.belongs_to :nodes
      t.belongs_to :user
    end

    add_index :nodes_users, [:node_id, :user_id], :unique => true
  end
end
