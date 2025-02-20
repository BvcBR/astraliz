import os

# Get the directory of the script
base_dir = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(base_dir, 'folders_list.txt')
results_dir = base_dir
print(f"Base directory: {base_dir}")
print(f"Results directory: {results_dir}")

with open(output_file, 'w', encoding='utf-8') as f:
    if os.path.exists(results_dir):
        for foldername in os.listdir(results_dir):
            folder_path = os.path.join(results_dir, foldername)
            print(f"Checking: {folder_path}")
            if os.path.isdir(folder_path) and not foldername.startswith('.'):
                print(f"Processing folder: {foldername}")
                f.write(f"app.get('/{foldername}', (req, res) => {{\n")
                f.write(f"    res.sendFile(path.join(__dirname, 'public/results2/{foldername}', 'part_1.html'));\n")
                f.write("});\n\n")
    else:
        print(f"Directory does not exist: {results_dir}")