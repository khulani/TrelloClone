json.extract! list, :id, :title, :board_id, :ord

json.cards do
  json.array! list.cards, partial: '/api/cards/card', as: :card
end
