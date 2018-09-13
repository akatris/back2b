module Pcop
  def self.table_name_prefix
    'pcop_'
  end

  def self.type(id)
    case id.to_s.length
    when 1 then Pcop::Category
    when 2 then Pcop::Account
    else nil
    end
  end
end
