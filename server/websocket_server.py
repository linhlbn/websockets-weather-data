import asyncio
import websockets
import json
from fake_weather import generate_fake_weather

async def handler(websocket, path):
    while True:
        try:
            fake_weather = generate_fake_weather()
            await websocket.send(json.dumps(fake_weather))
            await asyncio.sleep(1)  # Sends fake weather data every second
        except websockets.ConnectionClosed:
            print("Connection closed")
            break

start_server = websockets.serve(handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()