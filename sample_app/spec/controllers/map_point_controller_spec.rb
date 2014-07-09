require 'spec_helper'

describe MapPointController do

  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      response.should be_success
    end
  end

  #TODO! Test realthing
  # describe "GET 'history'" do
  #   it "returns http success" do
  #     get 'history'
  #     response.should be_success
  #   end
  # end

end
