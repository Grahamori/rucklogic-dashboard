function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const overlayPool = {
  sarcasm: [
    "Not perfect, but who is?",
    "Adds character. Like your ex’s hoodie.",
    "Flawed, but still better than most people.",
    "It’s got personality. Deal with it.",
    "Worn once, judged forever.",
    "This piece has seen things.",
    "Minor flaws, major vibes.",
    "Perfectly imperfect.",
    "A little rough around the edges—just like you.",
    "Comes with stories, not just stitches.",
    "Slightly damaged, highly desirable.",
    "If it had feelings, it’d be offended.",
    "Still better than your last impulse buy.",
    "It’s got quirks. You’ve got taste.",
    "Not showroom fresh, but street-ready.",
    "Battle scars included.",
    "Authenticity: 100%. Perfection: optional.",
    "You didn’t want boring anyway.",
    "Flaws? More like features.",
    "This one’s got edge."
  ],
  genZ: [
    "Lowkey a steal. No cap.",
    "Drip certified. Don’t @ me.",
    "Vibe check: passed.",
    "This slaps harder than your playlist.",
    "Main character energy.",
    "Fit goes crazy.",
    "Deadass wearable.",
    "No crumbs left.",
    "It’s giving resale royalty.",
    "Sheesh-worthy.",
    "Flex incoming.",
    "Built different.",
    "This one’s got sauce.",
    "Certified banger.",
    "Too fire to sit in your cart.",
    "Wear it, don’t gatekeep it.",
    "Clean AF.",
    "This piece eats.",
    "It’s the fit for me.",
    "Straight heat."
  ],
  resale: [
    "Priced to flip, not to sit.",
    "Profit margin approved.",
    "Reseller’s dream. Buyer’s win.",
    "Solid ROI in fabric form.",
    "List it, ship it, repeat.",
    "Stocked for the savvy.",
    "Margins intact, quality intact.",
    "Built for the flip life.",
    "Quick turnover potential.",
    "Low cost, high appeal.",
    "Graded and ready to move.",
    "No fluff, just resale value.",
    "Packaged for profit.",
    "This one’s a mover.",
    "Resale-ready, buyer-friendly.",
    "Flipper’s delight.",
    "Smart buy, smarter sell.",
    "Inventory gold.",
    "List it now, thank yourself later.",
    "This one’s not sticking around."
  ],
  clean: [
    "Professionally inspected and ready to ship.",
    "Cleaned, checked, and packed with care.",
    "No surprises. Just solid resale.",
    "Condition verified. No guesswork.",
    "Prepped and polished.",
    "Handled with care from shelf to shipment.",
    "Graded honestly, packed securely.",
    "Ready for dispatch, no drama.",
    "Clean cut, clean conscience.",
    "What you see is what you get.",
    "No damage, no doubt.",
    "Inspected by humans, not hope.",
    "Photos match reality.",
    "Condition: confirmed.",
    "Packed like it matters.",
    "No fluff, just facts.",
    "Listing with integrity.",
    "Ship-ready and shelf-worthy.",
    "Clean condition, clean conscience.",
    "This one’s locked and loaded."
  ],
  trustworthy: [
    "Carefully checked, gently used, and packed with care.",
    "Reliable condition. Honest grading.",
    "What you see is what you get—no fluff.",
    "Inspected and verified.",
    "Graded with transparency.",
    "Condition backed by experience.",
    "No surprises, just quality.",
    "Packed with buyer trust in mind.",
    "Photos match reality.",
    "Handled with care.",
    "Graded for clarity, not confusion.",
    "This one’s been through the checklist.",
    "Honest listing, solid product.",
    "Condition: confirmed.",
    "Ready to ship, ready to impress.",
    "Trust the grade, trust the seller.",
    "No drama, just delivery.",
    "This one’s been vetted.",
    "Buy with confidence.",
    "Listing built on trust."
  ],
  witty: [
    "No drama, just drip.",
    "Fresh enough to flex, chill enough to wear.",
    "Style that slaps without trying too hard.",
    "Looks expensive. Isn’t.",
    "Clean lines, dirty looks.",
    "Wear it like you mean it.",
    "Too cool to stay in your drawer.",
    "Certified vibe material.",
    "Drip with zero effort.",
    "Flex-friendly, couch-approved.",
    "Outfit starter pack: unlocked.",
    "This piece speaks fluent sarcasm.",
    "For people who don’t follow trends—they start them.",
    "Your mirror will thank you.",
    "Not just wearable—shareable.",
    "Streetwear with a smirk.",
    "Casual chaos in fabric form.",
    "The kind of cool that doesn’t need explaining.",
    "Worn once, complimented twice.",
    "If this had an ego, it’d be justified."
  ],
  hype: [
    "Rare find. Don’t sleep.",
    "Limited vibes. Act fast.",
    "This one’s not sticking around.",
    "Too hot to sit in your cart.",
    "Drop-worthy condition.",
    "This piece moves fast.",
    "Don’t blink—it’ll be gone.",
    "High demand, low patience.",
    "This one’s built for the bold.",
    "If you know, you know.",
    "Hype beast approved.",
    "This one’s got heat.",
    "Don’t wait for restock.",
    "First come, flex first.",
    "This is the one they’ll ask about.",
    "Rare condition, rarer price.",
    "This one’s a grail.",
    "Act fast, flex faster.",
    "This piece doesn’t linger.",
    "You saw it first—now claim it."
  ],
  minimal: [
    "Ships fast.",
    "No fluff. Just facts.",
    "Listed. Packed. Gone.",
    "Clean copy, clean product.",
    "Grade confirmed. Ready to ship.",
    "Minimal words, maximum value.",
    "No drama, just delivery.",
    "Condition: stated. Price: fair.",
    "Simple listing, solid product.",
    "This one’s ready to move.",
    "No extras, no excuses.",
    "Straightforward and ship-ready.",
    "Grade A, no BS.",
    "Just the essentials.",
    "No filler, no fiction.",
    "This one’s all signal, no noise.",
    "Minimal copy, maximum clarity.",
    "Listed clean, shipped cleaner.",
    "Buy it, wear it, done.",
    "No distractions—just the product."
  ]
};

export function generateDescription({
  brand,
  itemType,
  grade,
  platform,
  style,
  size,
  colour,
  material,
  fit,
  flaws,
  personality = []
}) {
  const fallbackStyle = {
    eBay: "neutral",
    Depop: "witty",
    Vinted: "trustworthy"
  }[platform] || "neutral";

  const tone = style || fallbackStyle;

  const parts = [];

  if (brand && itemType) parts.push(`${brand} ${itemType}`);
  if (colour) parts.push(`in ${colour}`);
  if (size) parts.push(`size ${size}`);
  if (grade) parts.push(`Grade ${grade}`);
  if (material) parts.push(`${material} material`);
  if (fit) parts.push(`${fit} fit`);

  let base = parts.join(", ") + ".";

  if (flaws) {
    base += ` ${flaws.trim().endsWith(".") ? flaws.trim() : flaws.trim() + "."}`;
  }

  const overlays = [];

  personality.forEach(tag => {
    if (overlayPool[tag]) overlays.push(pickRandom(overlayPool[tag]));
  });

  if (overlays.length === 0 && overlayPool[tone]) {
    overlays.push(pickRandom(overlayPool[tone]));
  }

  return `${base} ${overlays.join(" ")}`.trim();
}
