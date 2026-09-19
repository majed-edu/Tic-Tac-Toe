
type CellProps = {
  go: string;
  setGo: (value: string) => void;
};

function Cell ({go, setGo}: CellProps) {
  return (
    <div className="square">

    </div>
  )
}

export default Cell;