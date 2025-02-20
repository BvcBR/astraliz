import os
from bs4 import BeautifulSoup

# Get the directory of the script
base_dir = os.path.dirname(os.path.abspath(__file__))

# Iterate through all files in the directory
for filename in os.listdir(base_dir):
    if filename.startswith('quiz37-1') and filename.endswith('.ejs'):
        file_path = os.path.join(base_dir, filename)
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                html_content = file.read()
            soup = BeautifulSoup(html_content, 'html.parser')
            button = soup.find('button', class_='sc-4df64fe9-1 ubMHW sc-7228d865-2 blorxC')
            if button:
                button['onclick'] = "window.location.href='/quiz9'"
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(str(soup))
                print(f'Updated {file_path}')
            else:
                print(f'No matching button found in {file_path}')
        except Exception as e:
            print(f'Error processing {file_path}: {e}')