# Use the official Python image as base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install necessary dependencies
RUN apt-get update && apt-get install -y libgl1-mesa-glx
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 5000

# Run the Flask application
CMD ["python", "app.py"]
