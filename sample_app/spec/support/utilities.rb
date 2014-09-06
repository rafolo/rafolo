include ApplicationHelper
include LocalizationHelper

def sign_in(user)
  visit signin_path
  fill_in "session[email]",    with: user.email
  fill_in "session[password]", with: user.password
  click_button t2(".Sign in")
  # Sign in when not using Capybara.
  cookies[:remember_token] = user.remember_token
end

def sign_out
  visit signout_path
  cookies[:remember_token] = nil
end

def localize_path link
  #TODO! For now we are just appending locale, get if from params
  link+="?locale=en"
  return link
end