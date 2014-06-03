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

  def translate2_link(link)
    if (link.include?('locale'))
      return link
    end

    if (!link.include?('?'))
      link+='?'
    end

    return link += "locale=" + I18n.locale.to_s
  end

  alias :t2 :translate2
  alias :t2l :translate2_link

end
