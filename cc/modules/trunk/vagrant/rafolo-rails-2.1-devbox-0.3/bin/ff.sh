# Now we have to set the DISPLAY env variable so Firefox knows where to open the browser.
export DISPLAY=:99.0
/opt/firefox/firefox 2>&1 >/dev/null