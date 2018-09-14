module Pcop
  def self.table_name_prefix
    'pcop_'
  end

  def self.type(id)
    case id.to_s.length
    when 1 then Pcop::Category
    when 2 then Pcop::Account
    when 3 then Pcop::SubAccount
    when 4 then Pcop::Rubric
    else nil
    end
  end

  # TODO: Write custom validator to check validity of pcop type
  #       which will be saved(uniqueness of ids and names).
  class Form
    include ActiveModel::Model
    attr_accessor :id, :name, :description, :eligible_transactions
    validates     :id, presence: true, format: {
                    with: /\A[1-7][\d]{0,3}\z/
                  }
    validates     :name, presence: true

    def save_based_on_id
      id = self.id.to_s
      type = Pcop::type id
      if type == Pcop::Category
        Pcop::Category.create id: id[0], name: self.name,
                              description: self.description
      elsif type == Pcop::Account
        category = Pcop::Category.find id[0]
        category.accounts.create id: id, name: self.name,
                                  description: self.description
      elsif type == Pcop::SubAccount
        account = Pcop::Account.find id[0, 2]
        account.sub_accounts.create id: id, name: self.name,
                                    description: self.description
      elsif type == Pcop::Rubric
        sub_account = Pcop::SubAccount.find id[0, 3]
        sub_account.rubrics.create id: id, name: self.name,
          description: self.description,
          eligible_transactions: self.eligible_transactions
      end
    end
  end
end
