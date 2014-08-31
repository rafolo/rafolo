# Because of the Ruby 2.0 privatizes the method and  Rails 3.2.12's use of it
# , and because Rails 3.2.13 (which has a fix) also could potentially
# introduce other bugs, we're adding this patch to fix the issue.
#
# Remove this if the project contains Rails >= 3.2.13
module ActiveModel
  class Errors
    public :initialize_dup
  end

  module Validations
    public :initialize_dup
  end
end

class ActiveRecord::Base
  public :initialize_dup
end