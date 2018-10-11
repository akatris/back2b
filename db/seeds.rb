# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(id: 1, username: "admin", role: "admin", password: "password", password_confirmation: 'password')

class_1 = Pcop::Category.create(id: 1, name: "comptes des fonds", description: "empty")
pcop_13 = class_1.accounts.create!(id: 13, name: "subventions d'équipement", description: "empty")
pcop_132 = pcop_13.sub_accounts.create!(id: 132, name: "utilisation de FCV en investissement")
pcop_139 = pcop_13.sub_accounts.create!(id: 139, name: "subvention d'investissement transférée au compte de résultat")

pcop_14 = class_1.accounts.create!(id: 14, name: "céssion d'immobilisations", description: "empty")
pcop_15 = class_1.accounts.create!(id: 15, name: "Provision pour charges - passifs non courants", description: "empty")
pcop_16 = class_1.accounts.create!(id: 16, name: "emprunts et dettes assimilés", description: "empty")
pcop_17 = class_1.accounts.create!(id: 17, name: "dettes rattachées à des participations", description: "empty")

Pcop::Category.create(id: 2, name: "comptes des immobilisations", description: "empty")
Pcop::Category.create(id: 6, name: "comptes des charges", description: "empty")
Pcop::Category.create(id: 7, name: "comptes des produits", description: "empty")

if Rails.env.development?
  # Create a simple user for testing
  user = User.create!(username: 'sitraka', role: 'basic', password: 'password', password_confirmation: 'password')
  supply = Supply.create!(available: 100000)
  establishment = supply.create_establishment(name: 'CAFPA')
  user.establishment = establishment
  user.save
  20.times do |n|true
    User.create(username: Faker::Internet.username, role: "basic",
      password: 'password', password_confirmation: 'password')
  end
end
