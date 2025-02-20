import os
from bs4 import BeautifulSoup

def process_html_file(file_path):
    # Read the HTML content from the file
    with open(file_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    # Parse the HTML
    soup = BeautifulSoup(html_content, "html.parser")

    # Add CSS styles to the <head> of the HTML
    style_tag = soup.new_tag("style")
    style_tag.string = """
    .emoji-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 45px;
        height: 45px;
        font-size: 32px; /* Size of emoji */
        background-color: transparent;
        border-radius: 50%; /* Makes the emoji container circular */
        margin-right: 8px; /* Optional: spacing between emoji and text */
    }
    """
    # Append the style tag to the <head> of the HTML
    if soup.head:
        soup.head.append(style_tag)
    else:
        head_tag = soup.new_tag("head")
        head_tag.append(style_tag)
        soup.insert(0, head_tag)

    # Find all span elements with an aria-label that contains an emoji
    for span in soup.find_all("span", {"aria-label": True}):
        emoji = span["aria-label"]
        span.string = emoji  # Set the inner text to the emoji
        span["class"] = span.get("class", []) + ["emoji-icon"]  # Add the CSS class for styling

    # Save the modified HTML back to the same file
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(soup.prettify())

def process_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                file_path = os.path.join(root, file)
                print(f"Processing file: {file_path}")
                try:
                    process_html_file(file_path)
                    print(f"Successfully updated: {file_path}")
                except Exception as e:
                    print(f"Error updating {file_path}: {e}")

if __name__ == "__main__":
    directory_to_process = "."  # Set this to the directory containing your HTML files
    print(f"Starting to process HTML files in directory: {os.path.abspath(directory_to_process)}")
    process_directory(directory_to_process)
    print("Processing complete!")
