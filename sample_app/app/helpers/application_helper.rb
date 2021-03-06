module ApplicationHelper
  #include SessionsHelper

  # Returns the full title on a per-page basis.
  #TODO! remove arg
  def full_title(page_title)
    base_title = SampleApp::Application.config.app_config["app_title"] + ' '
    base_title += '(' + SampleApp::Application.config.app_config["landscape_title"] + ')'

    base_title

    # TODO! Belowes are not used remove or use for some page
     if page_title.empty?
       base_title
     else
       "#{page_title}"
     end
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
    current_user.email unless !current_user
  end

end
