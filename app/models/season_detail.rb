class SeasonDetail
  include ActiveModel::Model
  attr_accessor :data

  def initialize(attributes={})
    super
    @data = build_data
  end

  private
    def build_data
      data = []
      categories = Pcop::Category.all
      categories.each do |category|
        data.push category
        category.accounts.each do |account|
          data.push account
          account.sub_accounts.each do |sub_account|
            data.push sub_account
            sub_account.rubrics.each do |rubric|
              data.push rubric
            end
          end
        end
      end
      data
    end
end
