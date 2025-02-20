import os

def delete_non_part1_html_files():
    directory = './extracted_files'
    # Get all files in the specified directory
    files = os.listdir(directory)

    for file_name in files:
        file_path = os.path.join(directory, file_name)
        # Check if it's a file
        if os.path.isfile(file_path):
            # Check if the file ends with .html but not with part1.html
            if file_name.endswith('.html') and not file_name.endswith('part1.html'):
                # Delete the file
                os.remove(file_path)
                print(f"Deleted: {file_path}")

if __name__ == '__main__':
    delete_non_part1_html_files()