watch( 'app/views/.*\.erb' ) { |m| system('autorefresh sample_app') }
watch( 'app/assets/javascripts/.*\.js' ) { |m| system('autorefresh sample_app') }
