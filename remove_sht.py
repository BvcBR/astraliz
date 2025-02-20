import os
from bs4 import BeautifulSoup

def remove_elements_with_class(file_path, class_name):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')
    elements = soup.find_all(class_=class_name)

    for element in elements:
        element.decompose()

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

def process_directory(directory, class_name):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html') or file.endswith('.ejs'):
                file_path = os.path.join(root, file)
                remove_elements_with_class(file_path, class_name)

if __name__ == "__main__":
    directory = '.'  # Change this to the directory you want to process
    class_name = 'sc-196daee3-0 jniEsq'
    process_directory(directory, class_name)