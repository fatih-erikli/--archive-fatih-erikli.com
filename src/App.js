import { useState, React, useEffect } from "react";
import { ChromePicker as ColorPicker } from "react-color";
import "./App.css";

const INITIAL_SHAPES = [{"points":[{"x":151,"y":290.3000030517578},{"x":145,"y":270.3000030517578},{"x":141,"y":263.3000030517578},{"x":113,"y":214.3000030517578},{"x":113,"y":161.3000030517578},{"x":144,"y":137.3000030517578},{"x":159,"y":126.30000305175781},{"x":166,"y":123.30000305175781},{"x":145,"y":97.30000305175781},{"x":232,"y":58.30000305175781},{"isControlPoint":true,"x":260.1000061035156,"y":60.275001525878906},{"x":287.5,"y":62.30000305175781},{"x":304.5,"y":60.30000305175781},{"isControlPoint":true,"x":316.6000061035156,"y":45.775001525878906},{"x":344.5,"y":84.11666870117188},{"isControlPoint":true,"x":367.6000061035156,"y":87.2750015258789},{"x":382.20001220703125,"y":112.46665954589844},{"isControlPoint":true,"x":411.1000061035156,"y":119.55000305175781},{"x":417,"y":172.3000030517578},{"x":398.5,"y":218.11666870117188},{"x":379,"y":275.3000030517578},{"x":366,"y":338.3000030517578},{"x":366,"y":282.3000030517578},{"x":363,"y":267.3000030517578},{"x":344,"y":184.3000030517578},{"x":343.6000061035156,"y":183.85832977294922},{"isControlPoint":true,"x":275.1166687011719,"y":164.9000015258789},{"x":209,"y":173.3000030517578},{"x":172,"y":156.3000030517578},{"x":158,"y":216.3000030517578},{"x":159,"y":338.3000030517578},{"x":151,"y":290.3000030517578}],"fill":"rgba(240, 240, 240, 0.9)"},{"points":[{"x":249,"y":410.6333312988281},{"x":262,"y":412.066650390625},{"x":277,"y":409.6333312988281},{"x":270,"y":429.01666259765625},{"x":263,"y":433.6333312988281},{"x":254,"y":428.01666259765625},{"x":249,"y":410.6333312988281}],"fill":"rgba(244, 244, 244, 0.9)"},{"points":[{"x":215,"y":399.3833312988281},{"x":223,"y":387.3833312988281},{"x":254,"y":380.3833312988281},{"x":262,"y":377.3833312988281},{"x":268,"y":377.3833312988281},{"x":272,"y":380.3833312988281},{"x":280,"y":381.3833312988281},{"x":302,"y":385.3833312988281},{"x":312,"y":390.3833312988281},{"x":315,"y":397.3833312988281},{"x":317,"y":398.3833312988281},{"x":322,"y":389.3833312988281},{"x":313,"y":375.3833312988281},{"x":285,"y":365.3833312988281},{"x":279,"y":361.3833312988281},{"x":277,"y":359.3833312988281},{"x":269,"y":361.3833312988281},{"x":265,"y":361.3833312988281},{"x":260,"y":359.3833312988281},{"x":255,"y":358.3833312988281},{"x":251,"y":359.3833312988281},{"x":243,"y":365.3833312988281},{"x":229,"y":367.3833312988281},{"x":218,"y":371.3833312988281},{"x":210,"y":378.3833312988281},{"x":205,"y":390.3833312988281},{"x":208,"y":395.3833312988281},{"x":215,"y":399.3833312988281}],"fill":"rgba(240, 240, 240, 0.9)"},{"points":[{"x":276,"y":264.1000061035156},{"x":297,"y":259.1000061035156},{"x":316,"y":252.6999969482422},{"x":338,"y":253.10000610351562},{"x":355,"y":263.1000061035156},{"x":341,"y":244.10000610351562},{"x":329,"y":241.6999969482422},{"x":316,"y":242.10000610351562},{"x":292,"y":244.10000610351562},{"x":280,"y":249.10000610351562},{"x":276,"y":264.1000061035156}],"fill":"rgba(242, 242, 242, 0.9)"},{"points":[{"x":167,"y":270.1000061035156},{"x":185,"y":259.1000061035156},{"x":198,"y":256.6999969482422},{"x":216,"y":261.1000061035156},{"x":238,"y":267.1000061035156},{"x":238,"y":253.10000610351562},{"x":226,"y":247.6999969482422},{"x":214,"y":246.10000610351562},{"x":196,"y":245.6999969482422},{"x":180,"y":248.10000610351562},{"x":171,"y":255.10000610351562},{"x":167,"y":270.1000061035156}],"fill":"rgba(252, 252, 252, 0.9)"},{"points":[{"x":284,"y":284.3000030517578},{"x":295,"y":275.3000030517578},{"x":307,"y":273.3000030517578},{"x":323,"y":273.3000030517578},{"x":329,"y":275.9499969482422},{"x":338,"y":282.3000030517578},{"x":330.5,"y":278.91666412353516},{"x":328.5,"y":277.6500015258789},{"x":326,"y":276.3000030517578},{"x":311,"y":273.3000030517578},{"x":304,"y":274.3000030517578},{"x":297,"y":276.3000030517578},{"x":286,"y":284.3000030517578},{"x":284,"y":284.3000030517578}]},{"points":[{"x":282,"y":284.3000030517578},{"x":294,"y":287.3000030517578},{"x":302,"y":290.3000030517578},{"x":311,"y":290.3000030517578},{"x":319,"y":288.3000030517578},{"x":328,"y":283.3000030517578},{"x":336,"y":282.3000030517578},{"x":330,"y":284.3000030517578},{"x":326,"y":286.3000030517578},{"x":320,"y":290.3000030517578},{"x":316,"y":291.3000030517578},{"x":303,"y":292.3000030517578},{"x":294,"y":289.3000030517578},{"x":282,"y":284.3000030517578}]},{"points":[{"x":176,"y":287.3000030517578},{"x":186,"y":282.3000030517578},{"x":190,"y":280.3000030517578},{"x":195,"y":278.3000030517578},{"x":208,"y":278.3000030517578},{"x":211,"y":279.31666564941406},{"x":215,"y":281.3000030517578},{"x":225,"y":287.3000030517578},{"x":230,"y":289.3000030517578},{"x":234,"y":290.3000030517578},{"x":234,"y":289.3000030517578},{"x":229,"y":287.3000030517578},{"x":222,"y":284.3000030517578},{"x":215,"y":279.3000030517578},{"x":209,"y":276.3000030517578},{"x":201,"y":276.3000030517578},{"x":194,"y":276.3000030517578},{"x":184,"y":280.3000030517578},{"x":182,"y":282.3000030517578},{"x":176,"y":287.3000030517578}]},{"points":[{"x":229,"y":289.3000030517578},{"x":219,"y":292.3000030517578},{"x":214,"y":295.3000030517578},{"x":207,"y":295.8999938964844},{"x":200,"y":296.3000030517578},{"x":186,"y":294.6999969482422},{"x":182,"y":291.3000030517578},{"x":177,"y":287.3000030517578},{"x":183,"y":291.3000030517578},{"x":187,"y":293.3000030517578},{"x":201,"y":294.3000030517578},{"x":212,"y":294.3000030517578},{"x":219,"y":291.3000030517578},{"x":229,"y":289.3000030517578}]},{"points":[{"x":197,"y":281.3000030517578},{"x":196,"y":285},{"x":196,"y":289.3000030517578},{"x":198,"y":292.3000030517578},{"x":203,"y":294.3000030517578},{"x":203,"y":294.1500015258789},{"x":209,"y":293},{"x":212,"y":291},{"x":213,"y":287.3000030517578},{"x":212,"y":283.3000030517578},{"x":207,"y":280.3000030517578},{"x":203,"y":279.3000030517578},{"x":199,"y":280.3000030517578},{"x":197,"y":281.3000030517578}],"fill":"rgba(233, 233, 233, 1)"},{"points":[{"x":303,"y":277.3000030517578},{"x":303,"y":284.3000030517578},{"x":305,"y":288.3000030517578},{"x":311,"y":289.3000030517578},{"isControlPoint":true,"x":315.1000061035156,"y":288.2750015258789},{"x":315.1000061035156,"y":288.2750015258789},{"x":318,"y":285.3000030517578},{"x":318,"y":280.3000030517578},{"x":316,"y":276.3000030517578},{"x":311,"y":274.3000030517578},{"x":306,"y":275.3000030517578},{"x":303,"y":277.3000030517578}],"fill":"rgba(233, 233, 233, 0.9)"},{"points":[{"x":231,"y":393.29998779296875},{"x":253,"y":388.29998779296875},{"x":261,"y":387.29998779296875},{"x":265,"y":387.3000030517578},{"x":268,"y":387.29998779296875},{"x":277,"y":388.29998779296875},{"x":286,"y":390.29998779296875},{"x":294,"y":393.29998779296875},{"x":278,"y":391.29998779296875},{"x":273,"y":391.29998779296875},{"x":263,"y":391.29998779296875},{"x":254,"y":391.29998779296875},{"x":247,"y":392.29998779296875},{"x":239,"y":394.29998779296875},{"x":231,"y":393.29998779296875}]},{"points":[{"x":231,"y":391.4499969482422},{"x":240,"y":399.4499969482422},{"x":246,"y":400.3000030517578},{"x":252,"y":400.4499969482422},{"x":276,"y":400.4499969482422},{"x":285,"y":396.4499969482422},{"x":290,"y":394.21665954589844},{"x":294,"y":392.4499969482422},{"x":281,"y":395.4499969482422},{"x":277,"y":397.4499969482422},{"x":267,"y":398.4499969482422},{"x":252,"y":397.4499969482422},{"x":242,"y":397.4499969482422},{"x":231,"y":391.4499969482422}],"fill":"rgba(252, 252, 252, 0.9)"}];

const reflect = (p, p0, p1) => {
  // https://gist.github.com/balint42/b99934b2a6990a53e14b
  let dx, dy, a, b, x, y;
  dx = p1.x - p0.x;
  dy = p1.y - p0.y;
  a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
  b = (2 * dx * dy) / (dx * dx + dy * dy);
  x = Math.round(a * (p.x - p0.x) + b * (p.y - p0.y) + p0.x);
  y = Math.round(b * (p.x - p0.x) - a * (p.y - p0.y) + p0.y);
  return { x, y };
};

const DRAW_STATE_READY = 1;
const DRAW_STATE_START = 2;
const DRAW_STATE_MOVE_SEGMENT = 3;
const DRAW_STATE_INSERT_SEGMENT = 4;
const DRAW_STATE_SELECTION = 5;
const DRAW_STATE_MOVE_SHAPE = 6;
const DRAW_STATE_ON_SHAPE = 7;
const DRAW_STATE_ON_SEGMENT = 8;
const DRAW_STATE_REMOVE_SEGMENT = 9;
const DRAW_STATE_REMOVE_SHAPE = 10;
const DRAW_STATE_SELECTION_STARTED = 11;
const DRAW_STATE_ON_SEGMENT_SELECTION = 12;
const DRAW_STATE_MOVE_SELECTED_SEGMENTS = 13;
const DRAW_STATE_SELECTION_SET = 14;

const SHAPE_CLOSE_DISTANCE = 2;
const SEGMENT_CIRCLE_RADIUS = 2;

const DRAW_STATE_LABELS = {
  [DRAW_STATE_READY]: "Click on canvas and drag it to start drawing",
  [DRAW_STATE_START]: "Click on another point to connect with the latest",
  [DRAW_STATE_MOVE_SEGMENT]: "Moving a segment of a shape",
  [DRAW_STATE_INSERT_SEGMENT]:
    "Click on the a point on the line to insert a segment",
  [DRAW_STATE_SELECTION]: "Select points to move",
  [DRAW_STATE_ON_SHAPE]: "Drag the shape to move",
  [DRAW_STATE_MOVE_SHAPE]: "Moving a shape",
  [DRAW_STATE_ON_SEGMENT]: "Drag the segment to move it",
  [DRAW_STATE_REMOVE_SEGMENT]: "Click on the segment to remove",
  [DRAW_STATE_REMOVE_SHAPE]: "Click on the shape to remove",
  [DRAW_STATE_SELECTION_STARTED]: "Selection started",
  [DRAW_STATE_ON_SEGMENT_SELECTION]: "Move selected segments",
  [DRAW_STATE_MOVE_SELECTED_SEGMENTS]: "Moving selected segments",
  [DRAW_STATE_SELECTION_SET]: "Selection set",
};

function handleContextMenu(
  drawState,
  showContextMenuSetterFunction,
  contextMenuPositionSetterFunction,
  shapes,
  shapesSetterFunction,
  drawStateSetterFunction,
  currentShapeIndex,
  currentSegmentIndex,
) {
  return (event) => {
    event.preventDefault();
    const clientRect = document
      .querySelector(".canvas")
      .getBoundingClientRect();
    const cursorPosition = {
      x: event.clientX - clientRect.left,
      y: event.clientY - clientRect.top,
    };
    contextMenuPositionSetterFunction({
      x: cursorPosition.x + clientRect.left,
      y: cursorPosition.y + clientRect.top,
    });

    if (drawState === DRAW_STATE_INSERT_SEGMENT) {
      const shape = shapes[currentShapeIndex];
      const head = shape.points[currentSegmentIndex];
      const point = shape.points[currentSegmentIndex - 1];
      const reflection = reflect(cursorPosition, head, point);
      const midpoint = {
        isControlPoint: true,
        x: (reflection.x + cursorPosition.x) / 2,
        y: (reflection.y + cursorPosition.y) / 2,
      };
      const newPoints = [...shape.points];
      newPoints.splice(currentSegmentIndex, 0, midpoint);
      shapesSetterFunction(
        shapes.map((shape, index) =>
          index === currentShapeIndex ? { ...shape, points: newPoints } : shape
        )
      );
      drawStateSetterFunction(DRAW_STATE_MOVE_SEGMENT);
    } else {
      showContextMenuSetterFunction(true);
    }
  };
}

function handleMouseDown(
  drawState,
  drawStateSetterFunction,
  currentShapeIndexSetterFunction,
  selectedShapeIndexSetterFunction,
  currentSegmentIndexSetterFunction,
  shapes,
  shapesSetterFunction,
  currentShapeIndex,
  currentSegmentIndex,
  cursorPosition,
  mouseDownCursorPositionSetterFunction,
  mouseDownShapePointsSetterFunction,
  selectionRectangle,
  setMouseDownSelectionRectangle,
  selectedPointIndexesSetterFunction,
  contextMenuSetterFunction,
  isMouseDownSetterFunction
) {
  return (event) => {
    isMouseDownSetterFunction(true);
    contextMenuSetterFunction(false);
    if (event.buttons === 2) {
      event.preventDefault();
      return false;
    }

    if (drawState === DRAW_STATE_READY) {
      const clientRect = document
        .querySelector(".canvas")
        .getBoundingClientRect();
      const cursorPosition = {
        x: event.clientX - clientRect.left,
        y: event.clientY - clientRect.top,
      };
      mouseDownCursorPositionSetterFunction(cursorPosition);
      drawStateSetterFunction(DRAW_STATE_SELECTION_STARTED);
    }

    if (drawState === DRAW_STATE_ON_SEGMENT) {
      const { shapeIndex, pointIndex } = event.target.dataset;
      currentShapeIndexSetterFunction(Number(shapeIndex));
      selectedShapeIndexSetterFunction(Number(shapeIndex));
      currentSegmentIndexSetterFunction(Number(pointIndex));
      drawStateSetterFunction(DRAW_STATE_MOVE_SEGMENT);
    }

    if (drawState === DRAW_STATE_SELECTION_SET) {
      const clientRect = document
        .querySelector(".canvas")
        .getBoundingClientRect();
      const cursorPosition = {
        x: event.clientX - clientRect.left,
        y: event.clientY - clientRect.top,
      };
      const isEmptySpace =
        !event.target.dataset.isSegmentLine &&
        !event.target.dataset.isSegment &&
        !event.target.dataset.isPolygon;
      mouseDownCursorPositionSetterFunction(cursorPosition);
      if (isEmptySpace) {
        drawStateSetterFunction(DRAW_STATE_SELECTION_STARTED);
      } else {
        const flatPoints = shapes.map((shape) => shape.points).flat();
        mouseDownShapePointsSetterFunction(flatPoints);
        const selectedPointIndexes = flatPoints
          .map((point, index) =>
            isPointInRectangle(point, selectionRectangle) ? { index } : null
          )
          .filter(Boolean)
          .map(({ index }) => index);
        setMouseDownSelectionRectangle({
          x: selectionRectangle.x,
          y: selectionRectangle.y,
        });
        selectedPointIndexesSetterFunction(selectedPointIndexes);
        drawStateSetterFunction(DRAW_STATE_MOVE_SELECTED_SEGMENTS);
      }
    }

    if (drawState === DRAW_STATE_ON_SHAPE) {
      const clientRect = document
        .querySelector(".canvas")
        .getBoundingClientRect();
      const cursorPosition = {
        x: event.clientX - clientRect.left,
        y: event.clientY - clientRect.top,
      };
      selectedShapeIndexSetterFunction(currentShapeIndex);
      mouseDownCursorPositionSetterFunction(cursorPosition);
      mouseDownShapePointsSetterFunction(shapes[currentShapeIndex].points);
      drawStateSetterFunction(DRAW_STATE_MOVE_SHAPE);
    }

    if (drawState === DRAW_STATE_INSERT_SEGMENT) {
      const shape = shapes[currentShapeIndex];
      const head = shape.points[currentSegmentIndex];
      const point = shape.points[currentSegmentIndex - 1];
      const reflection = reflect(cursorPosition, head, point);
      const midpoint = {
        x: (reflection.x + cursorPosition.x) / 2,
        y: (reflection.y + cursorPosition.y) / 2,
      };
      const newPoints = [...shape.points];
      newPoints.splice(currentSegmentIndex, 0, midpoint);
      shapesSetterFunction(
        shapes.map((shape, index) =>
          index === currentShapeIndex ? { ...shape, points: newPoints } : shape
        )
      );
      drawStateSetterFunction(DRAW_STATE_MOVE_SEGMENT);
    }
  };
}

function findLastOpenShapeIndex(shapes) {
  return shapes.findIndex(({ points }) => {
    const last = points[points.length - 1];
    const first = points[0];
    return points.length < 3 || !(first.x === last.x && first.y === last.y);
  });
}

function continueDrawing(
  cursorPosition,
  drawStateSetterFunction,
  shapes,
  shapesSetterFunction,
  drawState,
  currentShapeIndexSetterFunction,
  currentSegmentIndexSetterFunction,
  currentShapeIndex,
  currentSegmentIndex,
  mouseDownCursorPosition,
  selectionRectangleSetterFunction,
  currentFillColor,
  isMouseDownSetterFunction
) {
  return (event) => {
    isMouseDownSetterFunction(false);
    if (drawState === DRAW_STATE_MOVE_SEGMENT) {
      drawStateSetterFunction(DRAW_STATE_READY);
      currentShapeIndexSetterFunction(-1);
      currentSegmentIndexSetterFunction(-1);
    }

    if (drawState === DRAW_STATE_SELECTION_STARTED) {
      const selectionRectangle = calculateSelectionRectangle(
        mouseDownCursorPosition,
        cursorPosition
      );
      selectionRectangleSetterFunction(selectionRectangle);
      let _hasSelection;
      for (const shape of shapes) {
        innerLoop: for (const point of shape.points) {
          _hasSelection = isPointInRectangle(point, selectionRectangle);
          if (_hasSelection) {
            break innerLoop;
          }
        }
        if (_hasSelection) {
          break;
        }
      }
      drawStateSetterFunction(
        _hasSelection ? DRAW_STATE_SELECTION_SET : DRAW_STATE_READY
      );
    }

    if (drawState === DRAW_STATE_MOVE_SELECTED_SEGMENTS) {
      drawStateSetterFunction(DRAW_STATE_SELECTION_SET);
    }

    if (drawState === DRAW_STATE_MOVE_SHAPE) {
      drawStateSetterFunction(DRAW_STATE_ON_SHAPE);
    }

    if (drawState === DRAW_STATE_REMOVE_SHAPE) {
      shapesSetterFunction(
        shapes.filter((_, index) => index !== currentShapeIndex)
      );
    }

    if (drawState === DRAW_STATE_REMOVE_SEGMENT) {
      shapesSetterFunction(
        shapes.map((shape, shapeIndex) => ({
          ...shape,
          points: shape.points.filter(
            (point, pointIndex) =>
              !(shapeIndex === currentShapeIndex) ||
              (shapeIndex === currentShapeIndex &&
                currentSegmentIndex !== pointIndex)
          ),
        }))
      );
    }

    const selectionIsValid =
      mouseDownCursorPosition.x !== cursorPosition.x &&
      mouseDownCursorPosition.y !== cursorPosition.y;

    const isEmptySpace =
      !event.target.dataset.isSegmentLine &&
      !event.target.dataset.isSegment &&
      !event.target.dataset.isPolygon;

    if (drawState === DRAW_STATE_START || (!selectionIsValid && isEmptySpace)) {
      const canvasBoundingClientRect = document
        .querySelector(".canvas")
        .getBoundingClientRect();
      if (
        event.clientX < canvasBoundingClientRect.left ||
        event.clientX > canvasBoundingClientRect.right ||
        event.clientY < canvasBoundingClientRect.top ||
        event.clientY > canvasBoundingClientRect.bottom
      ) {
        return;
      }

      const lastOpenShapeIndex = findLastOpenShapeIndex(shapes);

      let newShapes;
      let newAppState = DRAW_STATE_START;
      if (lastOpenShapeIndex === -1) {
        newShapes = [...shapes, { points: [cursorPosition] }];
      } else {
        newShapes = shapes.map((shape, index) => {
          let newShape;
          if (index === lastOpenShapeIndex) {
            let cursorPositionOrClosingPoint;

            if (
              distance(
                cursorPosition.x,
                cursorPosition.y,
                shape.points[0].x,
                shape.points[0].y
              ) < SHAPE_CLOSE_DISTANCE
            ) {
              cursorPositionOrClosingPoint = shape.points[0];
              newAppState = DRAW_STATE_READY;
            } else {
              cursorPositionOrClosingPoint = cursorPosition;
            }

            newShape = {
              fill: currentFillColor,
              points: [...shape.points, cursorPositionOrClosingPoint],
            };
          } else {
            newShape = shape;
          }

          return newShape;
        });
      }

      drawStateSetterFunction(newAppState);
      shapesSetterFunction(newShapes);
    }
  };
}

function handleMouseMove(
  cursorPositionSetterFunction,
  drawState,
  currentShapeIndex,
  currentSegmentIndex,
  shapes,
  shapesSetterFunction,
  drawStateSetterFunction,
  currentShapeIndexSetterFunction,
  currentSegmentIndexSetterFunction,
  mouseDownCursorPosition,
  mouseDownShapePoints,
  keyStates,
  selectionRectangle,
  setSelectionRectangle,
  mouseDownSelectionRectangle,
  selectedPointIndexes,
  isMouseDown
) {
  return ({ clientX, clientY, target }) => {
    const clientRect = document
      .querySelector(".canvas")
      .getBoundingClientRect();
    let cursorPosition = {
      x: clientX - clientRect.left,
      y: clientY - clientRect.top,
    };

    cursorPositionSetterFunction(cursorPosition);

    if (drawState === DRAW_STATE_MOVE_SEGMENT) {
      console.log(cursorPosition, currentShapeIndex, currentSegmentIndex);
      shapesSetterFunction(
        shapes.map((shape, shapeIndex) => ({
          ...shape,
          points: shape.points.map((point, pointIndex) =>
            currentShapeIndex === shapeIndex &&
            (currentSegmentIndex === pointIndex ||
              (currentSegmentIndex === shape.points.length - 1 &&
                pointIndex === 0))
              ? {...point, ...cursorPosition}
              : point
          ),
        }))
      );
    }

    if (drawState === DRAW_STATE_START) {
      if (isMouseDown) {
        const lastOpenShapeIndex = findLastOpenShapeIndex(shapes);
        const lastOpenShape = shapes[lastOpenShapeIndex];
        const isLastDrawnPointIsControlPoint =
          lastOpenShape.points.length > 2 &&
          Boolean(
            lastOpenShape.points[lastOpenShape.points.length - 1].isControlPoint
          );
        let controlPointMutation;
        if (isLastDrawnPointIsControlPoint) {
          controlPointMutation = shapes.map((shape, index) => {
            if (index === lastOpenShapeIndex) {
              return {
                ...shape,
                points: shape.points.map((point, index) =>
                  index === shape.points.length - 1
                    ? { ...point, ...cursorPosition }
                    : point
                ),
              };
            } else {
              return shape;
            }
          });
        } else {
          controlPointMutation = shapes.map((shape, index) => {
            if (index === lastOpenShapeIndex) {
              return {
                ...shape,
                points: [
                  ...shape.points,
                  { ...cursorPosition },
                  { isControlPoint: true, ...cursorPosition },
                ],
              };
            } else {
              return shape;
            }
          });
        }
        shapesSetterFunction(controlPointMutation);
      }
    }

    if (drawState === DRAW_STATE_MOVE_SELECTED_SEGMENTS) {
      let _shapeIndex = 0;
      setSelectionRectangle({
        ...selectionRectangle,
        x:
          mouseDownSelectionRectangle.x -
          (mouseDownCursorPosition.x - cursorPosition.x),
        y:
          mouseDownSelectionRectangle.y -
          (mouseDownCursorPosition.y - cursorPosition.y),
      });
      shapesSetterFunction(
        shapes.map((shape) => ({
          ...shape,
          points: shape.points.map((point) => {
            const cachedPointIndex = _shapeIndex;
            _shapeIndex++;
            return selectedPointIndexes.indexOf(cachedPointIndex) > -1
              ? {
                  ...point,
                  x:
                    mouseDownShapePoints[cachedPointIndex].x -
                    (mouseDownCursorPosition.x - cursorPosition.x),
                  y:
                    mouseDownShapePoints[cachedPointIndex].y -
                    (mouseDownCursorPosition.y - cursorPosition.y),
                }
              : point;
          }),
        }))
      );
    }

    if (
      drawState === DRAW_STATE_READY ||
      drawState === DRAW_STATE_ON_SHAPE ||
      drawState === DRAW_STATE_ON_SEGMENT ||
      drawState === DRAW_STATE_ON_SEGMENT_SELECTION ||
      drawState === DRAW_STATE_REMOVE_SHAPE ||
      drawState === DRAW_STATE_REMOVE_SEGMENT
    ) {
      const {
        isSegmentLine,
        isSegment,
        isPolygon,
        shapeIndex,
        segmentIndex,
        pointIndex,
      } = target.dataset;
      // todo: merge pointIndex and segmentIndex
      if (isSegmentLine) {
        drawStateSetterFunction(DRAW_STATE_INSERT_SEGMENT);
        currentShapeIndexSetterFunction(Number(shapeIndex));
        currentSegmentIndexSetterFunction(Number(segmentIndex));
      } else if (isPolygon) {
        drawStateSetterFunction(
          keyStates.isShiftPressed
            ? DRAW_STATE_REMOVE_SHAPE
            : DRAW_STATE_ON_SHAPE
        );
        currentShapeIndexSetterFunction(Number(shapeIndex));
      } else if (isSegment) {
        drawStateSetterFunction(
          keyStates.isShiftPressed
            ? DRAW_STATE_REMOVE_SEGMENT
            : DRAW_STATE_ON_SEGMENT
        );
        currentShapeIndexSetterFunction(Number(shapeIndex));
        currentSegmentIndexSetterFunction(Number(pointIndex));
      } else {
        drawStateSetterFunction(DRAW_STATE_READY);
      }
    }

    if (drawState === DRAW_STATE_MOVE_SHAPE) {
      shapesSetterFunction(
        shapes.map((shape, shapeIndex) => ({
          ...shape,
          points: shape.points.map((point, pointIndex) =>
            shapeIndex === currentShapeIndex
              ? {
                  ...point,
                  x:
                    mouseDownShapePoints[pointIndex].x -
                    (mouseDownCursorPosition.x - cursorPosition.x),
                  y:
                    mouseDownShapePoints[pointIndex].y -
                    (mouseDownCursorPosition.y - cursorPosition.y),
                }
              : point
          ),
        }))
      );
    }

    if (drawState === DRAW_STATE_INSERT_SEGMENT) {
      const shape = shapes[currentShapeIndex];
      const head = shape.points[currentSegmentIndex];
      const point = shape.points[currentSegmentIndex - 1];
      const reflection = reflect(cursorPosition, head, point);
      const midpoint = {
        x: (reflection.x + cursorPosition.x) / 2,
        y: (reflection.y + cursorPosition.y) / 2,
      };
      const midpointDistance = distance(
        midpoint.x,
        midpoint.y,
        cursorPosition.x,
        cursorPosition.y
      );
      if (
        midpointDistance > 1 ||
        midpoint.y > Math.max(head.y, point.y) ||
        midpoint.y < Math.min(head.y, point.y) ||
        midpoint.x > Math.max(head.x, point.x) ||
        midpoint.x < Math.min(head.x, point.x)
      ) {
        drawStateSetterFunction(DRAW_STATE_READY);
        currentShapeIndexSetterFunction(-1);
        currentSegmentIndexSetterFunction(-1);
      }
    }
  };
}

let replaceStateTimeoutId;

function useHashedState(name, defaults) {
  const [state, setState] = useState(defaults);
  return [
    state,
    (value, callback = () => {}) => {
      if (replaceStateTimeoutId) {
        clearTimeout(replaceStateTimeoutId);
      }

      replaceStateTimeoutId = setTimeout(() => {
        const [_, ...hashStates] = (
          window.location.href.indexOf("#") > -1
            ? window.location.href.split("#")
            : [null]
        ).filter(Boolean);

        let found = false;
        const builtHashStates = hashStates
          .reduce((prev, current) => {
            let [hashName, hashValue] = current.split("=");
            if (name === hashName) {
              found = true;
              hashValue = JSON.stringify(value);
              hashName = name;
            }

            return [...prev, `${hashName}=${hashValue}`];
          }, [])
          .join("#");

        if (!found) {
          window.history.pushState(
            null,
            null,
            `${
              builtHashStates && `#${builtHashStates}`
            }#${name}=${JSON.stringify(value)}`
          );
        } else {
          window.history.pushState(null, null, `#${builtHashStates}`);
        }
      }, 50);
      setState(value);
    },
    () => {
      const [head, fragment] = window.location.href.split(`#${name}=`);
      if (fragment) {
        const [value] = fragment.split("#");
        setState(JSON.parse(decodeURIComponent(value)));
      }
    },
  ];
}

function distance(x1, y1, x2, y2) {
  const a = x1 - x2;
  const b = y1 - y2;
  return Math.sqrt(a * a + b * b);
}

function handleKeyDown(keyStatesSetterFunction) {
  return (event) => {
    let keyStateUpdates = {};
    event.shiftKey && (keyStateUpdates["isShiftPressed"] = true);
    event.ctrlKey && (keyStateUpdates["isCtrlPressed"] = true);
    keyStatesSetterFunction(keyStateUpdates);
  };
}

function handleKeyUp(keyStatesSetterFunction) {
  return (_) => {
    keyStatesSetterFunction({ isCtrlPressed: false, isShiftPressed: false });
  };
}

function calculateSelectionRectangle(mouseDownCursorPosition, cursorPosition) {
  const minX = Math.min(mouseDownCursorPosition.x, cursorPosition.x);
  const minY = Math.min(mouseDownCursorPosition.y, cursorPosition.y);
  const maxX = Math.max(mouseDownCursorPosition.x, cursorPosition.x);
  const maxY = Math.max(mouseDownCursorPosition.y, cursorPosition.y);
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function isPointInRectangle(point, rectangle) {
  return (
    point.x > rectangle.x &&
    point.x < rectangle.x + rectangle.width &&
    point.y > rectangle.y &&
    point.y < rectangle.y + rectangle.height
  );
}

function updateCurrentShapeFill(
  shapes,
  shapesSetterFunction,
  currentShapeIndex,
  pickedColor
) {
  shapesSetterFunction(
    shapes.map((shape, index) =>
      index === currentShapeIndex ? { ...shape, fill: pickedColor } : shape
    )
  );
}

function updateCurrentShapeStroke(
  shapes,
  shapesSetterFunction,
  currentShapeIndex,
  pickedColor
) {
  shapesSetterFunction(
    shapes.map((shape, index) =>
      index === currentShapeIndex ? { ...shape, stroke: pickedColor } : shape
    )
  );
}

function parseRGBA(color) {
  if (typeof color !== "string") {
    return color;
  }

  const commaSaparatedString = color.split("(")[1].split(")")[0];
  const parts = commaSaparatedString.split(",");
  const [r, g, b, a] = parts;
  return {
    r: Number(r),
    g: Number(g),
    b: Number(b),
    a: parseFloat(a),
  };
}

function buildSVGPath(points, divider = 1) {
  let svgString = "";
  points.forEach(({ x, y, isControlPoint }, index) => {
    const isLast = index === points.length - 1;
    const isFirst = index === 0;

    if (isFirst) {
      svgString = `M ${x / divider},${y / divider}`;
    }

    if (isLast) {
      svgString = `${svgString} Z ${points[0].x / divider},${
        points[0].y / divider
      }`;
      return;
    }

    if (isControlPoint) {
      svgString = `${svgString} ${x / divider},${y / divider} `;
    } else if (points[index + 1].isControlPoint) {
      svgString = `${svgString} Q ${x / divider},${y / divider} `;
    } else {
      svgString = `${svgString} L ${x / divider},${y / divider} `;
    }
  });
  return svgString;
}

function App() {
  const [drawState, setDrawState] = useState(DRAW_STATE_READY);
  const [cursorPosition, setCursorPosition] = useState({ x: -1, y: -1 });
  const [mouseDownCursorPosition, setMouseDownCursorPosition] = useState({
    x: -1,
    y: -1,
  });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseDownShapePoints, setMouseDownShapePoints] = useState([]);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(-1);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(-1);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1);
  const [shapes, setShapes, refreshShapesState] = useHashedState(
    "shapes",
    INITIAL_SHAPES
  );
  const [keyStates, setKeyStates] = useState({
    isCtrlPressed: false,
    isShiftPressed: false,
  });
  const [selectionRectangle, setSelectionRectangle] = useState(null);
  const [mouseDownSelectionRectangle, setMouseDownSelectionRectangle] =
    useState({ x: -1, y: -1 });
  const [selectedPointIndexes, setSelectedPointIndexes] = useState([]);
  const lastOpenShapeIndex = findLastOpenShapeIndex(shapes);
  const previews = [256, 128];
  const [currentFillColor, setCurrentFillColor] = useState({
    r: 238,
    g: 238,
    b: 238,
    a: 0.9,
  });
  const [currentStrokeColor, setCurrentStrokeColor] = useState({
    r: 238,
    g: 238,
    b: 238,
    a: 0.9,
  });
  const [showFillColorPicker, setFillColorPicker] = useState(false);
  const [showStrokeColorPicker, setShowStrokeColorPicker] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: -1,
    y: -1,
  });
  useEffect(() => {
    refreshShapesState();
    window.onpopstate = refreshShapesState;
    window.onhashchange = refreshShapesState;
  }, []);
  useEffect(() => {
    const selectedShape = shapes[selectedShapeIndex];
    if (!selectedShape) {
      return;
    }
    const { stroke, fill } = selectedShape;
    fill && setCurrentFillColor(parseRGBA(fill));
    stroke && setCurrentStrokeColor(parseRGBA(stroke));
  }, [selectedShapeIndex]);
  console.log(shapes);
  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown(setKeyStates)}
      onKeyUp={handleKeyUp(setKeyStates)}
      className="app-container"
      onContextMenu={handleContextMenu(
        drawState,
        setShowContextMenu,
        setContextMenuPosition,
        shapes,
        setShapes,
        setDrawState,
        currentShapeIndex,
        currentSegmentIndex,
      )}
      onMouseDown={handleMouseDown(
        drawState,
        setDrawState,
        setCurrentShapeIndex,
        setSelectedShapeIndex,
        setCurrentSegmentIndex,
        shapes,
        setShapes,
        currentShapeIndex,
        currentSegmentIndex,
        cursorPosition,
        setMouseDownCursorPosition,
        setMouseDownShapePoints,
        selectionRectangle,
        setMouseDownSelectionRectangle,
        setSelectedPointIndexes,
        setShowContextMenu,
        setIsMouseDown
      )}
      onMouseMove={handleMouseMove(
        setCursorPosition,
        drawState,
        currentShapeIndex,
        currentSegmentIndex,
        shapes,
        setShapes,
        setDrawState,
        setCurrentShapeIndex,
        setCurrentSegmentIndex,
        mouseDownCursorPosition,
        mouseDownShapePoints,
        keyStates,
        selectionRectangle,
        setSelectionRectangle,
        mouseDownSelectionRectangle,
        selectedPointIndexes,
        isMouseDown
      )}
      onMouseUp={continueDrawing(
        cursorPosition,
        setDrawState,
        shapes,
        setShapes,
        drawState,
        setCurrentShapeIndex,
        setCurrentSegmentIndex,
        currentShapeIndex,
        currentSegmentIndex,
        mouseDownCursorPosition,
        setSelectionRectangle,
        currentFillColor,
        setIsMouseDown
      )}
    >
      <h1
        style={{
          float: "left",
        }}
      >
        Hello, my name is Fatih.
      </h1>
      <div
        style={{
          float: "right",
        }}
        className={"header-tools"}
      >
        <span
          style={{
            backgroundColor: `rgba(${currentFillColor.r}, ${currentFillColor.g}, ${currentFillColor.b}, ${currentFillColor.a})`,
          }}
          className={"color-picker-preview"}
          onClick={() => {
            setFillColorPicker(!showFillColorPicker);
          }}
        ></span>
        <span className={"color-picker-label"}>Fill</span>
        {showFillColorPicker && (
          <div
            style={{
              position: "absolute",
            }}
          >
            <ColorPicker
              color={currentFillColor}
              onChange={(color) => {
                const pickedColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
                setCurrentFillColor({
                  r: color.rgb.r,
                  g: color.rgb.g,
                  b: color.rgb.b,
                  a: color.rgb.a,
                });
                updateCurrentShapeFill(
                  shapes,
                  setShapes,
                  selectedShapeIndex,
                  pickedColor
                );
              }}
            />
          </div>
        )}
        <span
          style={{
            marginLeft: 20,
            backgroundColor: `rgba(${currentStrokeColor.r}, ${currentStrokeColor.g}, ${currentStrokeColor.b}, ${currentStrokeColor.a})`,
          }}
          className={"color-picker-preview"}
          onClick={() => {
            setShowStrokeColorPicker(!showStrokeColorPicker);
          }}
        ></span>
        <span className={"color-picker-label"}>Stroke</span>
        {showStrokeColorPicker && (
          <div
            style={{
              position: "absolute",
            }}
          >
            <ColorPicker
              color={currentStrokeColor}
              onChange={(color) => {
                const pickedColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
                setCurrentStrokeColor({
                  r: color.rgb.r,
                  g: color.rgb.g,
                  b: color.rgb.b,
                  a: color.rgb.a,
                });
                updateCurrentShapeStroke(
                  shapes,
                  setShapes,
                  selectedShapeIndex,
                  pickedColor
                );
              }}
            />
          </div>
        )}
      </div>
      {keyStates.isShiftPressed && "shift"}
      {keyStates.isCtrlPressed && "ctrl"}
      <div className="editor">
        <div className={"canvas-wrapper"}>
          <h3>
            #Canvas{" "}
            <span className={"drawing-info"}>
              {DRAW_STATE_LABELS[drawState]}
            </span>
          </h3>
          {showContextMenu && (
            <div
              className={"context-menu"}
              style={{
                top: contextMenuPosition.y,
                left: contextMenuPosition.x,
              }}
            >
              context menu
            </div>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="canvas"
            width={512}
            height={512}
          >
            {new Array(128).fill(undefined).map((_, index) => (
              <line
                key={`y-${index}`}
                x1={0}
                x2={512}
                className={"guideline"}
                y1={index * 8}
                y2={index * 8}
              />
            ))}
            {new Array(128).fill(undefined).map((_, index) => (
              <line
                key={`x-${index}`}
                y1={0}
                y2={512}
                className={"guideline"}
                x1={index * 8}
                x2={index * 8}
              />
            ))}
            <line
              x1={0}
              x2={512}
              style={{ stroke: "blue" }}
              y1={32 * 8}
              y2={32 * 8}
            />
            <line
              y1={0}
              y2={512}
              style={{ stroke: "blue" }}
              x1={32 * 8}
              x2={32 * 8}
            />
            {shapes.map((shape, index) => {
              const shapeWithCursor = [...shape.points, cursorPosition];
              const pointsAsSVGString = buildSVGPath(shapeWithCursor);

              return (
                <g key={index}>
                  <path
                    d={pointsAsSVGString}
                    data-is-polygon={true}
                    data-shape-index={index}
                    fill={"rgba(196, 196, 196, 0.5)"}
                  />
                  {(() => {
                    let [head, ...tail] =
                      drawState === DRAW_STATE_START &&
                      lastOpenShapeIndex === index
                        ? shapeWithCursor
                        : shape.points;
                    const onClosingPoint =
                      distance(
                        head.x,
                        head.y,
                        cursorPosition.x,
                        cursorPosition.y
                      ) > SHAPE_CLOSE_DISTANCE;
                    const lines = [
                      <circle
                        data-shape-index={index}
                        data-point-index={0}
                        className={"segment"}
                        data-is-segment={true}
                        data-is-closing-point={true}
                        key={`closing-point-${index}`}
                        cx={head.x}
                        cy={head.y}
                        fill={onClosingPoint ? "orange" : "blue"}
                        r={SEGMENT_CIRCLE_RADIUS}
                      />,
                    ];
                    let keyIndex = 0;
                    for (const point of tail) {
                      keyIndex++;
                      lines.push(
                        <g key={`segments-${index}-${keyIndex}`}>
                          {drawState === DRAW_STATE_INSERT_SEGMENT &&
                            currentShapeIndex === index &&
                            currentSegmentIndex === keyIndex && (
                              <circle
                                className={"segment"}
                                data-is-segment={true}
                                cx={100}
                                cy={200}
                                fill={"black"}
                                r={SEGMENT_CIRCLE_RADIUS}
                                {...(() => {
                                  const reflection = reflect(
                                    cursorPosition,
                                    head,
                                    point
                                  );
                                  return {
                                    cx: (reflection.x + cursorPosition.x) / 2,
                                    cy: (reflection.y + cursorPosition.y) / 2,
                                  };
                                })()}
                              />
                            )}
                          <circle
                            data-shape-index={index}
                            data-point-index={keyIndex}
                            className={"segment"}
                            data-is-segment={true}
                            cx={point.x}
                            cy={point.y}
                            fill={
                              (() => {
                                let isPointInSelectionRectangle;

                                if (drawState === DRAW_STATE_SELECTION_SET) {
                                  isPointInSelectionRectangle =
                                    isPointInRectangle(
                                      point,
                                      selectionRectangle
                                    );
                                } else if (
                                  drawState ===
                                  DRAW_STATE_MOVE_SELECTED_SEGMENTS
                                ) {
                                  let _shapeIndex = 0;
                                  let _pointIndex = 0;
                                  for (shape of shapes) {
                                    if (index === _shapeIndex) {
                                      break;
                                    }
                                    _shapeIndex++;
                                    _pointIndex += shape.points.length;
                                  }
                                  return (
                                    selectedPointIndexes.indexOf(
                                      _pointIndex + keyIndex
                                    ) > -1
                                  );
                                } else {
                                  isPointInSelectionRectangle = false;
                                }

                                const isPointInCurrentSelection =
                                  drawState === DRAW_STATE_SELECTION_STARTED &&
                                  isPointInRectangle(
                                    point,
                                    calculateSelectionRectangle(
                                      mouseDownCursorPosition,
                                      cursorPosition
                                    )
                                  );

                                return (
                                  isPointInSelectionRectangle ||
                                  isPointInCurrentSelection
                                );
                              })()
                                ? "blue"
                                : "silver"
                            }
                            r={SEGMENT_CIRCLE_RADIUS}
                          />
                          <line
                            stroke={"black"}
                            x1={head.x}
                            y1={head.y}
                            x2={point.x}
                            y2={point.y}
                            data-is-segment-line={true}
                            data-shape-index={index}
                            data-segment-index={keyIndex}
                          />
                        </g>
                      );
                      head = point;
                    }
                    return lines;
                  })()}
                </g>
              );
            })}
            {drawState === DRAW_STATE_SELECTION_STARTED &&
              (() => {
                const { x, y, width, height } = calculateSelectionRectangle(
                  mouseDownCursorPosition,
                  cursorPosition
                );
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    className={"selection-rectangle"}
                  ></rect>
                );
              })()}
          </svg>
        </div>
        <div className="tools">
          <div className="preview">
            {previews.map((previewSize, index) => (
              <div
                className={"preview-square"}
                key={`preview-${index}`}
                style={{ width: previewSize }}
              >
                <h3>
                  {previewSize}x{previewSize}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="canvas"
                  id={`preview-${index}`}
                  width={previewSize}
                  height={previewSize}
                >
                  {shapes.map((shape, index) => {
                    const divider = 512 / previewSize;
                    const pointsAsSVGString = buildSVGPath(
                      [...shape.points, cursorPosition],
                      divider
                    );

                    return (
                      <g key={index}>
                        <path
                          d={pointsAsSVGString}
                          stroke={shape.stroke || "black"}
                          fill={shape.fill}
                        />
                      </g>
                    );
                  })}
                </svg>
                <a
                  href="#"
                  className={"download-link"}
                  onClick={(event) => {
                    event.preventDefault();
                    const svgImage = document.createElement("img");
                    svgImage.width = previewSize;
                    svgImage.height = previewSize;
                    document.body.appendChild(svgImage);
                    svgImage.onload = () => {
                      const canvas = document.createElement("canvas");
                      canvas.width = svgImage.clientWidth;
                      canvas.height = svgImage.clientHeight;
                      const canvasCtx = canvas.getContext("2d");
                      canvasCtx.drawImage(svgImage, 0, 0);
                      const imageDataURL = canvas.toDataURL("image/png");
                      svgImage.parentElement.removeChild(svgImage);
                      URL.revokeObjectURL(svgImage.src);
                      const downloadLink = document.createElement("a");
                      downloadLink.href = imageDataURL;
                      downloadLink.download = `icon-${previewSize}.png`;
                      downloadLink.click();
                    };
                    svgImage.src = URL.createObjectURL(
                      new Blob(
                        [document.getElementById(`preview-${index}`).outerHTML],
                        {
                          type: "image/svg+xml",
                        }
                      )
                    );
                  }}
                >
                  download
                </a>
              </div>
            ))}
          </div>

          <div id="bio">
          I’m a self-taught full-stack software developer. I code with Python in backend; with Django framework, and other micro frameworks such as Flask. I am experienced in AsyncIO which is a Python equivalent of non-blocking servers such as NodeJS. In frontend, I worked with many libraries and state management tools.
          <a href="cv.pdf">Resume.</a>
          </div>
        </div>
      </div>
      <footer>Fatih Erikli — 2021 — Creative Commons</footer>
    </div>
  );
}

export default App;
