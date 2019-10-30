import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;

const build_grid = (rows, cols) => {
  const matrix = new Array(rows)
    .fill("_")
    .map(item => new Array(cols).fill("_"));
  const container = document.createElement("div");
  container.classList.add("grid");
  for (let r = 0; r < rows; r += 1) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    for (let c = 0; c < cols; c += 1) {
      const box = document.createElement("div");
      box.classList.add("box");
      box["identifier"] = `${r}_${c}`;
      matrix[r][c] = box;
      rowDiv.appendChild(box);
    }
    container.appendChild(rowDiv);
  }
  container["matrix"] = matrix;
  return container;
};

const grid = build_grid(14, 14);

document.body.appendChild(grid);

class Area {
  constructor() {
    this.initial = {};
    this.final = {};
  }
  setInitial(x, y) {
    this.initial["x"] = parseInt(x);
    this.initial["y"] = parseInt(y);
  }
  setFinal(x, y) {
    this.final["x"] = parseInt(x);
    this.final["y"] = parseInt(y);
  }
  colorArea(matrix) {
    let min_r = Math.min(this.initial.x, this.final.x);
    let min_c = Math.min(this.initial.y, this.final.y);
    let max_r = Math.max(this.initial.x, this.final.x);
    let max_c = Math.max(this.initial.y, this.final.y);

    for (let r = min_r; r <= max_r; r += 1) {
      for (let c = min_c; c <= max_c; c += 1) {
        const box = matrix[r][c];
        box.style["background-color"] = "grey";
      }
    }
  }
}

const area = new Area();

grid.addEventListener("mousedown", evt => {
  const coords = evt.target.identifier.split("_");
  area.setInitial(coords[0], coords[1]);
});
grid.addEventListener("mouseup", evt => {
  const coords = evt.target.identifier.split("_");
  area.setFinal(coords[0], coords[1]);
  area.colorArea(grid.matrix);
});
