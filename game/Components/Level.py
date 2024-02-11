from __future__ import absolute_import

import pygame
from Components.Tiles import Tile
from Components.Player import Player
from Components.Gate import Gate
from Components.Maps import tile_size
#from server import sendScore

class Level:
    def __init__(self, level_data, surface, api_key):
        self.display_surface = surface

        self.setup_level(level_data)

        self.current_x = 0
        self.basespeed = 8

        self.finish_level = False

        self.user = api_key

    def setup_level(self, layout):

        # initializing sprites
        self.tiles = pygame.sprite.Group()
        self.gates = pygame.sprite.Group()
        self.player = pygame.sprite.GroupSingle()

        # iterates throught the rows and columns of setting to generate the characters
        for row_index, row in enumerate(layout):
            for col_index, cell in enumerate(row):
                x = col_index * tile_size
                y = row_index * tile_size
                if cell == 'X':
                    tile = Tile((x, y))
                    self.tiles.add(tile)
                elif cell == 'P':
                    tile = Player((x, y))
                    self.player.add(tile)
                elif cell == "G":
                    gate = Gate((x, y))
                    self.gates.add(gate)
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

        player.rect.y += player.direction.y * player.speed

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


    def go_gate(self):
        player = self.player.sprite
        gate_sprite = self.gates.sprites()[0]

        if gate_sprite.rect.colliderect(player.rect):
            pygame.quit()

    def run(self):

        try:
            self.go_gate()
        except:
            pass

        # draw tiles
        self.tiles.draw(self.display_surface)

        # draw gates
        self.gates.draw(self.display_surface)

        # draw player
        self.player.update()

        self.vertical_movement_collision()
        self.horizontal_movement_collision()

        self.player.draw(self.display_surface)

        #self.draw_overlay()  # THIS GOES LAST
