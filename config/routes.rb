Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'test#index'

  get 'mypage/cards/', to: 'users/cards#index', as: :mypage_cards
  get 'mypage/cards/create', to: 'users/cards#new', as: :mypage_cards_add
  post 'mypage/cards/', to: 'users/cards#create', as: :mypage_cards_create
  delete 'mypage/cards/delete', to: 'users/cards#delete'
end
