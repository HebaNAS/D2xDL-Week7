Lecture 1 - Linear Regression [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/HebaNAS/D2xDL-Week7/HEAD?urlpath=%2Fdoc%2Ftree%2FLinearRegression.ipynb)

Lecture 2 - Neural Networks [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/HebaNAS/D2xDL-Week7/HEAD?urlpath=%2Fdoc%2Ftree%2FNeuralNetworks.ipynb)

Perceptron [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/HebaNAS/D2xDL-Week7/HEAD?urlpath=%2Fdoc%2Ftree%2FPerceptron.ipynb)

## Lecture slides

The lectures are web slide decks in `slides/` that run in any browser, also offline (everything they need is in this repository). Open `slides/linear-regression.html` (Lecture 1) or `slides/neural-networks.html` (Lecture 2), or `index.html` for everything this week.

| Key | What it does |
|---|---|
| → / Space / clicker | Next (clickers and arrow keys still work after you click inside a demo) |
| ← | Previous |
| Esc or O | Overview of all slides |
| S | Speaker view with notes |
| F | Full screen |
| . | Black screen |
| C / B | Draw on the slide / whiteboard (Delete clears) |
| Alt + click | Zoom in |
| ? | All keys |

To make a PDF: open the deck with `?print-pdf` at the end of the address in Chrome, then print to PDF.

On the maths slides, each click greys the equation and lights up one part, with its meaning in plain words underneath; the last click shows the whole equation again. Short primer slides explain the symbols, what a derivative is and the chain rule before they are used. Each derivation starts with a "Where we're heading" box showing the result, uses only the facts on the toolbox slide before it, and is followed by a quick-check slide (answers appear on click). Every slide has speaker notes (S): what to say, what each click shows, what to ask, and short maths refreshers.

## Interactive demos

The `demos/` folder has pages that run in any browser, with no Python needed. They are embedded in the slides and notebooks, and you can also open them directly after downloading the repository.

In a notebook, if a demo shows as a blank space, run its cell. Jupyter hides saved interactive output until you run the cell or trust the notebook (`jupyter trust *.ipynb`).

| Demo | Lecture | Try this |
|---|---|---|
| `demos/gd-loss-bowl.html` | Linear Regression | Change the learning rate with the presets, switch between online and batch updates, and compare with the closed-form solution. |
| `demos/sigmoid-explorer.html` | Linear Regression | Change the weight and bias and watch the sigmoid's slope and 0.5 crossing move. |
| `demos/linear-vs-logistic.html` | Linear Regression | Add a very large tumour and watch the linear regression threshold move while the logistic fit holds. |
| `demos/sigmoid-losses.html` | Linear Regression | Compare squared and log loss gradients when the model is confidently wrong, then race them. |
| `demos/xor-hidden-layer.html` | Neural Networks | Move the hidden-unit sliders or press Play, and watch the four XOR points become separable in hidden space. Then turn the biases off. |
| `demos/mlp-playground.html` | Neural Networks | Change the number of hidden units, the activation, zero vs random initialisation, the learning rate, and batch vs online updates. |

## Data

`data/customer_transactions.csv` is the customer transactions example used in all three notebooks. The worked examples use three of its four features. With those three, T1 and T8 have identical inputs but different outputs. Add `Board Games` and the data becomes linearly separable (see the end of the Perceptron notebook).

To run these notebooks locally, you will need to setup the python enivronment with the correct dependencies. These are already included in this repo.

## Running locally

1. Download the repository

2. Install UV package manager from: [https://docs.astral.sh/uv/#highlights](https://docs.astral.sh/uv/#highlights)

3. Within the repository run the following command:
```
uv venv --python 3.12
```
or just

```
uv venv
```

4. Run
```
uv sync
```

5. Run
```
uv run jupyter notebook
```

## Keeping Binder in sync

Binder does not read `pyproject.toml` or `uv.lock`. It builds from `binder/requirements.txt` (packages) and `binder/runtime.txt` (Python version). When you add a package with `uv add`, add the same package and version to `binder/requirements.txt`.
