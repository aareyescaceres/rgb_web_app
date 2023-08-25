# RGB App Web

## Description
This project consists of a web application to manage a list of colors. Allows you to add, edit, and remove colors from a table, and also view existing colors.

## Requirements
- Python 3.7 or higher
-flask
-Flask SQLAlchemy

## Project structure
The project has the following file structure:

```
-instance
- templates
   -colors_list.html
   -colors_list.js
-colors_server.py
```

The `instance` folder contains the initialized db. The `templates` folder contains the necessary HTML and JavaScript files for the web interface. The `colors_server.py` file contains the Flask application code.

## Start the application
1. In the terminal, make sure you are located in the project folder

2. Run the following command to start the development server:
    ```
    python -m flask --app colors_server.py run
    ```
3. Open a web browser and access the address `http://localhost:5000` to view the application.