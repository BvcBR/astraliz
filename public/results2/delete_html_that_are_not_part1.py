import os

def delete_non_part1_html_files(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html') and not file.startswith('part_1.html'):
                file_path = os.path.join(root, file)
                os.remove(file_path)
                print(f"Deleted: {file_path}")

if __name__ == "__main__":
    base_directory = '.'  # Change this to the directory you want to process
    delete_non_part1_html_files(base_directory)