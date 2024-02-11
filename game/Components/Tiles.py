import pygame
from Components.util import path

class Tile(pygame.sprite.Sprite): # foundation for the game
    def __init__(self, pos):
        super().__init__()
        self.image = pygame.image.load(path("./Assets/block_small.png"))
        self.rect = self.image.get_rect(topleft = pos)
