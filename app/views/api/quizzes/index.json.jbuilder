@quizzes.each do |quiz|
    json.set! quiz.id do
        json.extract! quiz, :id, :title, :quiz_type, :description, :quiz_timer, :takes, :comments, :max_score, :category_id, :category, :author_id, :author, :created_at, :updated_at
        json.iconUrl quiz.icon.url
    end
end