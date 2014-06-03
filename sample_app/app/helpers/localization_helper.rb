module LocalizationHelper
  def translate2(key, options = {})

    if (I18n.exists?(key))
      return I18n.translate(key)
    end

    if key[0]==='.'
      v = key[1..-1]
    else
      v = key
    end

    return v

  end

  alias :t2 :translate2

end
