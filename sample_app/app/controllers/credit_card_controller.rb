
class CreditCardController < ApplicationController

  has_menu2 "Payments", "/credit_card/index", :enabled => true, "Default" => "/credit_card/index", "Transactions" => "/credit_card/transactions"
  def self.enabled?
    true
  end

  def index
  end

  def transactions
  end

end

