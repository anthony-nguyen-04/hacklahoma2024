import pygame

class Tile(pygame.sprite.Sprite): # foundation for the game
    def __init__(self, pos):
        super().__init__()
        self.image = pygame.image.load("./Assets/block_small.png")
        self.rect = self.image.get_rect(topleft = pos)
