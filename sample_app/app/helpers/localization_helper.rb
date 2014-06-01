module LocalizationHelper
  def translate2(key, options = {})

    if key[0]==='.'
      v = key[1..-1]
    end

    translation = I18n.translate(key, :default => nil)

    return translation

  end

  alias :t2 :translate2

end
