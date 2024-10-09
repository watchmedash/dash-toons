import os

def replace_text_in_html_files(directory, old_text, new_text):
    # Get the absolute path of the directory containing HTML files
    directory = os.path.abspath(directory)

    # Iterate over files in the directory and its subdirectories recursively
    for root, _, files in os.walk(directory):
        for file_name in files:
            # Ensure we're processing HTML files only
            if file_name.endswith(".html"):
                file_path = os.path.join(root, file_name)

                # Open file with explicit encoding
                with open(file_path, 'r', encoding='utf-8') as file:
                    # Read the entire file content
                    filedata = file.read()

                # Perform the text replacement
                new_filedata = filedata.replace(old_text, new_text)

                # Write the modified content back to the file
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(new_filedata)

# Example usage
if __name__ == "__main__":
    # Directory where replacet.py is located (current directory)
    script_directory = os.path.dirname(os.path.abspath(__file__))

    # Replace text in HTML files within the script's directory
    replace_text_in_html_files(script_directory, 'https://dashflix.top', 'https://dashflix.xyz')
