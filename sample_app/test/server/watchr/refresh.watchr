watch( 'app/views/.*\.erb' ) { |m| system('autorefresh sample_app') }
watch( 'app/assets/.*\.js' ) { |m| system('autorefresh sample_app') }
watch( 'app/assets/.*\.css' ) { |m| system('autorefresh sample_app') }
watch( 'app/assets/.*\.html' ) { |m| system('autorefresh sample_app') }