class CreateNodes < ActiveRecord::Migration
  def change
    create_table :nodes do |t|
      t.string :name
      t.string :description

      t.timestamps
    end

    create_table :nodes_users, id: false do |t|
      t.belongs_to :node
      t.belongs_to :user
    end

    add_index :nodes_users, [:node_id, :user_id], :unique => true
  end
end
