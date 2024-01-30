# OriginalRowSpanExample

- Reference: https://www.ag-grid.com/react-data-grid/row-spanning/#row-spanning-example

- The "rowSpan" callback function usage is very restricted.

- In real casees, grid should rendering row spanned cells with respected to the cell data, which means, automatically.

- I've reserved the word "dynamically". Because, dynamic means, user can toggle any selected cells to be spanned or not spanned,
  as well as the cell merge feature of MS Excel. This is much more complicated use cases.

- In this repo, I've only focused to "automatic" rowspan.