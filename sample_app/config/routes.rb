SampleApp::Application.routes.draw do

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

  match 'microposts(/(/:id))(.:format)', to: 'microposts#destroy'
  resources :microposts, only: [:create, :destroy]

  resources :relationships, only: [:create, :destroy]

  root to: 'static_pages#home'

  match '/signup',   to: 'users#new'
  match '/signin',   to: 'sessions#new'
  #match '/signout',  to: 'sessions#destroy', via: :delete
  match '/signout',  to: 'sessions#destroy'

  match '/help',    to: 'static_pages#help'
  match '/about',   to: 'static_pages#about'
  match '/contact', to: 'static_pages#contact'
  match '/dashboard', to: 'static_pages#dashboard'

  #core admin compatible
  get '*stylesheets/application.css', to: redirect('/assets/application_core_admin.css')

  get '*javascripts/application.js', to: redirect('/assets/application.js')
  get '*javascripts/calendar.js', to: redirect('/assets/core_admin/calendar.js')
  get '*javascripts/gritter.js', to: redirect('/assets/core_admin/gritter.js')
  get '*javascripts/generic.js', to: redirect('/assets/core_admin/generic.js')
  get '*javascripts/debug/live.js', to: redirect('/assets/debug/live.js') #TODO! generate non hard coded link in template
  get '*images/avatars/:file.:ext', to: redirect('/assets/avatars/%{file}.%{ext}')

  #TODO! Remove
  #get '/api/Todo/Metadata', to: 'static_pages#metadata'

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
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

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'
  #root :to => 'static_pages#home'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end
