=====================
Conway's Game of Life

# Overview
Conway's Life is a classic computer science problem that's been around since 1970. It is a compelling demonstration of emergent behavior: from simple rules, complex (and, on the surface, unpredictable) patterns emerge.

The game is played on an MxN board, where each position in the board (called a 'cell' for purposes of the game) can be 'on' or 'off'.

At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

# Algorithm Implementation
This version of Conway's Game of Life includes


# How to run
This version of Conway's Game of Life requires the following flags to be set in `chrome:\\flags`:
* Enable Experimental JavaScript

# How to run tests
The tests were written with Jasmine, they can be run in the browser by opening `jasmine\SpecRunner.html`.