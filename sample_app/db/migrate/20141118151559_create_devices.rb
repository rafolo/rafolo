class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :gid
      t.string :name
      t.string :description
      t.references :device_type
      t.references :node

      t.timestamps
    end
    add_index :devices, :device_type_id
    add_index :devices, :node_id
  end
end
