# ## Step 2 - MongoDB and Flask Application
# 
# Use MongoDB with Flask templating to create a new HTML page that displays all of the information that was scraped from the URLs above.

# Dependencies
import requests
import pymongo
import pandas as pd

from bs4 import BeautifulSoup as bs
from splinter import Browser
from splinter import browser

executable_path = {"executable_path": "chromedriver"}
browser = Browser("chrome", **executable_path)


########################
# Scraping begins here #
########################
# Create a function to execute all of your scraping code from above and
# return one Python dictionary containing all of the scraped data
def scrape():
    mars_scrape_data={}

    # NASA URL of page to be scraped
    url = 'https://mars.nasa.gov/news/' 
    # Retrieve page with the requests module
    response = requests.get(url)  
    # Create BeautifulSoup object
    soup = bs(response.text, 'lxml')    

    #Featured article
    # Identify and return title and paragraph
    news_title = soup.find('div', class_='content_title').text  
    news_p = soup.find('div', class_ = 'rollover_description_inner').text

    # Insert into data table
    mars_scrape_data['news_title'] = news_title
    mars_scrape_data['news_p'] = news_p
 
    # JPL URL of page to be scraped
    jpl_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(jpl_url)
    jpl_html = browser.html

    # Create BeautifulSoup object; parse with 'html.parser'
    soup = bs(jpl_html, 'html.parser')

    # scraping JPL feature image
    image = soup.find("article", class_="carousel_item")
    div = image.find("div", class_="default floating_text_area ms-layer")
    footer = div.find('footer')
    image = footer.a['data-fancybox-href']
    featured_image_url = "https://www.jpl.nasa.gov" + image
    mars_scrape_data['featured_image_url'] = featured_image_url
    #print(featured_image_url)

    # TWITTER Mars Weather to be scraped
    twitter_url = 'https://twitter.com/marswxreport?lang=en'   
    twitter_response = requests.get(twitter_url)
    twitter_soup = bs(twitter_response.text, 'lxml')
    twitter_result = twitter_soup.find('div', class_='js-tweet-text-container')
    mars_weather = twitter_result.find('p', class_='js-tweet-text').text
    mars_scrape_data['mars_weather']= mars_weather
    # print(mars_weather)

    # MARS Space Facts
    mars_facts_url = 'https://space-facts.com/mars/'
    tables = pd.read_html(mars_facts_url)

    # create datafrae
    mars_df = pd.DataFrame(tables[0])
    mars_df.columns=['Description', 'Value']
    mars_df.set_index('Description', inplace=True)
    # mars_df.head()

    # Export pandas df to html script
    mars_facts_table = mars_df.to_html()
    mars_facts_table.replace('\n','')
    mars_df.to_html('mars_fact_table.html')
    mars_scrape_data['mars_facts_table'] = mars_facts_table

    # Mars Hemispheres Images
    usgs_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(usgs_url)
    usgs_html = browser.html
    mars_data = []
    mars_dict = {}

    # Create BeautifulSoup object; parse with 'html.parser'
    usgs_soup = bs(usgs_html, 'html.parser')
    usgs_images = usgs_soup.find_all('div', class_='description')

    # Loop through images to extract title and image link
    for usgs_image in usgs_images:  
        title = usgs_image.find('h3').text
        image_url = "https://astrogeology.usgs.gov"+ usgs_image.a['href']
        mars_dict = {
                  "title": title,
                  "image_url" : image_url
                 }
        mars_data.append(mars_dict)

    mars_scrape_data["marsdata"] = mars_data
    print(mars_scrape_data)   

    return mars_scrape_data