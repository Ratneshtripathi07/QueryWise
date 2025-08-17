# dockerfile for huggingface deployment

# Use a standard, lightweight Python image
FROM python:3.11-slim

# Set environment variables for a clean Python environment
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory inside the container
WORKDIR /code

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# Copy the rest of the application code
COPY . .

# Create and set permissions for the persistent storage directory
RUN mkdir -p /code/persistent_indexes && \
    chmod -R 777 /code/persistent_indexes

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]