class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, length: {minimum: 3}
  validates :password, length: {minimum: 6}
end
