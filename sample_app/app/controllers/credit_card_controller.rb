
class CreditCardController < ApplicationController

  has_menu2 "Payments", "/credit_card/index", :enabled => true, :icon => 'icon-money', :order => 30,
            :children => [ MenuItem.new('Default', '/credit_card/index', true, 'icon-money', 1),
                           MenuItem.new('Transactions', '/credit_card/transactions', true, 'icon-exchange', 1)
            ]

  def self.enabled?
    true
  end

  def index
  end

  def transactions
  end

end

