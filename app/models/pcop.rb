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

  class Form
    include ActiveModel::Model
    attr_accessor :id, :name, :description
    validates     :id, presence: true, format: { with: /\A[1-7][\d]{0,3}\z/ }
  end
end
