Rails.application.routes.draw do

  scope "/api" do
    resources :alarms
  end

  scope '/api', constraints: { format: 'json' } do
    scope '/v1' do
      resources :alarms
    end
  end

  resources :alarms, constraints: { format: 'html' }

  get "profile/index"

  get "alarm/index"

  get "map_point/index"

  get "map_point/route"

  get "credit_card/index"

  get "credit_card/transactions"

  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :sessions, only: [:new, :create, :destroy]

  resources :microposts, only: [:create, :destroy]

  resources :relationships, only: [:create, :destroy]

  root to: 'static_pages#home'

  get '/signup',   to: 'users#new'
  get '/signin',   to: 'sessions#new'
  #match '/signout',  to: 'sessions#destroy', via: :delete
  get '/signout',  to: 'sessions#destroy'

  get '/help',    to: 'static_pages#help'
  get '/about',   to: 'static_pages#about'
  get '/contact', to: 'static_pages#contact'
  get '/dashboard', to: 'static_pages#dashboard'

  #core admin compatible
  get '*stylesheets/application.css', to: redirect('/assets/application_core_admin.css')

  get '*javascripts/application.js', to: redirect('/assets/application.js')
  get '*javascripts/calendar.js', to: redirect('/assets/core_admin/calendar.js')
  get '*javascripts/gritter.js', to: redirect('/assets/core_admin/gritter.js')
  get '*javascripts/generic.js', to: redirect('/assets/core_admin/generic.js')
  get '*javascripts/debug/live.js', to: redirect('/assets/debug/live.js') #TODO! generate non hard coded link in template
  get '*images/avatars/:file.:ext', to: redirect('/assets/avatars/%{file}.%{ext}')

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
