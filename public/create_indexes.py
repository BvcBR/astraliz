import os
from bs4 import BeautifulSoup

indexes = [2]

# Get the directory of the script
base_dir = os.path.dirname(os.path.abspath(__file__))

for index in indexes:
    filename = f'quiz{index}_part1.html'
    file_path = os.path.join(base_dir, filename)
    print(f'Processing {filename}...')
    if os.path.exists(file_path):
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                html_content = file.read()
            print(f'{filename} Exists...')
            soup = BeautifulSoup(html_content, 'html.parser')
            ul = soup.find('ul', class_='sc-5692e18b-6 cjUDgo')
            if ul:
                li_elements = ul.find_all('li')
                for li_index, li in enumerate(li_elements):
                    onclick_value = f"window.location.href='/quiz{index + 1}?quiz{index}={li_index}'"
                    li['onclick'] = onclick_value
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(str(soup))
                print(f'{filename} Processed...')
            else:
                print(f'No matching <ul> found in {filename}')
        except Exception as e:
            print(f'Error processing {file_path}: {e}')
    else:
        print(f'{filename} Does Not Exist...')