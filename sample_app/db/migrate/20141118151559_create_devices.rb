class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :gid, null: false
      t.string :name, null: false
      t.string :description
      t.references :device_type
      t.references :nodes

      t.timestamps
    end
    add_index :devices, :device_type_id
    add_index :devices, :node_id
  end
end
