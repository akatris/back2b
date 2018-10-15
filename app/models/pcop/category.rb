class Pcop::Category < ApplicationRecord
  has_many  :accounts, class_name: 'Pcop::Account',
            foreign_key: 'pcop_category_id', inverse_of: 'pcop_category',
            dependent: :destroy
  validates :id, format: { with: /\A[1-7]{1}\z/ }, uniqueness: true
  validates :name, length: { maximum: 255 }, presence: true, uniqueness: true
  validates :description, length: { maximum: 255 }

  def as_json(options={})
    super(:only => [:id, :name, :description],
      :include => {
        :accounts => {
          :only => [:id, :name],
          :include => {
            :sub_accounts => {
              :only => [:id, :name],
              :include => {
                :rubrics => {
                  :only => [:id, :name]
                }
              }
            }
          }
        }
      }
    )
  end
end
