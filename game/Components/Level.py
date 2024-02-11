import pygame
from random import randint
from tiles import Tile
from player import Player
from settings import tile_size, screen_width
from server import sendScore

class Level:
    def __init__(self, level_data, surface, level_index, api_key):
        self.display_surface = surface
        self.level_index = level_index

        self.load_assets()
        self.setup_level(level_data)

        self.current_x = 0
        self.basespeed = 8

        self.finish_level = False

        self.user = api_key

    def setup_level(self, layout):

        # initializing sprites
        self.tiles = pygame.sprite.Group()
        self.player = pygame.sprite.GroupSingle()

        # iterates throught the rows and columns of setting to generate the characters
        for row_index, row in enumerate(layout):
            for col_index, cell in enumerate(row):
                x = col_index * tile_size
                y = row_index * tile_size
                if cell == 'X':
                    tile = Tile((x, y), tile_size)
                    self.tiles.add(tile)
                elif cell == 'P':
                    tile = Player((x, y))
                    self.player.add(tile)
                # elif cell == "L":
                #     staircase = Stairs((x, y), tile_size)
                #     self.stairs.add(staircase)
                # ADD A GAME ENDING CHARACTER


    def horizontal_movement_collision(self):
        player = self.player.sprite

        player.rect.x += player.direction.x * player.speed

        for sprite in self.tiles.sprites():
            if sprite.rect.colliderect(player.rect):
                if player.direction.x < 0:
                    player.rect.left = sprite.rect.right
                    player.on_left = True
                    self.current_x = player.rect.left
                elif player.direction.x > 0:
                    player.rect.right = sprite.rect.left
                    player.on_right = True
                    self.current_x = player.rect.right

        if player.on_left and (player.rect.left < self.current_x or player.direction.x >= 0):
            player.on_left = False
        elif player.on_right and (player.rect.right > self.current_x or player.direction.x <= 0):
            player.on_right = False

    def vertical_movement_collision(self):
        player = self.player.sprite

        for sprite in self.tiles.sprites():
            if sprite.rect.colliderect(player.rect):
                if player.direction.y > 0:
                    player.rect.bottom = sprite.rect.top
                    player.direction.y = 0
                    player.on_ground = True
                elif player.direction.y < 0:
                    player.rect.top = sprite.rect.bottom
                    player.direction.y = 0
                    player.on_ceiling = True


    def go_stairs(self):
        player = self.player.sprite

        stair_sprite = self.stairs.sprites()[0]

        if stair_sprite.rect.colliderect(player.rect):
            self.next_level = True
            pygame.mixer.pause()
            # print(main.level_number)

    def run(self):
        self.stairs.update(self.world_shift)
        self.stairs.draw(self.display_surface)

        try:
            self.go_stairs()
        except:
            pass

        self.josh.update(self.world_shift)
        self.josh.draw(self.display_surface)

        # draw tiles
        self.tiles.update(self.world_shift)
        self.tiles.draw(self.display_surface)
        self.scroll_x()

        # draw player
        self.player.update()

        self.vertical_movement_collision()
        self.horizontal_movement_collision()

        self.player.draw(self.display_surface)

        #self.draw_overlay()  # THIS GOES LAST
