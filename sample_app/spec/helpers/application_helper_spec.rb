require 'spec_helper'

describe ApplicationHelper do
  
  describe "full_title" do
    it "should include default app title" do

      str = SampleApp::Application.config.app_config["app_title"].to_s
      full_title('').should include (str)
    end

    it "should include app title" do

      str = SampleApp::Application.config.app_config["app_title"].to_s

      #TODO! One day create matcher , see custom_matchers.rb
      #full_title('foo').should =~ str
      full_title(str).should include (str)
    end

    it "should include the base title" do

      str = SampleApp::Application.config.app_config["landscape_title"].to_s

      #TODO! One day create matcher , see custom_matchers.rb
      #full_title('foo').should =~ str
      full_title(str).should include (str)
    end

    it "should not include a bar on the home page" do
      full_title('').should_not =~ /\|/
    end
  end
end