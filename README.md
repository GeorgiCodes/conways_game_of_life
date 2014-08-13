Optimized Conway's Game of Life
===============================

# Overview
[Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) is a classic computer science problem that's been around since 1970. It is a compelling demonstration of emergent behavior: from simple rules, complex (and, on the surface, unpredictable) patterns emerge.

The game is played on an MxN board, where each position in the board (called a 'cell' for purposes of the game) can be 'alive' or 'dead'.

At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Algorithm Implementation
This version of Conway's Game of Life includes an algorithm optimized for speed. At each step, the game calculates the boundary coordinates of the alive cells. Only cells wihtin these boundaries are iterated over to determine the next transition. 

A naiive algorithm would check each and every cell on step for a time complexity of O(M*N).

This optimized approach only checks the boundaries of the alive cells for a time complexity of O(AliveCellsXWidth * AliveCellsYHeight).

At each step, only the cells which have changed since the laste step are repainted onto the canvas.  

# How to run
This version of Conway's Game of Life requires the following flags to be set in `chrome:\\flags`:
* `Enable Experimental JavaScript`

Open the `index.html` file in your browser and select a preset pattern to get started.

# How to run tests
The tests were written with Jasmine, they can be run in the browser by opening `jasmine\SpecRunner.html`.