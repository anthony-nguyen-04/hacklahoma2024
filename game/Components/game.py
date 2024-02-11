from __future__ import absolute_import

import pygame
import sys

from Level import Level
from Maps import level_map_1

SCREEN_WIDTH = 1200
SCREEN_HEIGHT = 800

pygame.init()

screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
clock = pygame.time.Clock()

background_img = pygame.image.load("../Assets/background.jpg")

# Get the image dimensions
image_width, image_height = background_img.get_size()

# Calculate the x and y coordinates for the image to be centered on the screen
x = (SCREEN_WIDTH - image_width) / 2
y = (SCREEN_HEIGHT - image_height) / 2

api_key = "peepee"

level = Level(level_map_1, screen, api_key)

while True:

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    screen.blit(background_img, (x, y))
    level.run()

    pygame.display.update()
    clock.tick(60)
