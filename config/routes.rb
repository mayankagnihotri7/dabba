Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  root "home#index"

  namespace :api do
    namespace :v1 do
      post "auth/request_otp", to: "auth#request_otp"
      post "auth/verify_otp", to: "auth#verify_otp"
      patch "users/name", to: "auth#update_name"
      get "moments/streak", to: "moments#streak"
      get "stats", to: "status#index"

      resources :moments, only: [ :create ]
      resources :cheer_posts, only: %i[ index create destroy ]
      resources :tags, only: [ :index ]
    end
  end

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
