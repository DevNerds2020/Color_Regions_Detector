import cv2
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)

def calculate_color_percentage(mask, total_pixels):
    masked_pixels = np.sum(mask > 0)
    percentage = (masked_pixels / total_pixels) * 100
    return percentage

def process_image(image_path):
    # Load the image
    image = cv2.imread(image_path)

    # Convert BGR to HSV (Hue, Saturation, Value)
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Define lower and upper bounds for the colors you want to segment
    color_ranges = [
        ((0, 100, 100), (20, 255, 255), 'red'),    # Range for red
        ((30, 100, 100), (70, 255, 255), 'orange'),   # Range for orange
        ((40, 50, 50), (80, 255, 255), 'yellow'),     # Range for yellow
        ((25, 100, 100), (35, 255, 255), 'maroon'),   # Range for maroon
        ((35, 50, 50), (90, 255, 255), 'green'),     # Range for green
        ((100, 100, 100), (140, 255, 255), 'blue'), # Range for blue
        ((120, 100, 100), (170, 255, 255), 'purple'), # Range for purple
        ((0, 0, 0), (180, 50, 50), 'black'),         # Range for black
        ((0, 0, 100), (180, 255, 255), 'white'),     # Range for white
        ((0, 0, 100), (10, 255, 255), 'gray'),      # Range for gray
        ((0, 0, 50), (180, 50, 100), 'brown'),       # Range for brown
        ((10, 100, 100), (25, 255, 255), 'pink'),   # Range for pink
        ((170, 100, 100), (180, 255, 255), 'magenta'), # Range for magenta
        ((95, 50, 50), (125, 255, 255), 'cyan'),    # Range for cyan
        ((80, 50, 50), (95, 255, 255), 'turquoise'),      # Range for turquoise
    ]

    # Colors to include in percentage calculation
    include_colors = ["red", "green", "blue"]

    color_pixel_counts = {}  # Dictionary to store color range and its pixel count

    # Calculate pixel count for each color range
    for lower_bound, upper_bound, color in color_ranges:
        if color not in include_colors:
            continue  # Skip calculating percentage for excluded colors

        # Create a mask for the specified color range
        mask = cv2.inRange(hsv_image, np.array(lower_bound), np.array(upper_bound))

        # Store the pixel count for the current color range
        color_pixel_counts[color] = np.sum(mask > 0)

    # Calculate the total pixels excluding the excluded colors
    total_pixels = sum(count for color, count in color_pixel_counts.items() if color in include_colors)

    # Calculate percentages for each color
    color_percentages = []
    for color, count in color_pixel_counts.items():
        if color not in include_colors:
            continue  # Skip excluded colors
        percentage = (count / total_pixels) * 100
        hex_value = hex_values.get(color, '#000000')  # Get hex value for color, default to black if not found
        color_data = {'color': color, 'percentage': percentage, 'colorValue': hex_value}
        color_percentages.append(color_data)

    return color_percentages

@app.route('/analyze', methods=['POST'])
def analyze_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        filename = secure_filename(file.filename)
        file_path = filename
        file.save(file_path)
        color_percentages = process_image(file_path)
        return jsonify(color_percentages)

if __name__ == '__main__':
    # Hex values for colors
    hex_values = {
        'red': '#FF0000',
        'orange': '#FFA500',
        'yellow': '#FFFF00',
        'maroon': '#800000',
        'green': '#008000',
        'blue': '#0000FF',
        'purple': '#800080',
        'brown': '#A52A2A',
        'pink': '#FFC0CB',
        'magenta': '#FF00FF',
        'cyan': '#00FFFF',
        'turquoise': '#40E0D0'
    }
    app.run(debug=True)
