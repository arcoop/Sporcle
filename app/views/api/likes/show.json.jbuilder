json.set! @like.id do
    json.extract! @like, :id, :liker_id, :like_type, :comment_id, :created_at, :updated_at
end
