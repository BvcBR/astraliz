import os
from bs4 import BeautifulSoup

# Get the directory of the script
base_dir = os.path.dirname(os.path.abspath(__file__))

# Iterate through all subfolders in the directory
for foldername in os.listdir(base_dir):
    if foldername.startswith('partner') and foldername[7:].isdigit():
        folder_path = os.path.join(base_dir, foldername)
        if os.path.isdir(folder_path):
            part_1_file = os.path.join(folder_path, 'part_1.html')
            try:
                if os.path.exists(part_1_file):
                    with open(part_1_file, 'r', encoding='utf-8') as file:
                        html_content = file.read()
                    soup = BeautifulSoup(html_content, 'html.parser')
                    ul = soup.find('ul', class_='sc-6c7a81e4-6 boDEbx')
                    if ul:
                        li_elements = ul.find_all('li')
                        partner_number = int(foldername[7:])
                        for li in li_elements:
                            onclick_value = f"window.location.href='/partner{partner_number + 1}'"
                            li['onclick'] = onclick_value
                        with open(part_1_file, 'w', encoding='utf-8') as file:
                            file.write(str(soup))
                        print(f'Updated {part_1_file}')
                    else:
                        print(f'No matching <ul> found in {part_1_file}')
                else:
                    print(f'{part_1_file} does not exist')
            except Exception as e:
                print(f'Error processing {part_1_file}: {e}')