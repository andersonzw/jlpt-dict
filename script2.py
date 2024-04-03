import requests
from bs4 import BeautifulSoup
import json


# URL of the webpage you want to scrape
url = 'https://nihongokyoshi-net.com/2019/12/18/jlptn5-grammar-atode/'

dictionary = {'grammar': '', 'meaning': [], 'english': [],
              'structure': [], 'level': [], 'notes': [], 'sentences': [], 'other': []}
# Send a GET request to the webpage
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Grammar heading
    grammar = soup.select_one('article > section > div.content > h2')
    if grammar:
        dictionary['grammar'] = grammar.text
    else:
        dictionary['grammar'] = 'not found'

    # Explanation content
    contentDiv = soup.select_one('.sc_frame_text')
    fullContentDiv = soup.select_one('.single-post-main')

    for p_group in contentDiv.find_all('p'):
        strong_tag = p_group.find('strong')
        if strong_tag.text == '[意味]':
            print(f'meaning is {p_group.text}')
            dictionary['meaning'] = p_group.text
        elif strong_tag.text == '[接続]':
            print(f'structure is {p_group.text}')
            dictionary['structure'] = p_group.text

        elif strong_tag.text == '[JLPT レベル]':
            print(f'level is {p_group.text}')
            dictionary['level'] = p_group.text

        elif strong_tag.text == '[備考]':
            print(f'note is {p_group.text}')
            dictionary['note'] = p_group.text

        elif strong_tag.text == '[英訳]':
            print(f'english is {p_group.text}')
            dictionary['english'] = p_group.text

        else:
            dictionary['other'].append(p_group.text)

    # Sentences scrape

    def is_an_example_sentence(p_tag):
        span_tags = p_tag.find_all('span')
        for span in span_tags:
            print(span)
            if 'style' in span.attrs and ('color: #ff6600' or 'color: #3366ff') in span['style']:
                print('true')
                return True
        return False

    example_sentences = [p.text for p in fullContentDiv.find_all(
        'p') if is_an_example_sentence(p)]
    dictionary['sentences'] = example_sentences
    with open('./word.json', 'w') as json_file:
        json.dump(dictionary, json_file)

    print(dictionary)
else:
    print(f'Failed to retrieve webpage. Status code: {response.status_code}')
