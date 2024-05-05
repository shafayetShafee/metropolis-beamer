# Beamer Metropolis theme for Revealjs Presentation

This is a Quarto custom format to use a revealjs theme directly inspired by the [Beamer Metropolis theme](https://www.overleaf.com/latex/templates/metropolis-beamer-theme/qzyvdhrntfmr).

## Installing

:warning: This extension requires Quarto version to be at least 1.4.

```bash
quarto use template shafayetShafee/metropolis-beamer
```

This will install the extension and create an example qmd file that you can use as a starting place for your article.

## Installing or updating for an existing document

You may also use this format with an existing Quarto project or document. This will install only the files in the `_extension` folder and will not install the files above that (the demo files). This is also how to update the extension if there have been changes.

From the quarto project or document directory, run the following command:

```bash
quarto add shafayetShafee/metropolis-beamer
```

## Using

Simply use the format `metropolis-beamer-revealjs`,

```
---
format: metropolis-beamer-revealjs
---
```

## Format Options (Optional)

| Options            | Descriptions                                                                  |
|--------------------|-------------------------------------------------------------------------------|
| `header-logo`      | A path for logo image which will appear on the top-left corner of each slide. |
| `header-logo-link` | A web link to linkify the `header-logo`.                                      |

## Example

Here is the source code for a minimal sample document: [template.qmd](template.qmd).
