import os

def append_css_links_to_html(html_file_path, css_files):
    with open(html_file_path, 'r') as file:
        content = file.read()

    head_end_index = content.find('</head>')
    if head_end_index == -1:
        print(f"No </head> tag found in {html_file_path}")
        return

    css_links = ''.join([f'<link rel="stylesheet" type="text/css" href="{os.path.basename(css_file)}" />\n' for css_file in css_files])
    new_content = content[:head_end_index] + css_links + content[head_end_index:]

    with open(html_file_path, 'w') as file:
        file.write(new_content)

def process_directory(directory):
    for root, _, files in os.walk(directory):
        html_file_path = os.path.join(root, 'part_1.html')
        if 'part_1.html' in files:
            css_files = [file for file in files if file.endswith('.css')]
            css_file_paths = [os.path.join(root, css_file) for css_file in css_files]
            append_css_links_to_html(html_file_path, css_file_paths)

if __name__ == "__main__":
    base_directory = '.'  # Change this to the directory you want to process
    process_directory(base_directory)