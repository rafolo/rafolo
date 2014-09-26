
class CreditCardController < ApplicationController

  has_menu2 "Payments", "/credit_card/index", :enabled => true, :icon => 'icon-money', :order => 40,
            :children => [ MenuItem.new('Default', '/credit_card/index', true, 'icon-money'),
                           MenuItem.new('Transactions', '/credit_card/transactions', true, 'icon-exchange')
            ]

  def self.enabled?
    true
  end

  def index
  end

  def transactions
  end

end

