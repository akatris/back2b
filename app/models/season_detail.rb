<<<<<<< HEAD
class SeasonDetail
  include ActiveModel::Model
  attr_accessor :data, :season

  def initialize(attributes={})
    super
    @season = Season.first
    @data = build_data @season
  end

  private
    def transform_to_hash(rubric, season)
      rubric_hash = {
        id: rubric.id,
        name: rubric.name,
        description: rubric.description,
      }
      if Pcop::type(rubric) == Pcop::Rubric
        rubric_hash[:eligible_transactions] = rubric.eligible_transactions
        rubric_hash[:budget_item] = rubric.get_budget_item(season)
      end
      
      debugger
      return rubric_hash
    end

    def build_data(season)
      data = []
      categories = Pcop::Category.all
      categories.each do |category|
        data.push transform_to_hash(category, season)
        category.accounts.each do |account|
          data.push transform_to_hash(account, season)
          account.sub_accounts.each do |sub_account|
            data.push transform_to_hash(sub_account, season)
            sub_account.rubrics.each do |rubric|
              data.push transform_to_hash(rubric, season)
            end
          end
        end
      end
     return data
    end
end
||||||| merged common ancestors
=======
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
>>>>>>> 3b71c4a8f346abb134d3b303c663a27e1d53d142
