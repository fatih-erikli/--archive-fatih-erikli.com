import { useState, React, useEffect, useRef } from "react";
import "./App.css";

const INITIAL_APP_STATE = {"shapes":[{"points":[{"x":147,"y":343.3000030517578},{"x":141,"y":323.3000030517578},{"x":137,"y":316.3000030517578},{"x":109,"y":267.3000030517578},{"x":109,"y":214.3000030517578},{"x":140,"y":190.3000030517578},{"x":155,"y":179.3000030517578},{"x":162,"y":176.3000030517578},{"x":141,"y":150.3000030517578},{"x":228,"y":111.30000305175781},{"isControlPoint":true,"x":256.1000061035156,"y":113.2750015258789},{"x":283.5,"y":115.30000305175781},{"x":300.5,"y":113.30000305175781},{"isControlPoint":true,"x":312.6000061035156,"y":98.7750015258789},{"x":340.5,"y":137.11666870117188},{"isControlPoint":true,"x":363.6000061035156,"y":140.2750015258789},{"x":378.20001220703125,"y":165.46665954589844},{"isControlPoint":true,"x":407.1000061035156,"y":172.5500030517578},{"x":413,"y":225.3000030517578},{"x":394.5,"y":271.1166687011719},{"x":375,"y":328.3000030517578},{"x":362,"y":391.3000030517578},{"x":362,"y":335.3000030517578},{"x":359,"y":320.3000030517578},{"x":340,"y":237.3000030517578},{"x":339.6000061035156,"y":236.85832977294922},{"isControlPoint":true,"x":271.1166687011719,"y":217.9000015258789},{"x":205,"y":226.3000030517578},{"x":168,"y":209.3000030517578},{"x":154,"y":269.3000030517578},{"x":155,"y":391.3000030517578},{"x":147,"y":343.3000030517578}],"fill":"rgba(240, 240, 240, 0.9)"},{"points":[{"x":245,"y":465.6333312988281},{"x":258,"y":467.066650390625},{"x":273,"y":464.6333312988281},{"x":266,"y":484.01666259765625},{"x":259,"y":488.6333312988281},{"x":250,"y":483.01666259765625},{"x":245,"y":465.6333312988281}],"fill":"rgba(244, 244, 244, 0.9)"},{"points":[{"x":211,"y":454.3833312988281},{"x":219,"y":442.3833312988281},{"x":250,"y":435.3833312988281},{"x":258,"y":432.3833312988281},{"x":264,"y":432.3833312988281},{"x":268,"y":435.3833312988281},{"x":276,"y":436.3833312988281},{"x":298,"y":440.3833312988281},{"x":308,"y":445.3833312988281},{"x":311,"y":452.3833312988281},{"x":313,"y":453.3833312988281},{"x":318,"y":444.3833312988281},{"x":309,"y":430.3833312988281},{"x":281,"y":420.3833312988281},{"x":275,"y":416.3833312988281},{"x":273,"y":414.3833312988281},{"x":265,"y":416.3833312988281},{"x":261,"y":416.3833312988281},{"x":256,"y":414.3833312988281},{"x":251,"y":413.3833312988281},{"x":247,"y":414.3833312988281},{"x":239,"y":420.3833312988281},{"x":225,"y":422.3833312988281},{"x":214,"y":426.3833312988281},{"x":206,"y":433.3833312988281},{"x":201,"y":445.3833312988281},{"x":204,"y":450.3833312988281},{"x":211,"y":454.3833312988281}],"fill":"rgba(240, 240, 240, 0.9)"},{"points":[{"x":272,"y":319.1000061035156},{"x":293,"y":314.1000061035156},{"x":312,"y":307.6999969482422},{"x":334,"y":308.1000061035156},{"x":351,"y":318.1000061035156},{"x":337,"y":299.1000061035156},{"x":325,"y":296.6999969482422},{"x":312,"y":297.1000061035156},{"x":288,"y":299.1000061035156},{"x":276,"y":304.1000061035156},{"x":272,"y":319.1000061035156}],"fill":"rgba(242, 242, 242, 0.9)"},{"points":[{"x":167,"y":322.1000061035156},{"x":185,"y":311.1000061035156},{"x":198,"y":308.6999969482422},{"x":216,"y":313.1000061035156},{"x":238,"y":319.1000061035156},{"x":238,"y":305.1000061035156},{"x":226,"y":299.6999969482422},{"x":214,"y":298.1000061035156},{"x":196,"y":297.6999969482422},{"x":180,"y":300.1000061035156},{"x":171,"y":307.1000061035156},{"x":167,"y":322.1000061035156}],"fill":"rgba(252, 252, 252, 0.9)"},{"points":[{"x":280,"y":339.3000030517578},{"x":291,"y":330.3000030517578},{"x":303,"y":328.3000030517578},{"x":319,"y":328.3000030517578},{"x":325,"y":330.9499969482422},{"x":334,"y":337.3000030517578},{"x":326.5,"y":333.91666412353516},{"x":324.5,"y":332.6500015258789},{"x":322,"y":331.3000030517578},{"x":307,"y":328.3000030517578},{"x":300,"y":329.3000030517578},{"x":293,"y":331.3000030517578},{"x":282,"y":339.3000030517578},{"x":280,"y":339.3000030517578}]},{"points":[{"x":278,"y":339.3000030517578},{"x":290,"y":342.3000030517578},{"x":298,"y":345.3000030517578},{"x":307,"y":345.3000030517578},{"x":315,"y":343.3000030517578},{"x":324,"y":338.3000030517578},{"x":332,"y":337.3000030517578},{"x":326,"y":339.3000030517578},{"x":322,"y":341.3000030517578},{"x":316,"y":345.3000030517578},{"x":312,"y":346.3000030517578},{"x":299,"y":347.3000030517578},{"x":290,"y":344.3000030517578},{"x":278,"y":339.3000030517578}]},{"points":[{"x":176,"y":342.3000030517578},{"x":186,"y":337.3000030517578},{"x":190,"y":335.3000030517578},{"x":195,"y":333.3000030517578},{"x":208,"y":333.3000030517578},{"x":211,"y":334.31666564941406},{"x":215,"y":336.3000030517578},{"x":225,"y":342.3000030517578},{"x":230,"y":342.3000030517578},{"x":231,"y":342.3000030517578},{"x":231,"y":342.3000030517578},{"x":229,"y":342.3000030517578},{"x":222,"y":339.3000030517578},{"x":215,"y":334.3000030517578},{"x":209,"y":331.3000030517578},{"x":201,"y":331.3000030517578},{"x":194,"y":331.3000030517578},{"x":184,"y":335.3000030517578},{"x":182,"y":337.3000030517578},{"x":176,"y":342.3000030517578}]},{"points":[{"x":230,"y":343.3000030517578},{"x":220,"y":346.3000030517578},{"x":215,"y":349.3000030517578},{"x":208,"y":349.8999938964844},{"x":201,"y":350.3000030517578},{"x":187,"y":348.6999969482422},{"x":183,"y":345.3000030517578},{"x":178,"y":341.3000030517578},{"x":184,"y":345.3000030517578},{"x":188,"y":347.3000030517578},{"x":202,"y":348.3000030517578},{"x":213,"y":348.3000030517578},{"x":220,"y":345.3000030517578},{"x":230,"y":343.3000030517578}]},{"points":[{"x":196,"y":335.3000030517578},{"x":195,"y":339},{"x":195,"y":343.3000030517578},{"x":197,"y":346.3000030517578},{"x":202,"y":348.3000030517578},{"x":202,"y":348.1500015258789},{"x":208,"y":347},{"x":211,"y":345},{"x":212,"y":341.3000030517578},{"x":211,"y":337.3000030517578},{"x":206,"y":334.3000030517578},{"x":202,"y":333.3000030517578},{"x":198,"y":334.3000030517578},{"x":196,"y":335.3000030517578}],"fill":"rgba(233, 233, 233, 1)"},{"points":[{"x":299,"y":332.3000030517578},{"x":299,"y":339.3000030517578},{"x":301,"y":343.3000030517578},{"x":307,"y":344.3000030517578},{"isControlPoint":true,"x":311.1000061035156,"y":343.2750015258789},{"x":311.1000061035156,"y":343.2750015258789},{"x":314,"y":340.3000030517578},{"x":314,"y":335.3000030517578},{"x":312,"y":331.3000030517578},{"x":307,"y":329.3000030517578},{"x":302,"y":330.3000030517578},{"x":299,"y":332.3000030517578}],"fill":"rgba(233, 233, 233, 0.9)"},{"points":[{"x":227,"y":448.29998779296875},{"x":249,"y":443.29998779296875},{"x":257,"y":442.29998779296875},{"x":261,"y":442.3000030517578},{"x":264,"y":442.29998779296875},{"x":273,"y":443.29998779296875},{"x":282,"y":445.29998779296875},{"x":290,"y":448.29998779296875},{"x":274,"y":446.29998779296875},{"x":269,"y":446.29998779296875},{"x":259,"y":446.29998779296875},{"x":250,"y":446.29998779296875},{"x":243,"y":447.29998779296875},{"x":235,"y":449.29998779296875},{"x":227,"y":448.29998779296875}]},{"points":[{"x":227,"y":446.4499969482422},{"x":236,"y":454.4499969482422},{"x":242,"y":455.3000030517578},{"x":248,"y":455.4499969482422},{"x":272,"y":455.4499969482422},{"x":281,"y":451.4499969482422},{"x":286,"y":449.21665954589844},{"x":290,"y":447.4499969482422},{"x":277,"y":450.4499969482422},{"x":273,"y":452.4499969482422},{"x":263,"y":453.4499969482422},{"x":248,"y":452.4499969482422},{"x":238,"y":452.4499969482422},{"x":227,"y":446.4499969482422}],"fill":"rgba(252, 252, 252, 0.9)"},{"points":[{"x":470,"y":291}],"text":"My amazing web page","fontSize":"40"},{"points":[{"x":477,"y":375}],"text":"this is a button"},{"points":[{"x":473,"y":321}],"text":"Hello, my name is Fatih."},{"points":[{"x":471,"y":343}],"text":"I am a full-stack software developer."},{"fill":{"r":238,"g":238,"b":238,"a":0.9},"points":[{"x":469,"y":358},{"x":587,"y":359},{"x":587,"y":381},{"x":469,"y":381},{"x":469,"y":358}]}],"previews":[{"size":256,"shapes":[0,1,2,3,4,5,6,7,8,9,10,11,12]},{"size":128,"shapes":[0,1,2,3,4,5,6,7,8,9,10,11,12]}]};

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
  [DRAW_STATE_READY]:
    "Click on canvas to start drawing. Shift+click to remove a shape.",
  [DRAW_STATE_START]:
    "Click on another point to connect with the latest,\
    click and drag it to create a bezier curve control point",
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

const CONTEXT_MENU_ACTION_DUPLICATE = "Duplicate";
const CONTEXT_MENU_ACTION_DELETE_SHAPE = "Delete Shape";
const CONTEXT_MENU_ACTION_SEND_TO_BACK = "Send to back";
const CONTEXT_MENU_ACTION_BRING_TO_FRONT = "Bring to front";
const CONTEXT_MENU_ACTIONS = [
  CONTEXT_MENU_ACTION_DUPLICATE,
  CONTEXT_MENU_ACTION_DELETE_SHAPE,
  CONTEXT_MENU_ACTION_SEND_TO_BACK,
  CONTEXT_MENU_ACTION_BRING_TO_FRONT,
];

function handleContextMenu(
  drawState,
  showContextMenuSetterFunction,
  contextMenuPositionSetterFunction,
  shapes,
  shapesSetterFunction,
  drawStateSetterFunction,
  currentShapeIndex,
  currentSegmentIndex
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
  isMouseDownSetterFunction,
  showContextMenuSetterFunction,
  showContextMenu
) {
  return (event) => {
    isMouseDownSetterFunction(true);
    if (event.target.dataset.isCanvas) {
      showContextMenuSetterFunction(false);
    }
    if (event.target.dataset.isContextMenuAction || showContextMenu || event.target.dataset.preventCreation) {
      return;
    }
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
  return shapes.findIndex(({ points, text }) => {
    const last = points[points.length - 1];
    const first = points[0];
    return (
      (!text && points.length < 3) ||
      !(first.x === last.x && first.y === last.y)
    );
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

      const lastShape = shapes[shapes.length - 1];
      if (
        lastShape &&
        lastShape.points.length === 1 &&
        !lastShape.text &&
        lastShape.points[0].x === cursorPosition.x &&
        lastShape.points[0].y === cursorPosition.y
      ) {
        // shape created by double-click
        shapesSetterFunction([
          ...shapes.slice(0, shapes.length - 1),
          {
            points: [cursorPosition],
            text: "Text",
          },
        ]);
        drawStateSetterFunction(DRAW_STATE_READY);
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
  isMouseDown,
  showContextMenu
) {
  return ({ clientX, clientY, target }) => {
    if (showContextMenu) {
      return;
    }

    const clientRect = document
      .querySelector(".canvas")
      .getBoundingClientRect();
    let cursorPosition = {
      x: clientX - clientRect.left,
      y: clientY - clientRect.top,
    };

    cursorPositionSetterFunction(cursorPosition);

    if (drawState === DRAW_STATE_MOVE_SEGMENT) {
      shapesSetterFunction(
        shapes.map((shape, shapeIndex) => ({
          ...shape,
          points: shape.points.map((point, pointIndex) =>
            currentShapeIndex === shapeIndex &&
            (currentSegmentIndex === pointIndex ||
              (currentSegmentIndex === shape.points.length - 1 &&
                pointIndex === 0))
              ? { ...point, ...cursorPosition }
              : point
          ),
        }))
      );
    }

    if (drawState === DRAW_STATE_START) {
      if (isMouseDown) {
        const lastOpenShapeIndex = findLastOpenShapeIndex(shapes);
        const lastOpenShape = shapes[lastOpenShapeIndex];
        if (!lastOpenShape) {
          return drawStateSetterFunction(DRAW_STATE_READY);
        }
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

function handleContextMenuAction(
  action,
  shapes,
  shapesSetterFunction,
  currentShapeIndex,
  showContextMenuSetterFunction
) {
  return () => {
    switch (action) {
      case CONTEXT_MENU_ACTION_BRING_TO_FRONT: {
        const shape = shapes[currentShapeIndex];
        shapesSetterFunction([
          ...shapes.filter((_, index) => index !== currentShapeIndex),
          shape,
        ]);
        break;
      }
      case CONTEXT_MENU_ACTION_SEND_TO_BACK: {
        const shape = shapes[currentShapeIndex];
        shapesSetterFunction([
          shape,
          ...shapes.filter((_, index) => index !== currentShapeIndex),
        ]);
        break;
      }
      case CONTEXT_MENU_ACTION_DUPLICATE: {
        const currentShape = shapes[currentShapeIndex];
        if (!currentShape) {
          return;
        }
        shapesSetterFunction([
          ...shapes,
          {
            ...currentShape,
            points: currentShape.points.map((point) => ({
              ...point,
              x: point.x + 25,
              y: point.y + 25,
            })),
          },
        ]);
        break;
      }
      case CONTEXT_MENU_ACTION_DELETE_SHAPE:
        shapesSetterFunction(
          shapes.filter((shape, index) => index !== currentShapeIndex)
        );
        break;
    }
    showContextMenuSetterFunction(false);
  };
}

function ColorInput({ color, onChange }) {
  const [showPicker, setShowPicker] = useState(false);
  const [currentWheelColor, setCurrentWheelColor] = useState(color);
  const [currentShadeColor, setCurrentShadeColor] = useState(color);
  const shadesRef = useRef(null);
  const wheelRef = useRef(null);
  useEffect(() => {
    if (wheelRef.current) {
      const wheelContext = wheelRef.current.getContext("2d");
      const wheelGradient = wheelContext.createLinearGradient(0, 0, 0, 150);
      wheelGradient.addColorStop(0, "rgba(255, 0, 0, 1)");
      wheelGradient.addColorStop(0.17, "rgba(255, 255, 0, 1)");
      wheelGradient.addColorStop(0.34, "rgba(0, 255, 0, 1)");
      wheelGradient.addColorStop(0.51, "rgba(0, 255, 255, 1)");
      wheelGradient.addColorStop(0.68, "rgba(0, 0, 255, 1)");
      wheelGradient.addColorStop(0.85, "rgba(255, 0, 255, 1)");
      wheelGradient.addColorStop(1, "rgba(255, 0, 0, 1)");
      wheelContext.rect(0, 0, 30, 150);
      wheelContext.fillStyle = wheelGradient;
      wheelContext.fill();
    }
    if (shadesRef.current) {
      const shadesContext = shadesRef.current.getContext("2d");
      shadesContext.fillStyle = currentWheelColor;
      shadesContext.fillRect(0, 0, 150, 150);
      const whiteGradient = shadesContext.createLinearGradient(0, 0, 150, 0);
      whiteGradient.addColorStop(0, "rgba(255,255,255,1)");
      whiteGradient.addColorStop(1, "rgba(255,255,255,0)");
      shadesContext.fillStyle = whiteGradient;
      shadesContext.fillRect(0, 0, 150, 150);
      const blackGradient = shadesContext.createLinearGradient(0, 0, 0, 150);
      blackGradient.addColorStop(0, "rgba(0,0,0,0)");
      blackGradient.addColorStop(1, "rgba(0,0,0,1)");
      shadesContext.fillStyle = blackGradient;
      shadesContext.fillRect(0, 0, 150, 150);
    }
  }, [showPicker, currentWheelColor]);
  return (
    <div className={"color-input"}>
      <div
        style={{
          background: currentShadeColor,
        }}
        className={"color-input-preview"}
        onClick={() => setShowPicker(!showPicker)}
      ></div>
      {showPicker && (
        <div className={"color-input-picker"}>
          <canvas
            onMouseDown={(event) => {
              const box = shadesRef.current.getBoundingClientRect();
              const point = {
                x: Math.floor(event.clientX - box.left),
                y: Math.floor(event.clientY - box.top),
              };
              const [r, g, b, _] = shadesRef.current
                .getContext("2d")
                .getImageData(point.x, point.y, 1, 1).data;
              setCurrentShadeColor(`rgba(${r}, ${g}, ${b}, 1)`);
              onChange({ r, g, b, a: 1 });
            }}
            ref={shadesRef}
            className={"color-input-shades"}
            height="150"
            width="150"
          ></canvas>
          <canvas
            onMouseDown={(event) => {
              const box = wheelRef.current.getBoundingClientRect();
              const point = {
                x: Math.floor(event.clientX - box.left),
                y: Math.floor(event.clientY - box.top),
              };
              const [r, g, b, _] = wheelRef.current
                .getContext("2d")
                .getImageData(point.x, point.y, 1, 1).data;
              setCurrentWheelColor(`rgba(${r}, ${g}, ${b}, 1)`);
            }}
            ref={wheelRef}
            className={"color-input-wheel"}
            height="150"
            width="30"
          ></canvas>
        </div>
      )}
    </div>
  );
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
      const [_, fragment] = window.location.href.split(`#${name}=`);
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

function handleKeyDown(keyStatesSetterFunction, selectAll) {
  return (event) => {
    let keyStateUpdates = {};
    event.shiftKey && (keyStateUpdates["isShiftPressed"] = true);
    event.ctrlKey && (keyStateUpdates["isCtrlPressed"] = true);
    if (event.metaKey && event.key === "a") {
      event.preventDefault();
      selectAll();
    }
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

function toRGBAString(color) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
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
    } else if (points[index + 1] && points[index + 1].isControlPoint) {
      svgString = `${svgString} Q ${x / divider},${y / divider} `;
    } else {
      svgString = `${svgString} L ${x / divider},${y / divider} `;
    }
  });
  return svgString;
}

function exportPreview(
  previewSize,
  previews,
  previewsSetterFunction,
  shapes,
  setShowContextMenu,
  selectionRectangle
) {
  return (event) => {
    event.preventDefault();
    const flatPoints = shapes
      .map((shape, shapeIndex) =>
        shape.points.map((point) => [shapeIndex, point])
      )
      .flat();
    const selectedPointIndexes = flatPoints
      .map((point, index) =>
        isPointInRectangle(point[1], selectionRectangle) ? { index } : null
      )
      .filter(Boolean)
      .map(({ index }) => index);
    const shapeIndexes = new Set(
      selectedPointIndexes.map(
        (flatPointIndex) => flatPoints[flatPointIndex][0]
      )
    );
    previewsSetterFunction([
      ...previews,
      {
        size: previewSize,
        shapes: [...shapeIndexes],
      },
    ]);
    setShowContextMenu(false);
  };
}

function ContextMenu({
  contextMenuPosition,
  onContextMenuAction,
  setCurrentFillColor,
  setCurrentStrokeColor,
  shapes,
  setShapes,
  currentShapeIndex,
  setShowContextMenu,
  currentFillColor,
  currentStrokeColor,
  previews,
  setPreviews,
  selectionRectangle,
}) {
  const currentShape = shapes[currentShapeIndex];
  return (
    <div
      className={"context-menu"}
      style={{
        top: contextMenuPosition.y,
        left: contextMenuPosition.x,
      }}
    >
      <ul>
        {CONTEXT_MENU_ACTIONS.map((action, index) => (
          <li
            key={index}
            data-is-context-menu-action={true}
            onClick={onContextMenuAction(
              action,
              shapes,
              setShapes,
              currentShapeIndex,
              setShowContextMenu
            )}
          >
            <a href="#">{action}</a>
          </li>
        ))}
        <li>
          <span>Export:</span>
          {[512, 256, 128].map((previewSize, index) => (
            <a
              key={index}
              href=""
              onClick={exportPreview(
                previewSize,
                previews,
                setPreviews,
                shapes,
                setShowContextMenu,
                selectionRectangle
              )}
            >
              {previewSize}px
            </a>
          ))}
        </li>
        {currentShape && typeof currentShape.text === "string" && (
          <>
            <li>
              <span>
                Text:{" "}
                <input
                  value={currentShape.text}
                  onChange={(event) => {
                    setShapes(
                      shapes.map((shape, index) =>
                        index === currentShapeIndex
                          ? {
                              ...shape,
                              text: event.target.value,
                            }
                          : shape
                      )
                    );
                  }}
                  style={{
                    width: "90%",
                  }}
                  type="text"
                />
              </span>
            </li>
            <li>
              <span>
                Font size:
                <br />
                <input
                  value={currentShape.fontSize || 15}
                  type={"number"}
                  onChange={(event) => {
                    setShapes(
                      shapes.map((shape, index) =>
                        index === currentShapeIndex
                          ? {
                              ...shape,
                              fontSize: event.target.value,
                            }
                          : shape
                      )
                    );
                  }}
                  style={{
                    width: "20%",
                  }}
                />
              </span>
            </li>
          </>
        )}
      </ul>
      <div className="color-pickers">
        <div style={{}}>
          <span className="color-picker-label">Fill</span> <br />
          <ColorInput
            onChange={(color) => {
              setCurrentFillColor(color);
              updateCurrentShapeFill(
                shapes,
                setShapes,
                currentShapeIndex,
                toRGBAString(color)
              );
            }}
            color={toRGBAString(currentFillColor)}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <span className="color-picker-label">Stroke</span> <br />
          <ColorInput
            onChange={(color) => {
              setCurrentStrokeColor(color);
              updateCurrentShapeStroke(
                shapes,
                setShapes,
                currentShapeIndex,
                toRGBAString(color)
              );
            }}
            color={toRGBAString(currentStrokeColor)}
          />
        </div>
      </div>
    </div>
  );
}

function Preview({
  size,
  shapes,
  shapeIndexes,
  index,
  points,
  cursorPosition,
  style,
  onRemove,
}) {
  const _ensureSetShapeIndexes =
    "has" in shapeIndexes ? shapeIndexes : new Set(shapeIndexes);
  const divider = 512 / size;
  const shapesFiltered = shapes.filter((_, index) =>
    _ensureSetShapeIndexes.has(index)
  );
  const flatPoints = shapesFiltered.map((shape) => shape.points).flat();
  const maxX = Math.max(...flatPoints.map(({ x }) => x));
  const maxY = Math.max(...flatPoints.map(({ y }) => y));
  const minX = Math.min(...flatPoints.map(({ x }) => x));
  const minY = Math.min(...flatPoints.map(({ y }) => y));
  const centerX = (512 - (maxX - minX)) / 2;
  const centerY = (512 - (maxY - minY)) / 2;
  return (
    <div
      className={"preview-square"}
      key={`preview-${index}`}
      style={{ ...style, width: size }}
    >
      <h3>
        {size}x{size}
      </h3>
      <a data-prevent-creation={true} href={'#'} onClick={onRemove} className="remove-preview-button">
        x
      </a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="canvas"
        id={`preview-${index}`}
        width={size}
        height={size}
      >
        {shapesFiltered.map((shape, index) => {
          const pointsAsSVGString = buildSVGPath(
            shape.points.map(({ x, y }) => ({
              x: x - minX + centerX,
              y: y - minY + centerY,
            })),
            divider
          );
          return (
            <g key={index}>
              {shape.text && (
                <text
                  fontSize={shape.fontSize || 15}
                  data-is-polygon={true}
                  data-shape-index={index}
                  x={shape.points[0].x / divider}
                  y={shape.points[0].y / divider}
                >
                  {shape.text}
                </text>
              )}
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
          svgImage.width = size;
          svgImage.height = size;
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
            downloadLink.download = `icon-${size}.png`;
            downloadLink.click();
          };
          svgImage.src = URL.createObjectURL(
            new Blob([document.getElementById(`preview-${index}`).outerHTML], {
              type: "image/svg+xml",
            })
          );
        }}
      >
        download
      </a>
    </div>
  );
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
  const [appState, setAppState, refreshAppState] = useHashedState("state", INITIAL_APP_STATE);
  const shapes = appState.shapes;
  const previews = appState.previews;
  const setShapes = (shapes) => setAppState({ ...appState, shapes });
  const setPreviews = (previews) => {
    setAppState({
      ...appState,
      previews,
    });
  };

  const [keyStates, setKeyStates] = useState({
    isCtrlPressed: false,
    isShiftPressed: false,
  });
  const [selectionRectangle, setSelectionRectangle] = useState(null);
  const [mouseDownSelectionRectangle, setMouseDownSelectionRectangle] =
    useState({ x: -1, y: -1 });
  const [selectedPointIndexes, setSelectedPointIndexes] = useState([]);
  const lastOpenShapeIndex = findLastOpenShapeIndex(shapes);
  const [canvasSize, setCanvasSize] = useState({
    width: 512,
    height: 512,
  });
  useEffect(() => {
    setCanvasSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);
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
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: -1,
    y: -1,
  });
  useEffect(() => {
    refreshAppState();
    window.onpopstate = refreshAppState;
    window.onhashchange = refreshAppState;
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
  const selectAll = () => {
    setDrawState(DRAW_STATE_SELECTION_SET);
    setSelectionRectangle({
      x: 0,
      y: 0,
      width: canvasSize.width,
      height: canvasSize.height,
    });
  };
  console.log(appState);
  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown(setKeyStates, selectAll)}
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
        currentSegmentIndex
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
        setIsMouseDown,
        setShowContextMenu,
        showContextMenu
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
        isMouseDown,
        showContextMenu
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
      <div className="editor">
        <h3>
          #Canvas{" "}
          <span className={"drawing-info"}>{DRAW_STATE_LABELS[drawState]}</span>
        </h3>
        {showContextMenu && (
          <ContextMenu
            contextMenuPosition={contextMenuPosition}
            onContextMenuAction={handleContextMenuAction}
            setCurrentFillColor={setCurrentFillColor}
            setCurrentStrokeColor={setCurrentStrokeColor}
            currentShapeIndex={currentShapeIndex}
            setShowContextMenu={setShowContextMenu}
            currentFillColor={currentFillColor}
            currentStrokeColor={currentStrokeColor}
            shapes={shapes}
            setShapes={setShapes}
            previews={previews}
            setPreviews={setPreviews}
            setShowContextMenu={setShowContextMenu}
            selectionRectangle={selectionRectangle}
          />
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="canvas"
          width={canvasSize.width}
          height={canvasSize.height}
          data-is-canvas={true}
        >
          <line
            x1={0}
            x2={canvasSize.width}
            style={{ stroke: "blue" }}
            y1={canvasSize.height / 2}
            y2={canvasSize.height / 2}
          />
          <line
            y1={0}
            y2={canvasSize.height}
            style={{ stroke: "blue" }}
            x1={canvasSize.width / 2}
            x2={canvasSize.width / 2}
          />
          {shapes.map((shape, index) => {
            const shapeWithCursor = [...shape.points, cursorPosition];
            const pointsAsSVGString = buildSVGPath(shapeWithCursor);

            return (
              <g key={index}>
                {shape.text && (
                  <text
                    fontSize={shape.fontSize || 15}
                    data-is-polygon={true}
                    data-shape-index={index}
                    x={shape.points[0].x}
                    y={shape.points[0].y}
                  >
                    {shape.text}
                  </text>
                )}
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
                                  isPointInRectangle(point, selectionRectangle);
                              } else if (
                                drawState === DRAW_STATE_MOVE_SELECTED_SEGMENTS
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
                              : "transparent"
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
      {(() => {
        let _height = 10;
        return previews.map(({ shapes: shapeIndexes, size }, index) => {
          const preview = (
            <Preview
              shapes={shapes}
              shapeIndexes={shapeIndexes}
              size={size}
              key={index}
              onRemove={(event) => {
                event.preventDefault();
                setPreviews(previews.filter((_, previewIndex) => index !== previewIndex))
                setDrawState(DRAW_STATE_READY);
              }}
              style={{
                top: _height,
              }}
            />
          );
          _height += size + 40;
          return preview;
        });
      })()}
    </div>
  );
}

export default App;
