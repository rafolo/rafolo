require 'spec_helper'

describe DeviceType do
  describe 'default device types' do
    it ' should be populated' do
      types = DeviceType.all

      types[0].id.should eq 1
      types[0].description.should eq 'GPS Device'

      types[1].id.should eq 2
      types[1].description.should eq 'GSM Device'
    end
  end

end
