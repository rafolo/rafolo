module LocalizationHelper
  def translate2(key, options = {})

    if key[0]==='.'
      key = key[1..-1]
    end

    return I18n.translate(key, :default => key)

  end

  alias :t2 :translate2

end
