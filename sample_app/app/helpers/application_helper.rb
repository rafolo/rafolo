module ApplicationHelper

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

end
