import os
import re

def replace_words_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Replace occurrences of 'nebula' or 'nebulosa' with 'ASTRALIZ'
    content = re.sub(r'\b[Nn][Ee][Bb][Uu][Ll][Aa]\b', 'ASTRALIZ', content)
    content = re.sub(r'\b[Nn][Ee][Bb][Uu][Ll][Oo][Ss][Aa]\b', 'ASTRALIZ', content)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html') or file.endswith('.ejs'):
                file_path = os.path.join(root, file)
                replace_words_in_file(file_path)

if __name__ == "__main__":
    directory = '.'  # Change this to the directory you want to process
    process_directory(directory)