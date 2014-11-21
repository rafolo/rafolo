class CreateDeviceTypes < ActiveRecord::Migration
  def change
    create_table :device_types do |t|
      t.string :description, null: false

      t.timestamps
    end
  end
end
