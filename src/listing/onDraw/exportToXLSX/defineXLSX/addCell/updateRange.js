export default function updateRange(range, row, col) {
    if (range.s.r > row) range.s.r = row;
    if (range.s.c > col) range.s.c = col;
    if (range.e.r < row) range.e.r = row;
    if (range.e.c < col) range.e.c = col;
}
