require 'spec_helper'

describe User do

  before do
    @user = User.new(name: "Example User", email: "user@example.com",
                     password: "foobar", password_confirmation: "foobar")
  end

  let(:json) { @user.as_json except: [:id, :admin, :created_at, :updated_at, :password_digest, :remember_token] }
  let(:json_full) { @user.as_json }

  it 'can be build from json' do
      User.new json
  end

  it 'cannot be build from fulljson' do
    expect do
    User.new json_full
    end.should raise_error(ActiveModel::MassAssignmentSecurity::Error)
  end

  it 'contains json' do
    j = @user.as_json
    j.nil?.should_not==true
  end


end
