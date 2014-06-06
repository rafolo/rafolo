require 'extensions/menu/menu_module.rb'

class CreditCardController < ApplicationController
  #menu
  has_menu2 "Payments", "/credit_card/index", :enabled => true, "Default" => "/credit_card/index", "Transactions" => "/credit_card/transactions"
  def self.enabled?
    true
  end

  def index
  end

  def transactions
  end

end

