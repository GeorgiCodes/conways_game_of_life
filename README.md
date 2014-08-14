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

For example on a board like this where x = alive and 0 = dead: <br/>
0 0 0 0 0 0 0 0 <br/>
0 0 0 0 0 0 0 0 <br/>
0 0 x x x 0 0 0 <br/>
0 0 0 0 0 0 0 0 <br/>
0 0 0 0 0 0 0 0 <br/>

this algorithm would only check the following boundaries on each transition as marked by + <br/>
0 0 0 0 0 0 0 0 <br/>
0 + + + + + 0 0 <br/>
0 + x x x + 0 0 <br/>
0 + + + + + 0 0 <br/>
0 0 0 0 0 0 0 0 <br/>

A one cell boundary is added to ensure that rule 4 (any dead cell with 3 alive neighbours becomes alive) will be properly calculated.

At each step, only the cells which have changed since the last step are repainted onto the canvas.  

*NOTE:* This algoirthm works well for the preset patterns: Oscillator, Gosper Gun, Acorn and Glider because they have smaller x and y bounding coordinates than the full game board. However if Random is selected, this optimized algorithm will essentially degrade back to O(M*N) time complexity.
Another drawback to this approach is in some patterns, the algorithm still does unnecessary checking of dead cells.

### Further Thoughts on Optimization
The above approach is just one way Conway's can be optimized, some other ideas which I haven't full explored for viability include:
##### Calculating each live cells neighbours on each transition
This approach might work well for sparse grids and would certainly reduce unnecessary checking of dead cells with the approach outlined above. But would this work well for a gameBoard generated with Random?  
##### Detecting 'stable' formations
Could we perhaps detect stable formations and remove them from the checks each transition? THis might mean checking to see if a formations neighbours remain unchanged from transition to transition. 

# How to run
This version of Conway's Game of Life requires the following flags to be set in `chrome:\\flags`:
* `Enable Experimental JavaScript`

Open the `index.html` file in your browser and select a preset pattern to get started.

# How to run tests
The tests were written with Jasmine, they can be run in the browser by opening `jasmine\SpecRunner.html`.

# Grunt
To run jshint simply run `grunt` from the root directory in the terminal. 
