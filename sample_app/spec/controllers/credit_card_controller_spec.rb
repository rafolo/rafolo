require 'spec_helper'

describe CreditCardController do

  describe "GET 'index'" do
    it "returns http success" do
      get 'index'
      response.should be_success
    end
  end

  describe "GET 'transactions'" do
    it "returns http success" do
      get 'transactions'
      response.should be_success
    end
  end

end
