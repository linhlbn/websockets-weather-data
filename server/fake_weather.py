from faker import Faker
import random

fake = Faker()

def generate_fake_weather():
    return {
        'city': fake.city(),
        'temperature': round(random.uniform(-20, 40), 2),  # Celsius
        'humidity': random.randint(0, 100),  # Percentage
        'condition': random.choice(['Sunny', 'Cloudy', 'Rain', 'Snow']),
    }
