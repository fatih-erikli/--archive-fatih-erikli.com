import { useState, React, useEffect } from "react";
import { ChromePicker as ColorPicker } from "react-color";
import "./App.css";

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
const SEGMENT_CIRCLE_RADIUS = 1;

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
  selectedPointIndexesSetterFunction
) {
  return (event) => {
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
  currentFillColor
) {
  return (event) => {
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
  selectedPointIndexes
) {
  return ({ clientX, clientY, target }) => {
    const clientRect = document
      .querySelector(".canvas")
      .getBoundingClientRect();
    const cursorPosition = {
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
              ? cursorPosition
              : point
          ),
        }))
      );
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
        shapes.map((shape, shapeIndex) => ({
          ...shape,
          points: shape.points.map((point, pointIndex) => {
            const cachedPointIndex = _shapeIndex;
            _shapeIndex++;
            return selectedPointIndexes.indexOf(cachedPointIndex) > -1
              ? {
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
            : selectionRectangle
            ? DRAW_STATE_ON_SEGMENT_SELECTION
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

function App() {
  const [drawState, setDrawState] = useState(DRAW_STATE_READY);
  const [cursorPosition, setCursorPosition] = useState({ x: -1, y: -1 });
  const [mouseDownCursorPosition, setMouseDownCursorPosition] = useState({
    x: -1,
    y: -1,
  });
  const [mouseDownShapePoints, setMouseDownShapePoints] = useState([]);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(-1);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(-1);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(-1);
  const [shapes, setShapes, refreshShapesState] = useHashedState("shapes", []);
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
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    refreshShapesState();
    window.onpopstate = refreshShapesState;
    window.onhashchange = refreshShapesState;
  }, []);

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown(setKeyStates)}
      onKeyUp={handleKeyUp(setKeyStates)}
      className="app-container"
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
        setSelectedPointIndexes
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
        selectedPointIndexes
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
        currentFillColor
      )}
    >
      <h1>
        Hello, my name is Fatih.
        <div className={"color-picker"}>
          <span
            style={{
              borderRadius: 5,
              backgroundColor: `rgba(${currentFillColor.r}, ${currentFillColor.g}, ${currentFillColor.b}, ${currentFillColor.a})`,
              width: 20,
              height: 20,
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowColorPicker(!showColorPicker);
            }}
          ></span>
          {showColorPicker && (
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
        </div>
        {keyStates.isShiftPressed && "shift"}
        {keyStates.isCtrlPressed && "ctrl"}
      </h1>
      <div className="editor">
        <div className={"canvas-wrapper"}>
          <h3>
            #Canvas{" "}
            <span className={"drawing-info"}>
              {DRAW_STATE_LABELS[drawState]}
            </span>
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="canvas"
            width={512}
            height={512}
            style={
              {
                // background: 'url(vesikalik.jpg)',
                // backgroundSize: 542,
                // backgroundPositionX: 0,
                // backgroundPositionY: -60,
              }
            }
          >
            {new Array(128).fill(undefined).map((_, index) => (
              <line
                key={`y-${index}`}
                x1={0}
                x2={512}
                style={{
                  stroke: "silver",
                }}
                y1={index * 8}
                y2={index * 8}
              />
            ))}
            {new Array(128).fill(undefined).map((_, index) => (
              <line
                key={`x-${index}`}
                y1={0}
                y2={512}
                style={{
                  stroke: "silver",
                }}
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
              const pointsAsSVGString = shapeWithCursor
                .map(({ x, y }) => `${x},${y}`)
                .join(" ");
              return (
                <g key={index}>
                  <polygon
                    points={pointsAsSVGString}
                    data-is-polygon={true}
                    data-shape-index={index}
                    fill={shape.fill || "transparent"}
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
                                : "gray"
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
                    const pointsAsSVGString = shape.points
                      .map(({ x, y }) => `${x / divider},${y / divider}`)
                      .join(" ");
                    return (
                      <g key={index}>
                        <polygon points={pointsAsSVGString} fill={shape.fill} />
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

          <div id="bio">I am a software developer.</div>
        </div>

        <div id="page">
          <h1>Experiences</h1>
          <div class="work-experience">
            <h1>EPAM Systems</h1>
            <h2>Resource Manager &amp; Senior Software Engineer</h2>
            <p>
              I was responsible for the UI development of an embedded smart-tv
              application. I mainly worked on the networking interface of the
              application. It is a NodeJS application that using Wayland
              compositor to interact with the backend services.
            </p>
          </div>
          <div class="work-experience">
            <h1>EPAM Systems</h1>
            <h2>Lead Software Engineer</h2>
            <p>
              I mainly worked on development of an interactive map for a seat
              selection in a ticket-selling web site. I worked with React and
              GraphQL.
            </p>
          </div>
          <div class="work-experience">
            <h1>Adphorus</h1>
            <h2>Senior Software Engineer</h2>
            <p>
              Adphorus is an intelligent ad and creative management tool. I
              worked on the development of the UI with React and Redux.
              Basically the tool allows you to create an ad and publish it on
              several platforms such as Facebook and Twitter. I was working
              closely with the Product team to provide users an abstract
              interface which works for all the platforms.
            </p>
          </div>
          <div class="work-experience">
            <h1>Hipolabs</h1>
            <h2>Senior Software Engineer</h2>
            <p>
              I worked on the application chroma; which is an attribution editor
              for collec- tion items and natural species. I worked as a
              full-stack developer. Backend system built with Python and Tornado
              web framework and running on AWS. The frontend and the attribution
              editor is built with AngularJS.
            </p>
          </div>
          <div class="work-experience">
            <h1>Metglobal</h1>
            <h2>Senior Software Engineer &amp; Community Manager</h2>
            <p>
              Metglobal is a leading travel-tech company in Turkey. I was
              responsible for the development travel websites and hotel search
              engines. I also lead the development relationships community and
              initiated a software development and research lab in the company.
            </p>
          </div>
          <div class="work-experience">
            <h1>Freelancer</h1>
            <p>
              Worked on several projects in both backend and frontend sites.
              Most of them are not active anymore. I mainly used Django web
              framework and pure javascript without any framework.
            </p>
          </div>
          <div class="languages">
            <h1>Languages</h1>
            <p>
              Turkish — My Native Language <br />
              English — Professional working efficiency <br />
              Polish — I lived in Poland for 4 years.
            </p>
          </div>
          <div class="open-source-projects">
            <h1>Open-source projects</h1>
            <p>
              github.com/inveniosoftware/dictdiffer <br />
              github.com/arguman/arguman/arguman.org <br />
              github.com/react-designer/react-designer <br />
              github.com/fatih-erikli/disease-simulation
            </p>
          </div>
        </div>
      </div>
      <footer>Fatih Erikli — 2021 — Creative Commons</footer>
    </div>
  );
}

export default App;
