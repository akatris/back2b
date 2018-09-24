# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_24_122001) do

  create_table "establishments", force: :cascade do |t|
    t.string "name", limit: 255
    t.integer "supply_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_establishments_on_name", unique: true
    t.index ["supply_id"], name: "index_establishments_on_supply_id", unique: true
  end

  create_table "pcop_accounts", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "pcop_category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_pcop_accounts_on_name", unique: true
    t.index ["pcop_category_id"], name: "index_pcop_accounts_on_pcop_category_id"
  end

  create_table "pcop_categories", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_pcop_categories_on_name", unique: true
  end

  create_table "pcop_rubrics", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.text "eligible_transactions"
    t.integer "pcop_sub_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_pcop_rubrics_on_name", unique: true
    t.index ["pcop_sub_account_id"], name: "index_pcop_rubrics_on_pcop_sub_account_id"
  end

  create_table "pcop_sub_accounts", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "pcop_account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_pcop_sub_accounts_on_name", unique: true
    t.index ["pcop_account_id"], name: "index_pcop_sub_accounts_on_pcop_account_id"
  end

  create_table "supplies", force: :cascade do |t|
    t.decimal "available", precision: 12, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", limit: 32
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
