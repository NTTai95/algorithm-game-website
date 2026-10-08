# Domain Vocabulary & Conceptual Model

This document captures the recognized ubiquitous domain concepts for the educational algorithm game platform. Detailed API types will be established incrementally during assigned tasks.

## Initial Core Concepts

- **Game**: The high-level interactive educational experience wrapping a specific DSA topic.
- **Warehouse**: The primary physical metaphor for sorting algorithms; contains storage bays, conveyor belts, and staging areas.
- **Box**: An individual data item to be ordered, characterized by an identifiable weight/value, visual index, and current spatial slot.
- **Crane**: The mechanical agent that executes comparisons, lifts, relocations, and placements of boxes.
- **Sorting Algorithm**: The underlying DSA procedure being demonstrated (e.g., Bubble Sort, Insertion Sort, Quick Sort, Merge Sort).
- **Simulation**: The deterministic execution stream that runs a sorting algorithm step-by-step and tracks the state of the data structure.
- **Simulation Event**: An atomic operation dispatched during simulation execution (e.g., `COMPARE(i, j)`, `SWAP(i, j)`, `MOVE(from, to)`, `HIGHLIGHT(index)`).

## Potential Future Concepts
- **SingleCrane**: A crane model supporting sequential single-point operations.
- **DoubleCrane**: A dual-crane model enabling visualization of parallelized or two-pointer sorting techniques.
- **Replay**: Deterministic playback controller allowing scrubbing, pausing, and stepping backward through algorithm history.
- **Level**: An educational progression tier with varying constraints, data sizes, and learning objectives.
- **Score**: Educational metrics tracking user predictions, efficiency understanding, and task success.
