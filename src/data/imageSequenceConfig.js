// Configuration for the Big Bite 36-frame cinematic PNG image sequence
export const TOTAL_FRAMES = 36;
export const FRAME_ASPECT_RATIO = 16 / 9; // 1280 x 720
export const NATIVE_WIDTH = 1280;
export const NATIVE_HEIGHT = 720;

/**
 * Returns the public URL path for a given frame index (1-based: 1 to 36).
 * Formatted as /ezgif-frame-001.png to /ezgif-frame-036.png
 */
export function getFrameUrl(frameIndex) {
  const paddedIndex = String(frameIndex).padStart(3, '0');
  return `/ezgif-frame-${paddedIndex}.png`;
}

// Generate the complete manifest of frame URLs
export const FRAME_MANIFEST = Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameUrl(i + 1));

/**
 * Story stages mapped to scroll progress ranges [0, 1] and frame ranges.
 * Based on visual analysis of all 36 frames:
 * - Frames 1-7: Castle courtyard, truck drives in from right edge
 * - Frames 8-13: Truck enters center, slows down and stops
 * - Frames 14-22: Truck turns side-on, awning lifts, serving window opens, warm kitchen revealed
 * - Frames 23-28: Camera zooms in toward cooking counter with rising steam
 * - Frames 29-33: Inside kitchen sizzle, chef with flaming wok stir-fry
 * - Frames 34-36: Grand culinary fusion & steam montage transitioning to site
 */
export const STORY_STAGES = [
  {
    id: 'intro',
    name: 'Magical Establishing Shot',
    frameStart: 1,
    frameEnd: 7,
    progressStart: 0.0,
    progressPeak: 0.08,
    progressEnd: 0.22,
    badge: 'FRESH OFF THE GRILL',
    title: 'BIG FLAVOUR.\nBIGGER CRAVINGS.',
    description: 'Freshly made street food, bold flavours, and unforgettable bites. Welcome to Big Bite.',
    buttons: [
      { text: 'EXPLORE OUR MENU', target: '#menu', primary: true },
      { text: 'FIND OUR TRUCK', target: '#location', primary: false }
    ],
    alignment: 'left'
  },
  {
    id: 'arrival',
    name: 'The Truck Arrives & Stops',
    frameStart: 8,
    frameEnd: 14,
    progressStart: 0.24,
    progressPeak: 0.33,
    progressEnd: 0.44,
    badge: 'JUST PULLED UP',
    title: 'HERE COMES\nSOMETHING DELICIOUS.',
    description: 'Follow the irresistible aroma. The grill is heating up and magic is in motion.',
    alignment: 'center'
  },
  {
    id: 'window',
    name: 'Serving Window Opens',
    frameStart: 15,
    frameEnd: 23,
    progressStart: 0.46,
    progressPeak: 0.55,
    progressEnd: 0.66,
    badge: 'HATCH OPEN',
    title: 'STEP INSIDE\nTHE FLAVOUR.',
    description: 'Fresh ingredients, hot steel, and craft recipes prepared right before your eyes.',
    alignment: 'right'
  },
  {
    id: 'cooking',
    name: 'Cooking Action & Sizzle',
    frameStart: 24,
    frameEnd: 33,
    progressStart: 0.68,
    progressPeak: 0.80,
    progressEnd: 0.92,
    badge: 'LIVE ON THE GRILL',
    title: "YOU HEAR THE SIZZLE.\nYOU KNOW IT'S BIG BITE.",
    description: 'Fresh ingredients, bold flavours, and food prepared with passion. Every bite starts behind the grill.',
    alignment: 'left'
  }
];
