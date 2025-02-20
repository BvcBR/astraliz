import os
from bs4 import BeautifulSoup

ONCLICK_VALUE = "window.location.href='/quiz3'"

def update_html_file(file_path):
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                html_content = file.read()
            soup = BeautifulSoup(html_content, 'html.parser')
            ul = soup.find('ul', class_='sc-6c7a81e4-6 boDEbx')
            if ul:
                li_elements = ul.find_all('li')
                for li in li_elements:
                    onclick_value = ONCLICK_VALUE
                    li['onclick'] = onclick_value
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(str(soup))
                print(f'{file_path} Processed...')
            else:
                print(f'No matching <ul> found in {file_path}')
        except Exception as e:
            print(f'Error processing {file_path}: {e}')
    else:
        print(f'{file_path} does not exist')

# Example usage
file_path = 'public/results2/partner2/part_1.html'  # Replace with the actual path to your HTML file
update_html_file(file_path)