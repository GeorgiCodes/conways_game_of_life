Optimized Conway's Game of Life
===============================

# Overview
[Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) is a cellular automation zero player game.

The game is played on an MxN board, where each position in the board (called a 'cell' for purposes of the game) can be 'alive' or 'dead'.

At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

## Algorithm Implementation
This version of Conway's Game of Life includes an algorithm optimized for speed. At each step, the game calculates the boundary coordinates of the alive cells. Only cells within these boundaries are iterated over to determine the next transition. This is opposed to a naiive algorithm which would check each and every cell on step for a time complexity of O(M*N).

For example on a board like this where x = alive and 0 = dead:
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0
0 0 x x x 0 0 0
0 0 0 0 0 0 0 0 
0 0 0 0 0 0 0 0 

this algorithm would only check the following boundaries on each transition as marked by *
0 0 0 0 0 0 0 0
0 * * * * * 0 0
0 * x x x * 0 0
0 * * * * * 0 0 
0 0 0 0 0 0 0 0 

A one cell boundary is added to ensure that rule 4 (any dead cell with 3 alive neighbours becomes alive) will be properly calculated.

At each step, only the cells which have changed since the last step are repainted onto the canvas.  

# How to run
This version of Conway's Game of Life requires the following flags to be set in `chrome:\\flags`:
* `Enable Experimental JavaScript`

Open the `index.html` file in your browser and select a preset pattern to get started.

# How to run tests
The tests were written with Jasmine, they can be run in the browser by opening `jasmine\SpecRunner.html`.

# Grunt
To run jshint simply run `grunt` from the root directory in the terminal. 