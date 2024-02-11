import pygame
from Components.util import path

class Player(pygame.sprite.Sprite):
    def __init__(self, pos):
        super().__init__()

        self.image = pygame.image.load(path("./Assets/player_small.png")).convert_alpha()
        self.rect = self.image.get_rect(topleft = pos)

        # player movement
        self.direction = pygame.math.Vector2()
        self.speed = 4
        self.keys_hist = pygame.key.get_pressed()

        self.on_left = False
        self.on_right = False

    def get_input(self):
        keys = pygame.key.get_pressed()

        if keys[pygame.K_RIGHT]:
            self.direction.x = 1
        elif keys[pygame.K_LEFT]:
            self.direction.x = -1
        else:
            self.direction.x = 0

        if keys[pygame.K_UP]:
            self.direction.y = -1

        elif keys[pygame.K_DOWN]:
            self.direction.y = 1

        else:
            self.direction.y = 0

        self.keys_hist = keys

    def update(self):
        self.get_input()

