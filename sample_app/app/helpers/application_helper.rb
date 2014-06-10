module ApplicationHelper
  include SessionsHelper

  # Returns the full title on a per-page basis.
  def full_title(page_title)
    base_title = SampleApp::Application.config.app_config["app_title"] + ' '
    base_title += '(' + SampleApp::Application.config.app_config["landscape_title"] + ')'

    base_title

    # if page_title.empty?
    #   base_title
    # else
    #   "#{base_title} | #{page_title}"
    # end
  end

  def check_modernizer
    return raw "" if SampleApp::Application.config.check_modernizer

    raw %q{
    <script>
    window.onload = function () {
        if (!canvasSupported()) {
            window.location.replace("/406.html");
        }

        if (!localStorageSupported()) {
            window.location.replace("/406.html");
        }
    };

    function canvasSupported() {
        var canvas = document.createElement('canvas');
        return (canvas.getContext && canvas.getContext('2d'));
    }

    function localStorageSupported() {
        try {
            return ('localStorage' in window && window['localStorage'] != null);
        }
        catch(e) {}
        return false;
    }
  </script>
  }
  end

  def user_friendly_name
    current_user.email
  end

end
