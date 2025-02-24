from selenium import webdriver
import time
# Initialize the browser
driver = webdriver.Chrome()

# Open the target site
driver.get('https://www.facebook.com')

# Define the cookies you want to add
cookie1 = {
    'name': 'c_user',
    'value': 'COOKIE_VALUE_1',
    'domain': 'www.facebook.com',
    'expiry': 1816998047,
    'path': '/',
    'secure': True,
    'httpOnly': True,
}
cookie2 = {
    'name': 'xs',
    'value': 'COOKIE_VALUE_2',
    'domain': 'www.facebook.com',
    'expiry': 1816998047, 
    'path': '/',
    'secure': True,
    'httpOnly': True,
}

# Add the cookies
driver.add_cookie(cookie1)
driver.add_cookie(cookie2)

# Verify the cookies have been set
cookies = driver.get_cookies()
print(cookies)

time.sleep(60) 
driver.quit()

