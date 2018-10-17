Rails.application.routes.draw do
  resources :seasons do
    collection do
      get 'last'
    end
  end
  get '/settings', to: 'settings#profile'
  get 'settings/profile'
  get 'settings/establishment'
  get 'settings/supply'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get  '/signup', to: 'users#new'
  post '/signup', to: 'users#create'

  resources :users
  resources :pcops
  resources :establishments
  resources :supplies

  namespace :pcop do
    resources :categories
    resources :accounts
  end
  root 'static_pages#home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
