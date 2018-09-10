class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, length: {minimum: 3}
  validates :password, length: {minimum: 6}

  class << self
    def digest(password)
      cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                    BCrypt::Engine.cost
      BCrypt::Password.create(password, cost: cost)
    end
  end
end
