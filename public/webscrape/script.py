import requests
from bs4 import BeautifulSoup
import json


# URL of the webpage you want to scrape
url = 'https://nihongokyoshi-net.com/jlpt-grammars/'

targetLinks = {"jlptn1": [], "jlptn2": [],
               "jlptn3": [], "jlptn4": [], "jlptn5": [], "jlptn0":[]}
# Send a GET request to the webpage
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Find all <a> tags with an href attribute
    links = soup.find_all('a', href=True)

    # Print the href attribute of each <a> tag
    for link in links:
        if "grammar-" in link['href']:
            if "jlptn1" in link['href']:
                targetLinks['jlptn1'].append(link['href'])
            elif "jlptn2" in link['href']:
                targetLinks['jlptn2'].append(link['href'])
            elif "jlptn3" in link['href']:
                targetLinks['jlptn3'].append(link['href'])
            elif "jlptn4" in link['href']:
                targetLinks['jlptn4'].append(link['href'])
            elif "jlptn5" in link['href']:
                targetLinks['jlptn5'].append(link['href'])
            elif "jlptn0" in link['href']:
                targetLinks['jlptn0'].append(link['href'])

    with open('./target_links.json', 'w') as json_file:
        json.dump(targetLinks, json_file)

else:
    print(f"Failed to retrieve webpage. Status code: {response.status_code}")
