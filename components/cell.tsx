type CellProps = {
  id: number;
  cell: string;
  isWinningSquare: boolean;
  disabled: boolean;
  onClick: (id: number) => void;
};

function Cell({ id, cell, isWinningSquare, disabled, onClick }: CellProps) {
  return (
    <button
      className={`square ${cell} ${isWinningSquare ? "winning" : ""}`}
      onClick={() => onClick(id)}
      disabled={disabled || !!cell}
      aria-label={`Square ${id + 1}`}
    >
      {cell === "circle" ? "O" : cell === "cross" ? "X" : ""}
    </button>
  );
}

export default Cell;