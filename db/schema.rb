# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_11_175037) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "quizzes", force: :cascade do |t|
    t.string "title", null: false
    t.string "quiz_type", null: false
    t.text "description", null: false
    t.integer "quiz_timer", null: false
    t.string "permalink"
    t.string "answer_type"
    t.string "hint_heading"
    t.string "answer_heading"
    t.string "extra_heading"
    t.string "category", null: false
    t.bigint "quiz_author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quiz_author_id"], name: "index_quizzes_on_quiz_author_id"
    t.index ["title"], name: "index_quizzes_on_title", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "quizzes", "users", column: "quiz_author_id"
end
