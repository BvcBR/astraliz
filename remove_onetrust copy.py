import os
import sys
from bs4 import BeautifulSoup

def remove_onetrust_div_in_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    # Find and remove the div with id="onetrust-consent-sdk"
    target_div = soup.find('div', id='onetrust-consent-sdk')
    if target_div:
        target_div.decompose()
        print(f'Removed onetrust-consent-sdk from: {file_path}')

    # Write updated HTML/EJS back to file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(str(soup))

def main(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.lower().endswith(('.html')):
                file_path = os.path.join(root, filename)
                remove_onetrust_div_in_html_file(file_path)

if __name__ == '__main__':
    main('.')