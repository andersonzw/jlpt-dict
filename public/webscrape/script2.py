import requests
from bs4 import BeautifulSoup
import json


def clean_text(text):
    text_clean = text.replace('\xa0', ' ')
    return text_clean


def scrape_website(url):

    dictionary = {'grammar': '', 'meaning': [], 'english': [],
                  'structure': [], 'level': [], 'notes': [], 'sentences': [], 'other': [], 'link': ''}

    response = requests.get(url)

    dictionary['link'] = url

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Grammar heading
        grammar = soup.select_one('article > section > div.content > h2')
        if grammar:
            dictionary['grammar'] = clean_text(grammar.text).strip()
        else:
            dictionary['grammar'] = 'not found'

        # Explanation content
        contentDiv = soup.select_one('.sc_frame_text')
        fullContentDiv = soup.select_one('.single-post-main')

        for p_group in contentDiv.find_all('p'):
            strong_tag = p_group.find('strong')
            if strong_tag:
                # Meaning
                if strong_tag.text and strong_tag.text == '[意味]':
                    dictionary['meaning'] = clean_text(
                        p_group.text).replace('[意味]', '').strip()
                # Structure
                elif strong_tag.text and strong_tag.text == '[接続]':
                    dictionary['structure'] = clean_text(
                        p_group.text).replace('[接続]', '').strip()
                # JLPT Level
                elif strong_tag.text and strong_tag.text == '[JLPT レベル]':
                    dictionary['level'] = clean_text(
                        p_group.text).replace('[JLPT レベル]', '').strip()
                # Notes
                elif strong_tag.text and strong_tag.text == '[備考]':
                    dictionary['note'] = clean_text(
                        p_group.text).replace('[備考]', '').strip()
                # English
                elif strong_tag.text and strong_tag.text == '[英訳]':
                    dictionary['english'] = clean_text(
                        p_group.text).replace('[英訳]', '').strip()
                # Anything other
            else:
                dictionary['other'].append(p_group.text)

        # Sentences scrape

        def is_an_example_sentence(p_tag):
            span_tags = p_tag.find_all('span')
            for span in span_tags:
                if 'style' in span.attrs and ('color: #ff6600' in span['style'] or 'color: #3366ff' in span['style']):
                    return True
            return False

        example_sentences = [clean_text(p.text).replace('・', '') for p in fullContentDiv.find_all(
            'p') if is_an_example_sentence(p)]
        dictionary['sentences'] = example_sentences

        return (dictionary)
    else:
        print(
            f"Failed to retrieve webpage. Status code: {response.status_code}")


def run_scrape():
    with open("/home/vboxuser/repos/nihongokyoshi-webscrape-py/public/webscrape/target_links.json", 'r') as file:
        urls_dict = json.load(file)
    
    grammar_list = []
    total = len(urls_dict.items())
    count = 0
    
    for key, urls in urls_dict.items():
        # Loop through each URL in the list of URLs
        for url in urls:
            count += 1
            if key == "jlptn1" or key == "jlptn3":
                try:
                    grammar_list.append(scrape_website(url))
                    print(f"scraped {url} {count}/{total}")
                except Exception as error:
                    print("Exception", error)

    print(f"Finished Scraping ")

    with open('./word.json', 'w', encoding='utf-8') as json_file:
        json.dump(grammar_list, json_file, ensure_ascii=False)


run_scrape()
# import os

# # Print the current working directory to verify
# print("Current Working Directory:", os.getcwd())

