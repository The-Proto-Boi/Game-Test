// Example level format (MAKE YOUR OWN LAYOUTS)
const LEVELS = [
  {
    name: "Level 1",
    length: 3000, // world length in pixels
    obstacles: [
      // type: "spike" or "block" or "platform" etc.
      { type: "spike", x: 500, y: 340, width: 40, height: 60 },
      { type: "spike", x: 700, y: 340, width: 40, height: 60 },
      { type: "block", x: 900, y: 320, width: 80, height: 80 },
      { type: "spike", x: 1100, y: 340, width: 40, height: 60 },
      // add more…
    ]
  },
  {
    name: "Level 2",
    length: 4000,
    obstacles: [
      { type: "spike", x: 400, y: 340, width: 40, height: 60 },
      { type: "spike", x: 440, y: 340, width: 40, height: 60 },
      { type: "block", x: 800, y: 300, width: 120, height: 100 },
      // etc…
    ]
  }
];
