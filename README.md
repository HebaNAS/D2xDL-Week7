Lecture 1 - Linear Regression [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/HebaNAS/D2xDL-Week7/HEAD?urlpath=%2Fdoc%2Ftree%2FLinearRegression.ipynb)

Lecture 2 - Neural Networks [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/HebaNAS/D2xDL-Week7/HEAD?urlpath=%2Fdoc%2Ftree%2FNeuralNetworks.ipynb)

Perceptron [![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/HebaNAS/D2xDL-Week7/HEAD?urlpath=%2Fdoc%2Ftree%2FPerceptron.ipynb)

## Interactive demos

The `demos/` folder has three pages that run in any browser, with no Python needed. They are embedded in the lecture notebooks, and you can also open them directly after downloading the repository.

In a notebook, if a demo shows as a blank space, run its cell. Jupyter hides saved interactive output until you run the cell or trust the notebook (`jupyter trust *.ipynb`).

| Demo | Lecture | Try this |
|---|---|---|
| `demos/gd-loss-bowl.html` | Linear Regression | Change the learning rate with the presets, switch between online and batch updates, and compare with the closed-form solution. |
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
