#from __future__ import absolute_import

import pygame
import sys
import tkinter as tk
from tkinter import simpledialog, messagebox
import time
import math
import requests

sys.path.insert(0, './Components')

from Level import Level
from Maps import level_map_1

SCREEN_WIDTH = 1450
SCREEN_HEIGHT = 400

API_ENDPOINT_NEW_TIME = "https://runitback-api.sambird.dev/times"

pygame.init()

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
clock = pygame.time.Clock()

background_img = pygame.image.load("./Assets/background.jpg")

# Get the image dimensions
image_width, image_height = background_img.get_size()

# Calculate the x and y coordinates for the image to be centered on the screen
x = (SCREEN_WIDTH - image_width) / 2
y = (SCREEN_HEIGHT - image_height) / 2

# API KEY
##
ROOT = tk.Tk()

ROOT.withdraw()
# the input dialog
api_key = simpledialog.askstring(title="API KEY",
                                  prompt="What's your API key?:")

##

start_time = round(time.time() * 1000)

level = Level(level_map_1, screen, api_key)

while True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    try:
        screen.blit(background_img, (x, y))
        level.run()

        pygame.display.update()
        clock.tick(60)
    except:
        break


end_time = round(time.time() * 1000)

time_diff = end_time - start_time

minutes = math.floor(time_diff / (60 * 1000))
seconds = math.floor((time_diff - (minutes * 60 * 1000)) / 1000)
ms = time_diff - (minutes * (60 * 1000 * 1000) + seconds * (1000))

time_string = "YOUR TIME WAS %02d:%02d.%02d" % (minutes, seconds, ms)

messagebox.showinfo("TIME", time_string)

packet = {
    "playerId": api_key,
    "splits": [
        {
            "level": 1,
            "time": time_diff
        }
    ]
}

print(packet)

response = requests.post(API_ENDPOINT_NEW_TIME, json=packet)

print(response.content)
print(response.status_code)