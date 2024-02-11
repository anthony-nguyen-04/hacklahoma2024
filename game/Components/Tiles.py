import pygame

class Tile(pygame.sprite.Sprite): # foundation for the game
    def __init__(self, pos, size):
        super().__init__()
        self.image = pygame.image.load("../Assets/block.png")
        self.rect = self.image.get_rect(topleft = pos)
    
    def update(self, x_shift):
        self.rect.x += x_shift