import React, { forwardRef } from "react";
import styled from "styled-components";
import { RWD } from "../constant";
import _ from "lodash";
const { RWDWidth, RWDRadius } = RWD;

const Cell = styled.div`
  width: ${RWDWidth(50)};
  height: ${RWDWidth(20)};
  /* max-width: 50px; */
  /* max-height: 20px; */
  /* min-width: 50px; */
  /* min-height: 20px; */
  cursor: pointer;
  border-radius: ${RWDRadius(10)};
`;

const TimeCell = forwardRef((prop, ref) => {
  const {
    cell,
    setCell,
    startDrag,
    setStartDrag,
    startIndex,
    setStartIndex,
    mode,
    setMode,
    oriCell,
    setUpdatedCell,
  } = prop.drag;

  // delete prop.drag;

  const handleCellMouseDown = (index) => (e) => {
    e.preventDefault();
    setStartDrag(true);
    setStartIndex(index);
    setMode(!cell[index[0]][index[1]]);
    setCell((prev) => {
      let result = JSON.parse(JSON.stringify(prev));
      result[index[0]][index[1]] = !result[index[0]][index[1]];
      return result;
    });
    setUpdatedCell([index]);
  };

  const handleCellMouseEnter = (index) => (e) => {
    e.preventDefault();
    if (startDrag) {
      const xRange = [startIndex[0], index[0]].sort((a, b) => a - b);
      const yRange = [startIndex[1], index[1]].sort((a, b) => a - b);

      let updatedCell = [[startIndex[0], startIndex[1]]];
      let allNewCells = JSON.parse(JSON.stringify(oriCell));
      for (const d_index of _.range(xRange[0], xRange[1] + 1)) {
        for (const t_index of _.range(yRange[0], yRange[1] + 1)) {
          if (oriCell[d_index][t_index] !== mode) {
            updatedCell.push([d_index, t_index]);
          }
          allNewCells[d_index][t_index] = mode;
        }
      }

      setUpdatedCell(updatedCell);
      setCell(allNewCells);
    }
  };

  return (
    <Cell
      {...prop}
      ref={ref}
      onMouseDown={handleCellMouseDown(prop.index)}
      onMouseEnter={handleCellMouseEnter(prop.index)}
    />
  );
});

export default TimeCell;
