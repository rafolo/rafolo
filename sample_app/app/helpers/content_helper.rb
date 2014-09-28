module ContentHelper
  include ActionView::Helpers::CaptureHelper
  def content_for_set(name, content = nil, &block)
    if content || block_given?
      content = capture(&block) if block_given?
      @view_flow.set(name, content) if content
      nil
    else
      @view_flow.get(name)
    end
  end
end