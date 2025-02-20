import os
import re
import requests
import argparse
from bs4 import BeautifulSoup

def download_images_from_file(filepath, output_dir):
    downloaded = []

    # Extract the sign and gender from the filename
    basename = os.path.basename(filepath)
    match = re.match(r'^quiz8\-([a-z]+)\-(homem|mulher)_part1\.html$', basename)
    if not match:
        print(f"  -> Cannot parse sign/gender from {basename}. Skipping.")
        return downloaded
    sign, gender = match.groups()

    # Parse the HTML
    with open(filepath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Locate the <img> tags
    images = soup.find_all('img', class_='sc-37068a57-0 DTWSl')

    # Download each found image
    count = 0
    for img in images:
        src = img.get('src')
        if not src:
            continue

        # Derive extension
        base_no_query = src.split('?', 1)[0]
        _, ext = os.path.splitext(base_no_query)
        if not ext:
            ext = '.png'

        filename = f"{sign}_{gender}_{count}{ext}"
        save_path = os.path.join(output_dir, filename)
        print(f"  -> Attempting to download: {src} as {filename}")

        try:
            r = requests.get(src, timeout=10)
            r.raise_for_status()
            with open(save_path, 'wb') as img_file:
                img_file.write(r.content)
            downloaded.append(save_path)
            print(f"  -> Saved to {save_path}")
        except Exception as e:
            print(f"Failed to download {src}: {e}")

        count += 1

    return downloaded

def main():
    parser = argparse.ArgumentParser(description='Extract and download zodiac sign images from quiz8 files.')
    parser.add_argument('--dir', default='public', help='Directory to search for HTML files.')
    parser.add_argument('--out', default='downloaded_images', help='Directory to store downloaded images.')
    args = parser.parse_args()

    file_pattern = re.compile(r'^quiz8\-[a-z]+\-(homem|mulher)_part1\.html$')
    target_dir = os.path.abspath(args.dir)
    output_dir = os.path.abspath(args.out)
    os.makedirs(output_dir, exist_ok=True)

    print(f"Searching in: {target_dir}")
    all_downloaded = []

    for filename in os.listdir(target_dir):
        if file_pattern.match(filename):
            print(f"Processing: {filename}")
            path_to_file = os.path.join(target_dir, filename)
            downloaded_files = download_images_from_file(path_to_file, output_dir)
            all_downloaded.extend(downloaded_files)

    print(f"\nDone. Attempted to download from {len(all_downloaded)} images.")

if __name__ == '__main__':
    main()