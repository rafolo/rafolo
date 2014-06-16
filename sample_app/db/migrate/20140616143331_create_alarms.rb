class CreateAlarms < ActiveRecord::Migration
  def change
    create_table :alarms do |t|
      t.string :name
      t.string :description
      t.datetime :born
      t.boolean :active

      t.timestamps
    end
  end
end
