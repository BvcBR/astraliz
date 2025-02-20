import os

def fix_html_entities_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace('&lt;', '<').replace('&gt;', '>')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_all_ejs_files(directory):
    for root, _, files in os.walk(directory):
        for file_name in files:
            if file_name.lower().endswith('.ejs'):
                full_path = os.path.join(root, file_name)
                fix_html_entities_in_file(full_path)

if __name__ == '__main__':
    fix_all_ejs_files('views')