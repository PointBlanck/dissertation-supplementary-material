# Supplementary Material — Figure Gallery

A static gallery of supplementary dissertation figures (galactic dynamics & chaos),
ready to host on GitHub Pages.

## Structure

```
site/
├── index.html        # page markup
├── css/
│   └── styles.css    # all styling
├── js/
│   └── gallery.js    # lightbox behavior
└── figures/          # put your SVG plots here
```

## Adding figures

1. Drop your SVG files into `figures/`.
2. The page expects names like `characteristic-01.svg`, `spiral-01.svg`,
   `poincare-01.svg`. Either match those names or edit the paths in `index.html`
   (each figure has a `data-src` on the `<figure>` and a `data` on the `<object>` —
   update both).
3. To add more than three per section, copy a `<figure>` block; the grid wraps
   into new rows of three automatically.

## Hosting on GitHub Pages

- Commit the contents of `site/` to your repository.
- In the repo settings, enable Pages and point it at the folder you committed
  (the repository root or `/docs`, depending on where you place these files).
- If you keep the `site/` folder as-is, move its contents to the root or `/docs`
  so `index.html` sits where Pages expects it.
