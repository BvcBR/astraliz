import os
import argparse
from bs4 import BeautifulSoup

def modify_buttons(filepath, next_route):
    # Read the HTML file
    with open(filepath, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    # Find all <button> elements
    buttons = soup.find_all('button')

    for btn in buttons:
        # Check if 'next' is in the button text (case-insensitive)
        text_content = btn.get_text(strip=True).lower()
        if "next" in text_content:
            # Set the onclick attribute to redirect to the next route
            btn['onclick'] = f'window.location.href="{next_route}";'
            print(f'Found "next" button; setting onclick to {next_route}')
        elif "back" in text_content:
            # Set the onclick attribute to go back to the previous page
            btn['onclick'] = 'window.history.back();'
            print(f'Found "back" button; setting onclick to go back in history')

    # Write the modified soup back to the same file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(str(soup))

def main():
    parser = argparse.ArgumentParser(description='Append onclick to <button> with text "next" or "back".')
    parser.add_argument('--file', required=True, help='HTML file to process')
    parser.add_argument('--next-route', required=True, help='Route to set in the onclick attribute for "next" button')
    args = parser.parse_args()

    filepath = args.file
    if not os.path.isfile(filepath):
        print(f"File '{filepath}' not found.")
        return

    modify_buttons(filepath, args.next_route)

if __name__ == '__main__':
    main()