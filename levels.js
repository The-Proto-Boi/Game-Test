// Types: spike, saw, block, portal
// Portal subtypes: speed, gravity, mode

const LEVELS = [
  {
    id: 1,
    name: "Stereo Start", // make your own names
    length: 3500,
    startSpeed: 1.0,
    objects: [
      { type: "spike", x: 500, y: 340, w: 40, h: 60 },
      { type: "saw",   x: 800, y: 330, w: 50, h: 50 },

      // speed portal (faster)
      { type: "portal", portalType: "speed", factor: 1.3, x: 1000, y: 320, w: 40, h: 80 },

      // gravity portal (flip)
      { type: "portal", portalType: "gravity", x: 1400, y: 320, w: 40, h: 80 },

      // mode portal (cube -> ship)
      { type: "portal", portalType: "mode", mode: "ship", x: 1800, y: 320, w: 40, h: 80 },

      // more spikes etc…
    ]
  },
  {
    id: 2,
    name: "Back on Track-ish",
    length: 4000,
    startSpeed: 1.0,
    objects: [
      { type: "spike", x: 400, y: 340, w: 40, h: 60 },
      { type: "block", x: 700, y: 320, w: 120, h: 80 },
      { type: "saw",   x: 1000, y: 330, w: 50, h: 50 },
      // etc…
    ]
  }
];
