// LEVELS: your own layouts (do NOT copy GD’s exact layouts)

const LEVELS = [
  {
    id: 1,
    name: "Starter Run",
    length: 3000,
    startSpeed: 1.0,
    backgroundColor: "#202040",
    objects: [
      { type: "spike", x: 500, y: 340, w: 40, h: 60 },
      { type: "spike", x: 700, y: 340, w: 40, h: 60 },
      { type: "block", x: 900, y: 320, w: 80, h: 80 },

      // speed up
      { type: "portal", portalType: "speed", factor: 1.3, x: 1200, y: 320, w: 40, h: 80 },

      { type: "saw", x: 1500, y: 330, w: 50, h: 50 },
      { type: "spike", x: 1700, y: 340, w: 40, h: 60 }
    ]
  },
  {
    id: 2,
    name: "Gravity Flip",
    length: 3500,
    startSpeed: 1.0,
    backgroundColor: "#204020",
    objects: [
      { type: "spike", x: 400, y: 340, w: 40, h: 60 },
      { type: "block", x: 700, y: 320, w: 120, h: 80 },

      // gravity flip
      { type: "portal", portalType: "gravity", x: 1000, y: 320, w: 40, h: 80 },

      { type: "spike", x: 1300, y: 40, w: 40, h: 60 }, // ceiling spike (for flipped)
      { type: "saw", x: 1600, y: 60, w: 50, h: 50 }
    ]
  },
  {
    id: 3,
    name: "Ship Test",
    length: 4000,
    startSpeed: 1.0,
    backgroundColor: "#402020",
    objects: [
      { type: "spike", x: 400, y: 340, w: 40, h: 60 },

      // ship mode
      { type: "portal", portalType: "mode", mode: "ship", x: 800, y: 320, w: 40, h: 80 },

      { type: "saw", x: 1100, y: 260, w: 50, h: 50 },
      { type: "saw", x: 1300, y: 200, w: 50, h: 50 },
      { type: "spike", x: 1600, y: 340, w: 40, h: 60 },

      // back to cube
      { type: "portal", portalType: "mode", mode: "cube", x: 2000, y: 320, w: 40, h: 80 },

      { type: "block", x: 2300, y: 320, w: 120, h: 80 },
      { type: "spike", x: 2600, y: 340, w: 40, h: 60 }
    ]
  }
];
