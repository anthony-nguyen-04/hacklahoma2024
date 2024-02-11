import pygame

class Player(pygame.sprite.Sprite):
    def __init__(self, pos):
        super().__init__()

        self.image = pygame.image.load("../Assets/player.png").convert_alpha()
        self.rect = self.image.get_rect(topleft = pos)

        # player movement
        self.direction = pygame.math.Vector2()
        self.speed = 8
        self.keys_hist = pygame.key.get_pressed()

        # player appearance
        self.facing_right = True
        self.on_left = False
        self.on_right = False

    def animate(self):
        image = self.image

        if self.facing_right:
            self.image = image
        else:
            flipped_image = pygame.transform.flip(image, True, False)
            self.image = flipped_image

    def get_input(self):
        keys = pygame.key.get_pressed()

        if keys[pygame.K_RIGHT]:
            self.direction.x = 1
            self.facing_right = True
        elif keys[pygame.K_LEFT]:
            self.direction.x = -1
            self.facing_right = False
        else:
            self.direction.x = 0

        self.keys_hist = keys

    def update(self):
        self.get_input()
        self.get_state()
        self.animate()
