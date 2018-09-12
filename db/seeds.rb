# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(id: 1, username: "admin", role: "admin", password: "password", password_confirmation: 'password')

class_1 = Pcop::Class.create(id: 1, name: "comptes des fonds", description: "empty")
class_1.accounts.create!(id: 11, name: "subventions d'équipement", description: "empty")
class_1.accounts.create!(id: 14, name: "céssion d'immobilisations", description: "empty")
class_1.accounts.create!(id: 15, name: "Provision pour charges - passifs non courants", description: "empty")
class_1.accounts.create!(id: 16, name: "emprunts et dettes assimilés", description: "empty")
class_1.accounts.create!(id: 17, name: "dettes rattachées à des participations", description: "empty")

Pcop::Class.create(id: 2, name: "comptes des immobilisations", description: "empty")
Pcop::Class.create(id: 6, name: "comptes des charges", description: "empty")
Pcop::Class.create(id: 7, name: "comptes des produits", description: "empty")

if Rails.env.development?
  20.times do |n|
    User.create(username: Faker::Internet.username, role: "basic",
      password: 'password', password_confirmation: 'password')
  end
end
