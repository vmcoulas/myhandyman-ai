export type RepairGuide = {
  slug: string;
  title: string;
  metaDescription: string;
  heroEmoji: string;
  difficulty: "Easy" | "Medium" | "Hard";
  activeTime: number;
  totalTime: number;
  estimatedCost: string;
  safetyLevel: "DIY-friendly" | "Advanced repair" | "Professional required";
  overview: string;
  toolsNeeded: string[];
  materialsNeeded: { name: string; estimatedCost: string; amazonSearch: string }[];
  steps: { title: string; description: string; safetyWarning?: string }[];
  whenToCallPro: string;
  relatedRepairs: string[];
};

const AMAZON_TAG = "myhandyman-20";
export const getAmazonLink = (search: string) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(search)}&tag=${AMAZON_TAG}`;

export const REPAIRS: RepairGuide[] = [
  {
    slug: "fix-running-toilet",
    title: "How to Fix a Running Toilet",
    metaDescription: "Step-by-step guide to fix a running toilet. Learn how to replace the flapper, adjust the fill valve, and stop wasting water. Save $75-150 on a plumber.",
    heroEmoji: "🚽",
    difficulty: "Easy",
    activeTime: 20,
    totalTime: 30,
    estimatedCost: "$8-25",
    safetyLevel: "DIY-friendly",
    overview: "A running toilet is one of the most common — and most annoying — household problems. That constant sound of water flowing means your toilet is continuously refilling, wasting up to 200 gallons of water per day and adding $50+ to your monthly water bill.\n\nThe good news? In 90% of cases, the fix takes less than 20 minutes and costs under $25. The three most common causes are a worn flapper (the rubber seal at the bottom of the tank), a faulty fill valve, or an improperly adjusted float. We'll walk you through diagnosing which one it is and fixing it.\n\nNo special skills required — if you can turn a wrench and flush a toilet, you can do this repair.",
    toolsNeeded: ["Adjustable wrench", "Towel or sponge", "Bucket", "Rubber gloves (optional)"],
    materialsNeeded: [
      { name: "Universal toilet flapper", estimatedCost: "$5-8", amazonSearch: "universal+toilet+flapper" },
      { name: "Toilet fill valve (if needed)", estimatedCost: "$8-15", amazonSearch: "toilet+fill+valve+universal" },
      { name: "Toilet repair kit (covers everything)", estimatedCost: "$15-25", amazonSearch: "toilet+repair+kit+complete" },
    ],
    steps: [
      {
        title: "Diagnose the problem",
        description: "Remove the tank lid and set it aside carefully (porcelain breaks easily). Look inside while the toilet runs. If water is flowing over the overflow tube, your float is set too high. If water is leaking from the bottom of the tank into the bowl, your flapper is worn. Drop a few drops of food coloring into the tank water — if color appears in the bowl without flushing, the flapper is definitely leaking.",
      },
      {
        title: "Turn off the water supply",
        description: "Locate the shut-off valve behind the toilet, near the floor. Turn it clockwise until it stops. Flush the toilet to drain most of the tank water. Use a towel or sponge to soak up any remaining water in the tank. This gives you a dry workspace.",
      },
      {
        title: "Replace the flapper (most common fix)",
        description: "Unhook the old flapper from the overflow tube ears — it usually just unclips. Disconnect the chain from the flush lever. Take the old flapper to the hardware store if you're unsure of the size, or use a universal flapper. Hook the new flapper onto the overflow tube ears, reconnect the chain to the flush lever with about 1/2 inch of slack. Too much slack and it won't seal; too little and it won't close fully.",
      },
      {
        title: "Adjust the float (if water is too high)",
        description: "If water is running over the overflow tube, you need to lower the float. For a ball float (the big ball on an arm), bend the arm slightly downward or turn the adjustment screw on top. For a cylinder float (slides up and down the fill valve), pinch the spring clip and slide the float down about 1 inch. The water level should sit about 1 inch below the top of the overflow tube.",
      },
      {
        title: "Replace the fill valve (if still running)",
        description: "If a new flapper and float adjustment don't fix it, the fill valve itself may be worn. Disconnect the water supply line from the bottom of the tank (have a bucket ready for drips). Unscrew the locknut holding the fill valve in place. Remove the old valve and insert the new one, adjusting the height to match the overflow tube. Tighten the locknut by hand plus 1/2 turn with a wrench. Reconnect the water supply line.",
      },
      {
        title: "Turn water back on and test",
        description: "Slowly turn the shut-off valve counter-clockwise to restore water. Let the tank fill completely. Flush 2-3 times and listen — the running sound should be gone. Check that water stops filling about 1 inch below the overflow tube. Do the food coloring test again to confirm the flapper is sealing properly. Replace the tank lid.",
      },
    ],
    whenToCallPro: "Call a plumber if the toilet is cracked, leaking from the base (wax ring issue), if you see water damage on the ceiling below a second-floor bathroom, or if the shut-off valve is stuck or leaking when you try to turn it.",
    relatedRepairs: ["replace-toilet-flapper", "unclog-drain", "replace-toilet-seat"],
  },
  {
    slug: "unclog-drain",
    title: "How to Unclog a Drain",
    metaDescription: "Clear a clogged sink or shower drain without chemicals. Step-by-step guide using a plunger, drain snake, and natural cleaners. Works on kitchen and bathroom drains.",
    heroEmoji: "🔧",
    difficulty: "Easy",
    activeTime: 15,
    totalTime: 30,
    estimatedCost: "$5-30",
    safetyLevel: "DIY-friendly",
    overview: "A slow or clogged drain is usually caused by hair, soap buildup, grease, or food particles that accumulate over time. Before you reach for chemical drain cleaners (which can damage pipes and are terrible for the environment), try these mechanical methods that actually work better.\n\nMost clogs are within the first 2 feet of the drain opening, which means you can clear them without any plumbing experience. The key is starting with the simplest method and escalating only if needed.\n\nThis guide covers kitchen sinks, bathroom sinks, shower drains, and bathtub drains. The technique varies slightly for each, but the tools are the same.",
    toolsNeeded: ["Cup plunger (for sinks) or flange plunger (for toilets)", "Drain snake or auger (25ft)", "Bucket", "Rubber gloves", "Flashlight", "Old toothbrush"],
    materialsNeeded: [
      { name: "Drain snake / auger (25ft)", estimatedCost: "$20-35", amazonSearch: "drain+snake+auger+25ft" },
      { name: "Baking soda (1 cup)", estimatedCost: "$3", amazonSearch: "baking+soda+cleaning" },
      { name: "White vinegar (1 cup)", estimatedCost: "$3", amazonSearch: "white+vinegar+cleaning" },
      { name: "Drain hair catcher (prevention)", estimatedCost: "$5-8", amazonSearch: "drain+hair+catcher+shower" },
    ],
    steps: [
      {
        title: "Try boiling water first",
        description: "Boil a full kettle of water. Remove any standing water from the sink. Pour the boiling water directly down the drain in 2-3 stages, waiting a few seconds between pours. This alone can dissolve soap and grease clogs. Do NOT use boiling water if you have PVC pipes (they can soften) — use very hot tap water instead.",
        safetyWarning: "Be careful handling boiling water. Do not use on PVC pipes.",
      },
      {
        title: "Try the baking soda and vinegar method",
        description: "Pour 1/2 cup of baking soda directly into the drain. Follow with 1/2 cup of white vinegar. You'll hear fizzing — that's the reaction breaking down buildup. Cover the drain with a wet cloth to keep the reaction focused downward. Wait 15-30 minutes, then flush with hot water. Repeat if needed.",
      },
      {
        title: "Use a plunger",
        description: "Fill the sink with 2-3 inches of water (enough to cover the plunger cup). If it's a double sink, block the other drain with a wet rag. Place the cup plunger over the drain, ensuring a good seal. Plunge vigorously 15-20 times with sharp, quick strokes. On the last plunge, pull up sharply to break the seal. The clog should release with the suction.",
      },
      {
        title: "Remove and clean the P-trap",
        description: "Place a bucket under the curved pipe (P-trap) beneath the sink. Unscrew the slip nuts on both ends of the P-trap by hand or with pliers. Let water and debris drain into the bucket. Clean the P-trap thoroughly — you'll likely find the clog here. Also check the horizontal pipe going into the wall. Reassemble hand-tight plus 1/4 turn with pliers.",
      },
      {
        title: "Use a drain snake for deeper clogs",
        description: "If the clog is past the P-trap, feed the drain snake into the pipe opening in the wall. Push it forward while rotating the handle clockwise. When you feel resistance, you've hit the clog. Keep rotating and pushing to break through it. Pull the snake out slowly — the clog should come with it. Run hot water for 2-3 minutes to flush everything through.",
      },
      {
        title: "Prevent future clogs",
        description: "Install a drain hair catcher in shower and bathroom sink drains. Never pour grease down kitchen drains — let it cool and throw it in the trash. Run hot water for 30 seconds after doing dishes. Once a month, do the baking soda and vinegar treatment as maintenance. These simple habits prevent 90% of drain clogs.",
      },
    ],
    whenToCallPro: "Call a plumber if multiple drains are clogged simultaneously (could indicate a main sewer line issue), if you smell sewage, if water is backing up into other fixtures, or if the snake hits something solid you can't get past.",
    relatedRepairs: ["fix-running-toilet", "fix-leaky-faucet", "fix-garbage-disposal"],
  },
  {
    slug: "fix-leaky-faucet",
    title: "How to Fix a Leaky Faucet",
    metaDescription: "Stop a dripping faucet in under an hour. Covers single-handle and double-handle faucets. Save water and stop that annoying drip for under $20.",
    heroEmoji: "💧",
    difficulty: "Easy",
    activeTime: 30,
    totalTime: 45,
    estimatedCost: "$5-20",
    safetyLevel: "DIY-friendly",
    overview: "A dripping faucet wastes up to 3,000 gallons of water per year — that's enough to fill a swimming pool. Beyond the waste, that constant drip-drip-drip is maddening. The fix is almost always a worn O-ring, cartridge, or washer that costs a few dollars to replace.\n\nThe trickiest part is figuring out what type of faucet you have: cartridge, ball, ceramic disc, or compression. Don't worry — we'll help you identify it. Once you know the type, the repair is straightforward.\n\nThis is one of those repairs that feels intimidating but is actually very beginner-friendly. The whole job takes 30-45 minutes and the parts cost under $20.",
    toolsNeeded: ["Adjustable wrench", "Phillips screwdriver", "Flathead screwdriver", "Allen wrench set", "Towel", "Plumber's grease"],
    materialsNeeded: [
      { name: "Faucet cartridge (match your brand)", estimatedCost: "$8-15", amazonSearch: "faucet+cartridge+replacement" },
      { name: "O-ring assortment kit", estimatedCost: "$5-8", amazonSearch: "o+ring+assortment+faucet" },
      { name: "Plumber's grease", estimatedCost: "$5", amazonSearch: "plumbers+grease+silicone" },
    ],
    steps: [
      {
        title: "Turn off the water supply",
        description: "Look under the sink for the hot and cold shut-off valves. Turn both clockwise until they stop. Turn on the faucet to release any remaining pressure and water in the lines. Plug the drain with a rag or stopper so you don't lose small parts down the sink.",
      },
      {
        title: "Identify your faucet type",
        description: "Single handle that moves up/down and left/right is usually a cartridge or ball type. Two separate handles (hot and cold) are usually compression or cartridge. Look for a brand name — Moen, Delta, Kohler, and Price Pfister all use different cartridge systems. Take a photo of your faucet and any model numbers you find before disassembly.",
      },
      {
        title: "Remove the faucet handle",
        description: "Pry off the decorative cap on top of the handle (use a flathead screwdriver gently). Remove the screw underneath — usually Phillips or Allen. Pull the handle straight up and off. If it's stuck, wiggle gently while pulling. Avoid using excessive force which can crack the handle or damage the valve body.",
      },
      {
        title: "Replace the cartridge or worn parts",
        description: "For cartridge faucets: use pliers to pull the cartridge straight out. Note the orientation — it must go back the same way. Take the old cartridge to the hardware store to match it exactly. Apply plumber's grease to the new cartridge O-rings and push it firmly into place. For compression faucets: remove the stem and replace the rubber washer at the bottom.",
      },
      {
        title: "Reassemble and test",
        description: "Put everything back in reverse order: cartridge, retaining nut/clip, handle, screw, decorative cap. Hand-tighten the retaining nut, then 1/4 turn with a wrench — don't over-tighten. Slowly turn the water supply back on. Check for leaks at every connection point. Run both hot and cold for a minute. The drip should be completely gone.",
      },
    ],
    whenToCallPro: "Call a plumber if the faucet body itself is corroded or cracked, if the shut-off valves under the sink don't fully stop the water, if you see water damage in the cabinet below, or if the faucet is very old and replacement parts aren't available.",
    relatedRepairs: ["unclog-drain", "fix-leaky-pipe-under-sink", "fix-running-toilet"],
  },
  {
    slug: "patch-drywall-hole",
    title: "How to Patch a Drywall Hole",
    metaDescription: "Fix drywall holes like a pro. From nail holes to fist-sized damage, learn the right patching technique for any size hole. Invisible repairs in under 4 hours.",
    heroEmoji: "🔨",
    difficulty: "Easy",
    activeTime: 45,
    totalTime: 240,
    estimatedCost: "$10-25",
    safetyLevel: "DIY-friendly",
    overview: "Drywall holes happen — doorknobs, furniture moves, kids, or just life. The good news is that drywall patching is one of the most satisfying DIY repairs because the results are immediately visible and a properly patched hole is completely invisible after painting.\n\nThe technique depends on the size of the hole. Small nail holes need just spackle and a putty knife. Medium holes (up to 6 inches) use a self-adhesive mesh patch. Large holes require a new piece of drywall. We'll cover all three.\n\nThe active work is only about 45 minutes, but you'll need 3-4 hours total because joint compound needs to dry between coats. Plan to do this on a day when you can come back to it.",
    toolsNeeded: ["Putty knife (2\" and 6\")", "Sanding sponge (fine grit)", "Utility knife", "Pencil", "Dust mask", "Drop cloth"],
    materialsNeeded: [
      { name: "Drywall patch kit (self-adhesive)", estimatedCost: "$8-12", amazonSearch: "drywall+patch+kit+self+adhesive" },
      { name: "Lightweight joint compound (pre-mixed)", estimatedCost: "$8-12", amazonSearch: "lightweight+joint+compound+premixed" },
      { name: "Fine grit sanding sponge", estimatedCost: "$5", amazonSearch: "sanding+sponge+fine+grit+drywall" },
      { name: "Primer (small can)", estimatedCost: "$8-12", amazonSearch: "drywall+primer+small+can" },
    ],
    steps: [
      {
        title: "Prepare the damaged area",
        description: "Remove any loose drywall, paper, or debris around the hole. For small holes, just clean the edges. For medium holes, use a utility knife to trim any ragged edges into a clean shape. For large holes (over 6 inches), cut a clean square or rectangle around the damage using a drywall saw. Lay a drop cloth below to catch dust.",
      },
      {
        title: "Apply the patch (medium holes)",
        description: "For holes 1-6 inches, peel and stick the self-adhesive mesh patch centered over the hole. Press firmly to ensure it adheres to the surrounding wall. The mesh provides a surface for the joint compound to grip. For nail holes, skip the patch — just apply compound directly.",
      },
      {
        title: "Apply first coat of joint compound",
        description: "Load your 6-inch putty knife with compound. Spread it over the patch in thin, even strokes, working from the center outward. Extend the compound 2-3 inches beyond the patch edges to feather it into the surrounding wall. Don't try to make it perfect on the first coat — it will shrink as it dries. A thin coat is better than a thick one.",
      },
      {
        title: "Sand and apply second coat",
        description: "Wait 2-3 hours (or until completely dry — it will turn from dark to white). Lightly sand with the fine grit sponge to knock down any ridges or bumps. Wipe away dust with a damp cloth. Apply a second thin coat, extending 1-2 inches beyond the first coat to further blend the edges. This feathering technique is what makes the patch invisible.",
      },
      {
        title: "Final sand, prime, and paint",
        description: "After the second coat dries completely, do a final light sanding. Run your hand over it — it should feel smooth and flush with the surrounding wall. Apply a thin coat of primer to the patched area (unprimed compound absorbs paint differently and will show through). Once primer dries, paint with matching wall color. Two coats of paint usually blends perfectly.",
        safetyWarning: "Wear a dust mask while sanding drywall compound. The fine dust is irritating to lungs.",
      },
    ],
    whenToCallPro: "Call a professional if the hole is larger than 12 inches, if there's water damage or mold behind the wall, if the damage extends to multiple areas, or if the wall is plaster (not drywall) — plaster repair requires different techniques.",
    relatedRepairs: ["paint-room", "patch-large-hole-drywall", "mount-tv-on-wall"],
  },
  {
    slug: "install-ceiling-fan",
    title: "How to Install a Ceiling Fan",
    metaDescription: "Install or replace a ceiling fan step by step. Covers wiring, mounting, and balancing. Save $150-300 in electrician fees with this complete guide.",
    heroEmoji: "💨",
    difficulty: "Medium",
    activeTime: 90,
    totalTime: 120,
    estimatedCost: "$50-200",
    safetyLevel: "Advanced repair",
    overview: "Installing a ceiling fan is one of the most impactful home upgrades you can do — it improves comfort, reduces energy bills, and adds value to your home. If you're replacing an existing light fixture, the wiring is usually already in place, making this much easier.\n\nThe key safety concern is electrical work. You MUST turn off the circuit breaker (not just the wall switch) before starting. If there's no existing electrical box in the ceiling, or if you need to run new wiring, hire an electrician.\n\nThis guide assumes you're replacing an existing ceiling light fixture with a fan, which is the most common scenario. The job takes about 90 minutes and saves $150-300 compared to hiring an electrician.",
    toolsNeeded: ["Voltage tester (non-contact)", "Screwdriver set (Phillips and flathead)", "Adjustable wrench", "Wire strippers", "Step ladder", "Pliers"],
    materialsNeeded: [
      { name: "Ceiling fan with light kit", estimatedCost: "$50-200", amazonSearch: "ceiling+fan+with+light+52+inch" },
      { name: "Fan-rated ceiling box (if needed)", estimatedCost: "$10-15", amazonSearch: "fan+rated+ceiling+electrical+box" },
      { name: "Wire nuts (assorted)", estimatedCost: "$5", amazonSearch: "wire+nuts+assortment" },
      { name: "Electrical tape", estimatedCost: "$3", amazonSearch: "electrical+tape+black" },
    ],
    steps: [
      {
        title: "Turn off power at the breaker",
        description: "Go to your electrical panel and turn OFF the breaker that controls the ceiling light/fan location. Test with a non-contact voltage tester at the wall switch AND at the ceiling fixture to confirm power is completely off. Never rely on just the wall switch — someone could accidentally flip it while you're working. Put a piece of tape over the breaker so nobody turns it back on.",
        safetyWarning: "CRITICAL: Verify power is OFF with a voltage tester before touching any wires. Electrical shock can be fatal.",
      },
      {
        title: "Remove the existing fixture",
        description: "Remove the light shade/globe and bulbs. Unscrew the mounting screws or decorative nut holding the fixture to the ceiling. Carefully lower the fixture and disconnect the wire connections (usually twist-on wire nuts). You should see black (hot), white (neutral), and bare copper or green (ground) wires coming from the ceiling. Set the old fixture aside.",
      },
      {
        title: "Verify the electrical box is fan-rated",
        description: "A ceiling fan is much heavier than a light fixture and vibrates during operation. The electrical box in the ceiling MUST be fan-rated (it will say so on the box or be a metal pancake-style box attached to a brace between joists). If the existing box is a lightweight plastic box, you MUST replace it with a fan-rated box before proceeding. This is non-negotiable — a fan falling from the ceiling is extremely dangerous.",
        safetyWarning: "Never mount a ceiling fan to a non-fan-rated electrical box. The fan can fall and cause serious injury.",
      },
      {
        title: "Assemble the fan and mount the bracket",
        description: "Follow your fan's specific instructions to assemble the motor housing, downrod, and canopy. Attach the mounting bracket (included with the fan) to the fan-rated ceiling box using the provided screws. Make sure it's level and secure. Thread the fan wires down through the canopy and downrod.",
      },
      {
        title: "Wire the fan",
        description: "Hang the fan motor on the mounting bracket hook (most brackets have a hook for this purpose so you can wire with both hands free). Connect the wires: black to black (hot), white to white (neutral), green or bare copper to green or bare copper (ground). If your fan has a separate blue wire, that's for the light kit — connect it to black (hot) as well, or to a separate switch wire if you have one. Secure all connections with wire nuts and wrap with electrical tape.",
        safetyWarning: "Double-check all wire connections are tight and properly insulated before proceeding.",
      },
      {
        title: "Attach the blades and light kit",
        description: "Push all wires up into the ceiling box and attach the canopy to the mounting bracket. Attach each fan blade bracket to the motor, then attach each blade to its bracket. Install the light kit according to the manufacturer's instructions. Add the bulbs and light shade/globe.",
      },
      {
        title: "Test and balance",
        description: "Restore power at the breaker. Test the fan on all speeds and the light. If the fan wobbles, use the balancing kit included with most fans (small clip-on weights for the blades). Try each blade — the heaviest side is where you need the weight on the opposite blade. Most wobbling is caused by slightly warped blades or uneven blade weight.",
      },
    ],
    whenToCallPro: "Call an electrician if there's no existing electrical box in the ceiling, if you need to run new wiring, if you find aluminum wiring (silver-colored, common in 1960s-70s homes), if the existing wiring looks damaged or burned, or if you're not 100% comfortable working with electrical connections.",
    relatedRepairs: ["replace-light-switch", "fix-doorbell", "install-smart-thermostat"],
  },
  {
    slug: "mount-tv-on-wall",
    title: "How to Mount a TV on the Wall",
    metaDescription: "Mount your TV on the wall like a pro. Find studs, choose the right mount, hide cables, and secure it safely. Complete guide for any TV size.",
    heroEmoji: "📺",
    difficulty: "Medium",
    activeTime: 60,
    totalTime: 90,
    estimatedCost: "$25-80",
    safetyLevel: "DIY-friendly",
    overview: "Wall-mounting a TV transforms a room — it saves space, looks clean, and puts the screen at the perfect viewing height. The job is simpler than most people think, but the key is finding wall studs and using them. A TV mounted only to drywall WILL fall.\n\nThe ideal TV height places the center of the screen at eye level when seated, which is typically 42-48 inches from the floor to the center of the TV. Going higher (like above a fireplace) causes neck strain during long viewing sessions.\n\nThis guide works for any TV size from 32 to 85 inches. The process is the same — only the mount size and number of lag bolts change.",
    toolsNeeded: ["Stud finder", "Drill with bits", "Socket wrench or adjustable wrench", "Level (2ft or longer)", "Tape measure", "Pencil", "Phillips screwdriver"],
    materialsNeeded: [
      { name: "TV wall mount (match your TV size/weight)", estimatedCost: "$20-60", amazonSearch: "tv+wall+mount+full+motion" },
      { name: "Lag bolts (usually included with mount)", estimatedCost: "$5", amazonSearch: "lag+bolts+tv+mount" },
      { name: "Cable management kit", estimatedCost: "$10-15", amazonSearch: "cable+management+kit+tv+wall" },
    ],
    steps: [
      {
        title: "Choose the location and find studs",
        description: "Hold a piece of painter's tape where you want the TV center. Sit in your normal viewing position and check the height feels right (eye level when seated, about 42-48 inches from floor to TV center). Use a stud finder to locate at least two wall studs in the mounting area. Mark both edges of each stud with pencil. Studs are typically 16 inches apart. You MUST mount into studs — drywall alone cannot support a TV.",
      },
      {
        title: "Attach the mounting plate to the wall",
        description: "Hold the mounting plate against the wall, centered on your marked studs. Use a level to ensure it's perfectly horizontal — even 1 degree off will be visible and annoying forever. Mark the lag bolt holes through the plate onto the wall. Pre-drill pilot holes slightly smaller than the lag bolts. Drive the lag bolts through the plate into the studs until snug, then 1/4 turn more. Don't over-tighten — you can crack the stud.",
      },
      {
        title: "Attach the brackets to the TV",
        description: "Lay the TV face-down on a soft blanket or towel. Locate the VESA mounting holes on the back (4 threaded holes in a square pattern). Attach the TV brackets using the bolts provided with the mount. Use spacers if needed to clear any curves or ports on the TV back. Tighten firmly but don't strip the threads.",
      },
      {
        title: "Hang the TV and connect cables",
        description: "This is a two-person job for any TV over 40 inches. Lift the TV and hook the brackets onto the wall plate. Most mounts click into place. Adjust the tilt angle if your mount supports it. Connect HDMI, power, and any other cables. Use a cable management kit or raceway to hide the cords running down to your outlet and devices.",
      },
      {
        title: "Level and secure",
        description: "Step back and check that the TV is level. Most full-motion mounts allow small adjustments after hanging. Tighten all adjustment bolts. Give the TV a gentle tug forward and side to side — it should feel absolutely solid with zero wobble. If it moves at all, check that your lag bolts are fully into studs, not just drywall.",
      },
    ],
    whenToCallPro: "Call a professional if you can't find studs (metal stud walls, concrete, or brick require special anchors), if you want cables hidden inside the wall (requires cutting drywall and possibly an electrician for in-wall power), or if the TV is over 75 inches and very heavy.",
    relatedRepairs: ["patch-drywall-hole", "install-ceiling-fan", "replace-light-switch"],
  },
  {
    slug: "replace-light-switch",
    title: "How to Replace a Light Switch",
    metaDescription: "Replace a light switch safely in 15 minutes. Covers single-pole, 3-way, and dimmer switches. Step-by-step with safety warnings for electrical work.",
    heroEmoji: "💡",
    difficulty: "Medium",
    activeTime: 15,
    totalTime: 20,
    estimatedCost: "$3-25",
    safetyLevel: "Advanced repair",
    overview: "Replacing a light switch is one of the quickest home upgrades — a fresh switch or a modern dimmer can update a room's feel in 15 minutes. The electrical work is simple (you're just swapping like-for-like connections), but safety is critical.\n\nThe most common type is a single-pole switch (one switch controls one light). If your light is controlled from two different switches, you have 3-way switches, which require matching the wiring more carefully.\n\nThis guide covers replacing a standard single-pole switch with either another standard switch or a dimmer switch. Always use a voltage tester — never assume power is off.",
    toolsNeeded: ["Non-contact voltage tester", "Flathead screwdriver", "Phillips screwdriver", "Needle-nose pliers"],
    materialsNeeded: [
      { name: "Light switch (single-pole or dimmer)", estimatedCost: "$3-25", amazonSearch: "light+switch+single+pole+dimmer" },
      { name: "Wire nuts (if not included)", estimatedCost: "$3", amazonSearch: "wire+nuts+assortment" },
    ],
    steps: [
      {
        title: "Turn off power at the breaker",
        description: "Go to your electrical panel and turn off the breaker controlling this switch. Flip the light switch to confirm the light doesn't turn on. Then use a non-contact voltage tester at the switch to verify there's no power. Test the tester on a known live outlet first to confirm it's working. Tape the breaker in the off position.",
        safetyWarning: "CRITICAL: Always verify power is off with a voltage tester. Never work on live electrical circuits.",
      },
      {
        title: "Remove the old switch",
        description: "Remove the switch plate cover (one or two screws). Remove the two screws holding the switch to the electrical box. Gently pull the switch out of the box. Before touching any wires, test again with your voltage tester directly on the wire connections. Take a photo of the wiring before disconnecting anything — this is your reference for the new switch.",
      },
      {
        title: "Disconnect and connect wires",
        description: "For a standard switch, you'll see two black (or one black and one red) wires connected to the side screws, and a green or bare copper ground wire. Loosen the screws and remove the wires. If the wires are pushed into the back of the switch (backstab connections), insert a small flathead screwdriver into the release slot next to each wire. Connect the wires to the new switch in the same configuration — wrap wire clockwise around screws and tighten firmly.",
      },
      {
        title: "Install and test",
        description: "Carefully push the switch back into the electrical box, folding wires neatly behind it. Secure with the mounting screws — don't over-tighten or you'll crack the faceplate. Attach the switch plate cover. Turn the breaker back on and test the switch. If it works backwards (on is down), flip the switch over — the wires go on the same terminals but the switch is upside down.",
      },
    ],
    whenToCallPro: "Call an electrician if you find aluminum wiring, if there are more than 3 wires in the box and you're unsure of the configuration, if you want to install a smart switch that requires a neutral wire and there isn't one, or if you see any signs of burned or melted wires.",
    relatedRepairs: ["install-ceiling-fan", "fix-doorbell", "install-smart-thermostat"],
  },
  {
    slug: "fix-squeaky-door",
    title: "How to Fix a Squeaky Door",
    metaDescription: "Stop a squeaky door in 5 minutes with common household items. Covers hinges, rubbing frames, and sticking doors. The easiest home repair you'll ever do.",
    heroEmoji: "🚪",
    difficulty: "Easy",
    activeTime: 5,
    totalTime: 10,
    estimatedCost: "$0-8",
    safetyLevel: "DIY-friendly",
    overview: "A squeaky door is one of those small annoyances that's incredibly satisfying to fix — and it takes about 5 minutes. The squeak is almost always caused by friction in the hinge pins, usually from dried-out lubricant or slight misalignment.\n\nYou probably already have everything you need in your kitchen. Cooking spray, petroleum jelly, or even olive oil can stop a squeak instantly. For a longer-lasting fix, use a dedicated hinge lubricant or white lithium grease.\n\nIf the door is sticking or rubbing against the frame, that's a different issue (the door or frame has shifted) and we'll cover that too.",
    toolsNeeded: ["Hammer", "Nail or thin screwdriver", "Paper towels"],
    materialsNeeded: [
      { name: "White lithium grease or WD-40", estimatedCost: "$5-8", amazonSearch: "white+lithium+grease+spray" },
      { name: "3-in-1 oil (alternative)", estimatedCost: "$5", amazonSearch: "3+in+1+oil+household" },
    ],
    steps: [
      {
        title: "Identify which hinge squeaks",
        description: "Slowly open and close the door, listening carefully. Most doors have 2-3 hinges. The squeak usually comes from one specific hinge. Once identified, you only need to treat that hinge, though lubricating all of them takes an extra minute and prevents future squeaks.",
      },
      {
        title: "Lubricate the hinge pin",
        description: "For a quick fix: spray WD-40 or white lithium grease directly into the top of the hinge where the pin enters. Open and close the door several times to work the lubricant in. Wipe any excess with a paper towel. For a more thorough fix: tap the hinge pin up and out from the bottom using a nail and hammer. Coat the pin with grease or petroleum jelly. Slide it back in and tap it down until seated.",
      },
      {
        title: "Fix a sticking/rubbing door (if needed)",
        description: "If the door rubs against the frame, look for shiny spots on the door edge or frame where contact is happening. First, try tightening the hinge screws — loose screws are the #1 cause of sagging doors. If a screw hole is stripped, remove the screw, push a wooden toothpick with wood glue into the hole, let it dry, then re-drive the screw. For persistent rubbing, lightly sand or plane the contact area.",
      },
    ],
    whenToCallPro: "A squeaky door almost never needs a professional. However, if the door frame is visibly out of square, if the door won't latch because it's shifted significantly, or if there are cracks in the wall near the door frame, that could indicate foundation settling — which does need professional assessment.",
    relatedRepairs: ["patch-drywall-hole", "fix-sticking-door", "paint-room"],
  },
  {
    slug: "replace-shower-head",
    title: "How to Replace a Shower Head",
    metaDescription: "Replace a shower head in 10 minutes with no tools. Upgrade to rain, handheld, or high-pressure. The easiest bathroom upgrade you can do.",
    heroEmoji: "🚿",
    difficulty: "Easy",
    activeTime: 10,
    totalTime: 10,
    estimatedCost: "$15-80",
    safetyLevel: "DIY-friendly",
    overview: "Replacing a shower head is probably the single easiest home improvement project that exists. No tools required (usually), no water shut-off needed, and it takes 10 minutes. It's literally unscrew the old one, screw on the new one.\n\nA new shower head can dramatically improve your shower experience — better pressure, rainfall patterns, handheld flexibility, or water-saving eco modes. It's also a great upgrade for renters since you can swap back the original when you move out.\n\nThe only tricky part is if the old shower head is stuck from years of mineral buildup. We'll cover that too.",
    toolsNeeded: ["Adjustable wrench or pliers (if stuck)", "Rag or towel (to protect finish)"],
    materialsNeeded: [
      { name: "New shower head", estimatedCost: "$15-80", amazonSearch: "shower+head+high+pressure+rain" },
      { name: "Teflon tape (plumber's tape)", estimatedCost: "$3", amazonSearch: "teflon+tape+plumbing" },
    ],
    steps: [
      {
        title: "Remove the old shower head",
        description: "Grip the shower head connector (the nut where it meets the shower arm coming out of the wall) and turn counter-clockwise. Most unscrew by hand. If it's stuck, wrap a rag around the connector to protect the finish, then use an adjustable wrench. Hold the shower arm steady with your other hand so you don't twist the pipe inside the wall.",
      },
      {
        title: "Clean the threads and apply Teflon tape",
        description: "Clean any old Teflon tape or mineral deposits from the shower arm threads. Wrap new Teflon tape clockwise around the threads (3-4 wraps). Clockwise is important — wrapping the wrong direction will cause it to unwind when you screw on the new head. The tape prevents leaks and makes future removal easier.",
      },
      {
        title: "Install the new shower head",
        description: "Screw the new shower head onto the arm by hand, turning clockwise. Tighten until snug — hand-tight plus 1/4 turn with a wrench is plenty. Do NOT over-tighten or you risk cracking the plastic connector. Turn on the water and check for leaks at the connection point. If it drips, tighten slightly more or add another wrap of Teflon tape.",
      },
    ],
    whenToCallPro: "You'd only need a plumber if the shower arm itself is leaking inside the wall, if the arm breaks off during removal (rare but possible with very old plumbing), or if you want to move the shower head location (requires opening the wall).",
    relatedRepairs: ["fix-leaky-faucet", "recaulk-bathtub", "unclog-drain"],
  },
  {
    slug: "recaulk-bathtub",
    title: "How to Recaulk a Bathtub",
    metaDescription: "Remove old caulk and apply a perfect bead around your bathtub. Prevents water damage and mold. Professional results with this step-by-step guide.",
    heroEmoji: "🛁",
    difficulty: "Easy",
    activeTime: 45,
    totalTime: 1440,
    estimatedCost: "$8-15",
    safetyLevel: "DIY-friendly",
    overview: "Caulk is the waterproof seal between your bathtub and the wall. Over time it cracks, peels, turns black with mold, or separates from the surfaces. When this happens, water can seep behind the wall, causing hidden damage that's expensive to fix.\n\nRecaulking is cheap, straightforward, and prevents thousands of dollars in water damage. The key to a professional-looking result is 90% prep work — removing all the old caulk and cleaning the surfaces thoroughly before applying new caulk.\n\nThe active work takes about 45 minutes, but you'll need to let the new caulk cure for 24 hours before using the shower.",
    toolsNeeded: ["Caulk gun", "Utility knife", "Putty knife or 5-in-1 tool", "Rubbing alcohol", "Paper towels", "Painter's tape (optional but recommended)", "Spray bottle"],
    materialsNeeded: [
      { name: "Kitchen & bath silicone caulk (white or clear)", estimatedCost: "$5-8", amazonSearch: "silicone+caulk+kitchen+bath+white" },
      { name: "Caulk remover gel (optional)", estimatedCost: "$5-8", amazonSearch: "caulk+remover+gel" },
      { name: "Caulk gun", estimatedCost: "$5-10", amazonSearch: "caulk+gun+drip+free" },
    ],
    steps: [
      {
        title: "Remove all old caulk",
        description: "This is the most important step. Use a utility knife to cut along both edges of the old caulk bead. Pull out as much as you can by hand. Use a putty knife to scrape remaining caulk from both the tub and wall surfaces. For stubborn caulk, apply caulk remover gel, wait 2-3 hours, then scrape. Every bit of old caulk must be removed — new caulk won't adhere to old caulk.",
      },
      {
        title: "Clean and dry the surfaces",
        description: "Wipe all surfaces with rubbing alcohol to remove soap scum, oils, and residue. Let it dry completely — moisture prevents caulk from adhering. This is where most people fail. If the surface is even slightly damp or has soap residue, the new caulk will peel within months. Wait at least 30 minutes after cleaning.",
      },
      {
        title: "Apply painter's tape guides (recommended)",
        description: "Apply painter's tape along the tub edge and wall, leaving a 1/4 inch gap where the caulk will go. This creates perfectly straight lines and makes cleanup much easier. Press the tape firmly so caulk doesn't bleed underneath. This step is optional but makes the difference between an amateur and professional result.",
      },
      {
        title: "Apply the caulk bead",
        description: "Cut the caulk tube tip at a 45-degree angle, making a small opening (1/4 inch or less — you can always cut more). Load the tube in the caulk gun. Starting at one end, apply steady pressure while moving at a consistent speed along the joint. One continuous bead is better than stopping and starting. Don't go too fast (thin bead) or too slow (thick bead).",
      },
      {
        title: "Smooth the bead and remove tape",
        description: "Dip your finger in a cup of water (or spray water from a spray bottle onto the bead). Run your wet finger along the entire caulk bead in one smooth motion to create a concave, professional finish. Wipe excess caulk from your finger with a paper towel. Remove the painter's tape immediately while the caulk is still wet — pulling at a 45-degree angle away from the bead. Let cure 24 hours before using the shower.",
      },
    ],
    whenToCallPro: "Call a professional if you see mold or rot behind the old caulk (indicates water damage that needs repair before recaulking), if tiles are loose or cracked (water may already be behind the wall), or if the gap between tub and wall is wider than 1/2 inch (may need backer rod or a different repair approach).",
    relatedRepairs: ["replace-shower-head", "unclog-drain", "paint-room"],
  },
  {
    slug: "fix-garbage-disposal",
    title: "How to Fix a Garbage Disposal",
    metaDescription: "Fix a jammed, humming, or non-working garbage disposal in minutes. Reset button, Allen wrench trick, and when it's time to replace. No plumber needed.",
    heroEmoji: "⚙️",
    difficulty: "Easy",
    activeTime: 10,
    totalTime: 15,
    estimatedCost: "$0-10",
    safetyLevel: "DIY-friendly",
    overview: "A garbage disposal that hums but doesn't spin, won't turn on at all, or leaks is almost always fixable in 10 minutes with tools you already have. The two most common issues are a jammed flywheel (something stuck inside) and a tripped reset button.\n\nEvery garbage disposal has a reset button on the bottom and an Allen wrench socket that lets you manually free a jam. These are your two magic fixes that solve 90% of disposal problems.\n\nImportant: NEVER put your hand inside a garbage disposal, even when it's off. Use tongs or pliers to remove objects.",
    toolsNeeded: ["1/4 inch Allen wrench (often included with the disposal)", "Flashlight", "Tongs or pliers", "Broom handle (for manual spinning from above)"],
    materialsNeeded: [
      { name: "1/4 inch Allen wrench (if missing)", estimatedCost: "$3-5", amazonSearch: "allen+wrench+1+4+inch" },
      { name: "Garbage disposal wrench (optional)", estimatedCost: "$5-8", amazonSearch: "garbage+disposal+wrench" },
    ],
    steps: [
      {
        title: "Make sure it's off and check the reset button",
        description: "Turn the disposal switch OFF. Check the bottom of the disposal unit (under the sink) for a small red or black reset button. If it's popped out, press it firmly back in. This is a built-in circuit breaker that trips when the motor overheats or overloads. Try the switch again. This alone fixes the problem about 30% of the time.",
        safetyWarning: "NEVER put your hand inside the disposal. Always ensure the power switch is OFF before working on it.",
      },
      {
        title: "Free the jam with an Allen wrench",
        description: "Find the Allen wrench socket on the bottom center of the disposal. Insert a 1/4 inch Allen wrench and rotate it back and forth. You're manually turning the flywheel to free whatever is stuck. You should feel the obstruction break free as it gets easier to turn. Rotate it a full revolution in both directions to confirm it's clear.",
      },
      {
        title: "Remove the stuck object",
        description: "Use a flashlight to look inside the disposal from above. Use tongs or pliers (NEVER your hand) to remove any visible objects — common culprits are bones, fruit pits, glass, utensil pieces, or fibrous foods like celery. Also check for objects wedged between the flywheel and the grind ring around the edges.",
      },
      {
        title: "Test and run",
        description: "Press the reset button again (it may have tripped during your troubleshooting). Turn on cold water and then flip the disposal switch. It should spin freely and sound normal. Run cold water for 30 seconds while it operates to flush any debris. If it still hums but doesn't spin, or doesn't turn on at all, the motor may be burned out and the unit needs replacement.",
      },
    ],
    whenToCallPro: "Call a plumber if the disposal is leaking from the bottom (internal seal failure — replacement needed), if it's hardwired (not plugged in) and the electrical connection needs work, if you need a full replacement and aren't comfortable with the plumbing connections, or if there's a persistent foul odor that doesn't go away with cleaning.",
    relatedRepairs: ["unclog-drain", "fix-leaky-faucet", "fix-garbage-disposal-humming"],
  },
  {
    slug: "install-smart-thermostat",
    title: "How to Install a Smart Thermostat",
    metaDescription: "Install a smart thermostat and save 10-15% on energy bills. Covers Nest, Ecobee, and Honeywell. 30-minute install with step-by-step wiring guide.",
    heroEmoji: "🌡️",
    difficulty: "Medium",
    activeTime: 30,
    totalTime: 45,
    estimatedCost: "$80-250",
    safetyLevel: "Advanced repair",
    overview: "A smart thermostat is one of the best ROI home upgrades available — it typically saves 10-15% on heating and cooling bills, which means it pays for itself within a year. It also adds convenience with phone control, scheduling, and learning your preferences.\n\nInstallation is straightforward if your current thermostat has standard wiring. The most important step is labeling your existing wires before disconnecting them. Every wire has a letter designation (R, W, Y, G, C) that tells you exactly where it connects on the new thermostat.\n\nThis guide works for Nest, Ecobee, Honeywell, and most other smart thermostats. The wiring is universal — only the mounting hardware differs by brand.",
    toolsNeeded: ["Screwdriver (Phillips and flathead)", "Drill with bits (for new mounting holes)", "Level", "Pen and painter's tape (for labeling wires)", "Voltage tester"],
    materialsNeeded: [
      { name: "Smart thermostat", estimatedCost: "$80-250", amazonSearch: "smart+thermostat+programmable+wifi" },
      { name: "C-wire adapter (if needed)", estimatedCost: "$15-25", amazonSearch: "thermostat+c+wire+adapter" },
    ],
    steps: [
      {
        title: "Turn off HVAC system at the breaker",
        description: "Turn off the breaker for your heating AND cooling system. This is critical — thermostat wires carry 24V which won't hurt you, but crossing wires while the system is powered can blow the HVAC control board fuse, which is an expensive fix. Verify power is off by checking that your current thermostat display goes dark.",
        safetyWarning: "Turn off HVAC breaker before disconnecting any thermostat wires. Crossing live wires can damage your HVAC system.",
      },
      {
        title: "Remove old thermostat and label wires",
        description: "Pull the faceplate off the old thermostat. Before disconnecting ANYTHING, take a clear photo of the wiring. Then use the labels included with your smart thermostat (or painter's tape) to label each wire with the terminal letter it's connected to (R, W, Y, G, C, etc.). Disconnect the wires one at a time, labeling each immediately. Remove the old mounting plate.",
      },
      {
        title: "Check compatibility and C-wire",
        description: "Most smart thermostats need a C-wire (common wire) for power. Count your wires — if you have 5 or more, you almost certainly have a C-wire. If you only have 4 wires (R, W, Y, G), you may need a C-wire adapter (included with Ecobee, sold separately for Nest). Check your smart thermostat's compatibility checker on their website or app before mounting.",
      },
      {
        title: "Install the new mounting plate",
        description: "Hold the new thermostat base plate against the wall and use a level to ensure it's straight. Mark the screw holes with a pencil. Drill pilot holes and insert the wall anchors if not mounting into a stud. Thread the labeled wires through the plate opening and screw the plate to the wall. Make sure no wires are pinched.",
      },
      {
        title: "Connect wires to new thermostat",
        description: "Following your labels, connect each wire to the matching terminal on the new thermostat. Most smart thermostats have push-in connectors — just strip 1/4 inch of wire and press it into the correct labeled port. R goes to R (or Rh), W goes to W1, Y goes to Y1, G goes to G, C goes to C. Double-check every connection matches your photo from Step 2.",
      },
      {
        title: "Mount, power on, and configure",
        description: "Snap the thermostat display onto the mounting plate. Turn the HVAC breaker back on. The thermostat should power up and walk you through setup — connecting to WiFi, setting your schedule, and configuring your system type (heat only, cool only, heat pump, etc.). Download the manufacturer's app and link your thermostat. Test both heating and cooling modes to verify everything works correctly.",
      },
    ],
    whenToCallPro: "Call an HVAC technician if you have a heat pump system with complex wiring (O/B wires), if you find only 2 wires (older systems may need new wiring run), if your system uses high-voltage (120V/240V) line voltage thermostats (baseboard heaters), or if the new thermostat powers on but the system doesn't respond to commands.",
    relatedRepairs: ["replace-light-switch", "fix-water-heater-no-hot-water", "fix-doorbell"],
  },
  {
    slug: "fix-doorbell",
    title: "How to Fix a Doorbell",
    metaDescription: "Fix a doorbell that doesn't ring. Covers wired doorbells, wireless, and smart doorbell troubleshooting. Simple fixes that take 15 minutes.",
    heroEmoji: "🔔",
    difficulty: "Easy",
    activeTime: 15,
    totalTime: 20,
    estimatedCost: "$5-30",
    safetyLevel: "DIY-friendly",
    overview: "A doorbell that doesn't ring is usually one of three things: a dead button, a blown transformer, or a loose wire connection. The good news is doorbell circuits run on very low voltage (16-24V), so there's virtually no shock risk.\n\nThe doorbell system has three parts: the button at the door, the transformer (usually in the attic, basement, or near the electrical panel), and the chime unit (the box inside your home that makes the sound). Troubleshooting means checking each one.\n\nThis is one of the quickest fixes — most doorbells are repaired in 15 minutes once you identify which component failed.",
    toolsNeeded: ["Screwdriver", "Multimeter or voltage tester (helpful but not required)", "Small wire brush or sandpaper"],
    materialsNeeded: [
      { name: "Doorbell button (if replacing)", estimatedCost: "$5-15", amazonSearch: "doorbell+button+wired+replacement" },
      { name: "Doorbell transformer (if replacing)", estimatedCost: "$10-20", amazonSearch: "doorbell+transformer+16v" },
    ],
    steps: [
      {
        title: "Test the button",
        description: "Remove the doorbell button from the wall (usually 2 small screws). You'll see two low-voltage wires connected to the back. Carefully touch the two wires together (this is safe — it's only 16-24V). If the doorbell chimes, the button is dead and just needs replacing. If it doesn't chime, the problem is elsewhere in the circuit.",
      },
      {
        title: "Check the chime unit",
        description: "Open the chime unit cover inside your home. Look for loose or disconnected wires. Check that the plungers (small metal rods that strike the tone bars) move freely and aren't stuck. Clean any visible corrosion on wire connections with sandpaper. If the chime uses batteries (wireless systems), replace them.",
      },
      {
        title: "Check the transformer",
        description: "The transformer is a small box typically mounted on or near the electrical panel, or in the attic/basement. It converts 120V house current to 16-24V for the doorbell. If you have a multimeter, test the output terminals — you should read 16-24V AC. If you get no reading, the transformer has failed and needs replacing. Transformer replacement requires turning off the breaker since one side is connected to house voltage.",
        safetyWarning: "The input side of a doorbell transformer is 120V. Turn off the breaker before replacing the transformer.",
      },
      {
        title: "Replace the faulty component",
        description: "For a button: disconnect the two wires from the old button, connect them to the new button (either terminal — polarity doesn't matter for doorbells), and screw it to the wall. For a transformer: turn off the breaker, disconnect the old transformer, connect the new one matching wire-for-wire, restore power. For either fix, test by pressing the button.",
      },
    ],
    whenToCallPro: "Call an electrician if the transformer is hard to access, if you see burned or melted wires anywhere in the system, if you want to upgrade from a wired doorbell to a smart doorbell (Ring, Nest) and the existing wiring is inadequate, or if the electrical panel area where the transformer is mounted looks unsafe.",
    relatedRepairs: ["replace-light-switch", "install-smart-thermostat", "install-ceiling-fan"],
  },
  {
    slug: "paint-room",
    title: "How to Paint a Room",
    metaDescription: "Paint a room like a pro. Prep, prime, cut in, and roll for a flawless finish. Complete guide covering walls, trim, and ceilings. Save $500+ in painter fees.",
    heroEmoji: "🎨",
    difficulty: "Easy",
    activeTime: 180,
    totalTime: 480,
    estimatedCost: "$50-150",
    safetyLevel: "DIY-friendly",
    overview: "Painting a room is the single biggest visual impact you can make for the least money. A fresh coat of paint transforms a space, and doing it yourself saves $500+ compared to hiring a painter for an average room.\n\nThe secret to a professional paint job isn't talent — it's prep work. Properly taping edges, priming patches, and using the right roller nap makes the difference between \"I can see where they painted\" and \"was this room always this color?\"\n\nBudget about 3 hours of active work for an average 12x12 room, plus drying time between coats. Plan for two coats of paint minimum — one coat never looks good, no matter what the paint can says.",
    toolsNeeded: ["Paint roller frame (9-inch)", "Roller covers (3/8\" nap for smooth walls, 1/2\" for textured)", "2.5\" angled brush (for cutting in)", "Paint tray", "Painter's tape (1.5\")", "Drop cloths", "5-in-1 tool or putty knife", "Sanding sponge", "Extension pole for roller"],
    materialsNeeded: [
      { name: "Interior paint (1 gallon covers ~350 sq ft)", estimatedCost: "$30-60", amazonSearch: "interior+wall+paint+gallon" },
      { name: "Primer (if needed for patches or color change)", estimatedCost: "$15-25", amazonSearch: "interior+primer+wall" },
      { name: "Painter's tape (2 rolls)", estimatedCost: "$8-12", amazonSearch: "painters+tape+1.5+inch+frog+tape" },
      { name: "Drop cloths", estimatedCost: "$10-15", amazonSearch: "drop+cloth+canvas+painters" },
      { name: "Paint roller kit (frame + covers + tray)", estimatedCost: "$15-25", amazonSearch: "paint+roller+kit+9+inch+tray" },
    ],
    steps: [
      {
        title: "Prepare the room",
        description: "Move furniture to the center of the room and cover with drop cloths. Remove outlet covers and light switch plates (put screws back in the plates so you don't lose them). Fill any nail holes or dents with lightweight spackle, let dry, and sand smooth. Lay drop cloths along all walls. Clean walls with a damp cloth to remove dust and cobwebs — paint doesn't adhere well to dirty surfaces.",
      },
      {
        title: "Apply painter's tape",
        description: "Tape along ceiling edges, baseboards, door frames, window frames, and any areas you don't want painted. Press the tape edge firmly with a putty knife or credit card to prevent paint bleed. Use long strips for straight lines rather than short overlapping pieces. For the ceiling line, some pros skip tape and 'cut in' freehand — but tape gives beginners much cleaner results.",
      },
      {
        title: "Prime (if needed)",
        description: "Apply primer to any patched areas, new drywall, or if you're making a dramatic color change (dark to light). Primer ensures even paint absorption and true color. Spot-priming patches is usually sufficient — you don't need to prime the entire room unless the walls are new, stained, or you're going from a very dark to very light color.",
      },
      {
        title: "Cut in the edges",
        description: "Using your 2.5-inch angled brush, paint a 2-3 inch band along all edges — where walls meet the ceiling, along baseboards, around windows and doors, and around outlets. This is called 'cutting in' and it's where your brush goes where a roller can't. Work in 3-4 foot sections. Don't let the cut-in dry before rolling the main wall area — you want a wet edge to blend.",
      },
      {
        title: "Roll the walls",
        description: "Load your roller by rolling it in the paint tray until evenly coated (not dripping). Start with a 'W' pattern on the wall, about 3 feet wide, then fill in with even vertical strokes. Work from top to bottom, maintaining a wet edge. Reload the roller frequently — a common mistake is trying to stretch paint too thin. Don't press too hard — let the roller do the work. Overlap each section slightly.",
      },
      {
        title: "Apply second coat and finish",
        description: "Wait 2-4 hours for the first coat to dry (check the paint can for specific dry time). Apply the second coat using the same technique — cut in edges, then roll walls. The second coat should go on faster and smoother. Remove painter's tape while the final coat is still slightly tacky (not fully dry) — this gives the cleanest edge. Pull tape at a 45-degree angle away from the painted surface. Replace outlet covers and rearrange furniture after paint is fully dry (24 hours).",
      },
    ],
    whenToCallPro: "Consider hiring a painter for rooms with very high ceilings (requires scaffolding), extensive wallpaper removal, lead paint concerns (pre-1978 homes), or if you need more than 3-4 rooms done and value your time. Also hire a pro for exterior painting which involves ladders, weather considerations, and different preparation.",
    relatedRepairs: ["patch-drywall-hole", "fix-squeaky-door", "recaulk-bathtub"],
  },
  {
    slug: "replace-toilet-flapper",
    title: "How to Replace a Toilet Flapper",
    metaDescription: "Replace a toilet flapper in 5 minutes and stop your toilet from running. Costs under $8. The easiest plumbing fix any homeowner can do.",
    heroEmoji: "🔄",
    difficulty: "Easy",
    activeTime: 5,
    totalTime: 10,
    estimatedCost: "$5-8",
    safetyLevel: "DIY-friendly",
    overview: "The toilet flapper is the rubber seal at the bottom of the tank that lifts when you flush and seals the water in between flushes. It's the #1 cause of running toilets and the easiest plumbing fix in existence.\n\nFlappers degrade over time — they warp, crack, or get mineral buildup that prevents a proper seal. When this happens, water constantly leaks from the tank into the bowl, causing the fill valve to run periodically.\n\nReplacement takes 5 minutes, costs under $8, requires zero tools, and saves you $50-100 in wasted water per month. There is literally no reason to call a plumber for this.",
    toolsNeeded: ["None required"],
    materialsNeeded: [
      { name: "Universal toilet flapper", estimatedCost: "$5-8", amazonSearch: "universal+toilet+flapper+2+inch" },
    ],
    steps: [
      {
        title: "Turn off water and flush",
        description: "Turn the shut-off valve behind the toilet clockwise to stop water flow. Flush the toilet to empty the tank. You don't need to get every last drop out — just most of it.",
      },
      {
        title: "Remove the old flapper",
        description: "The flapper hooks onto two pegs (ears) on the sides of the overflow tube. Simply unhook it from both sides. Disconnect the chain from the flush lever. The whole thing comes out in 5 seconds. If your flapper has a ring that slides over the overflow tube instead of ears, you'll need to remove the tube (more involved but still doable).",
      },
      {
        title: "Install the new flapper",
        description: "Hook the new flapper onto the same two pegs on the overflow tube. Connect the chain to the flush lever, adjusting so there's about 1/2 inch of slack in the chain when the flapper is closed. Too much slack = weak flush. Too little = flapper can't seal. Turn the water back on, let the tank fill, and flush a few times to test.",
      },
    ],
    whenToCallPro: "You almost never need a plumber for a flapper. However, if the flush valve seat (the ring the flapper seals against) is pitted, corroded, or cracked, the new flapper won't seal properly. In that case, the entire flush valve needs replacing, which is a bigger job.",
    relatedRepairs: ["fix-running-toilet", "unclog-drain", "fix-leaky-faucet"],
  },
  {
    slug: "fix-garbage-disposal-humming",
    title: "How to Fix a Garbage Disposal That Hums but Won't Spin",
    metaDescription: "Fix a garbage disposal that hums but won't turn. Step-by-step guide to unjam the impellers, reset the motor, and get your disposal running in under 15 minutes.",
    heroEmoji: "🗑️",
    difficulty: "Easy",
    activeTime: 15,
    totalTime: 20,
    estimatedCost: "$0-15",
    safetyLevel: "DIY-friendly",
    overview: "When your garbage disposal hums but won't spin, the motor is getting power but the grinding plate is jammed — usually by a hard object like a bone fragment, bottle cap, or piece of silverware that's lodged between the impeller and the grinding ring.\n\nThe humming sound means the motor windings are energized but stalled. If left in this state for more than a few seconds, the thermal overload protector trips and shuts the unit off completely (that's why your disposal sometimes goes completely silent after humming). This is a safety feature, not a failure.\n\nThe fix is almost always free: unjam the plate mechanically, reset the overload, and you're done. You'll only need a replacement if the motor itself is burned out — which is rare and usually accompanied by a burning smell.",
    toolsNeeded: [
      "1/4-inch hex (Allen) wrench",
      "Wooden spoon or broom handle",
      "Flashlight",
      "Tongs or needle-nose pliers",
    ],
    materialsNeeded: [
      { name: "Garbage disposal wrench (1/4\" hex key)", estimatedCost: "$3-6", amazonSearch: "garbage+disposal+hex+wrench+1%2F4" },
      { name: "Garbage disposal cleaner tablets (optional)", estimatedCost: "$8-12", amazonSearch: "garbage+disposal+cleaner+tablets" },
      { name: "Replacement garbage disposal (if motor is burned out)", estimatedCost: "$80-200", amazonSearch: "garbage+disposal+replacement+1%2F2+hp" },
    ],
    steps: [
      {
        title: "Turn off the disposal — do NOT put your hand in",
        description: "Switch off the disposal at the wall switch. Then go under the sink and unplug the unit from the outlet (or flip the dedicated circuit breaker if it's hardwired). Never reach into a disposal with power connected, even if it seems off — switches can be toggled accidentally.",
        safetyWarning: "NEVER put your hand into the disposal. Even with power off, the impeller blades are sharp enough to cause serious cuts.",
      },
      {
        title: "Look for and remove the obstruction",
        description: "Shine a flashlight into the drain opening. Look for any visible object — bones, silverware, a twist-off cap, fruit pit, or glass. Use tongs or needle-nose pliers to pull it out. Never use your fingers. If you can see something but can't grab it, proceed to the next step to free the plate first, then retrieve it.",
      },
      {
        title: "Use the hex wrench to manually unjam the impeller",
        description: "Most disposals have a 1/4-inch hex socket on the bottom center of the unit, accessible from under the sink. Insert the hex wrench and work it back and forth — clockwise and counterclockwise — until the jam breaks loose and the plate spins freely. You'll feel resistance then release. If you don't have a hex wrench, many disposals come with one attached to the unit with a clip.",
      },
      {
        title: "Try the wooden spoon method (if no hex socket)",
        description: "If your disposal doesn't have a hex socket on the bottom, insert a wooden spoon handle or broom handle into the drain from the top. Hook it against one of the impeller blades and lever it back and forth to break the jam. Apply firm pressure — jams are usually broken with a solid push rather than gentle wiggling.",
      },
      {
        title: "Wait 10 minutes, then press the reset button",
        description: "Once the impeller moves freely, wait at least 10 minutes for the thermal overload protector to cool down and reset. Look on the bottom of the disposal unit for a small red or black button — this is the reset button. Press it firmly until you feel a click. If it immediately pops back out, the motor is still too hot — wait longer and try again.",
      },
      {
        title: "Restore power and test",
        description: "Plug the disposal back in (or flip the breaker). Turn on cold water — always run cold water when operating the disposal. Turn on the switch. It should start immediately and run quietly. Run cold water for 30 seconds after use to flush the drain line. If it hums again immediately, there's still a jam — repeat the hex wrench step.",
      },
      {
        title: "Clean out any remaining debris",
        description: "With the disposal running and cold water flowing, drop a few ice cubes in to knock loose any residue on the grinding ring. Follow with a cut lemon half for odor control. For a deeper clean, use disposal cleaning tablets monthly to prevent buildup that contributes to jams.",
      },
    ],
    whenToCallPro: "Call a plumber or appliance technician if you smell burning after the disposal runs (indicates motor damage), if the reset button won't stay in or trips immediately after resetting, if the unit leaks from the bottom (seal failure), or if the disposal is more than 10 years old and has had multiple jam issues — at that point, replacement is usually more cost-effective than repair.",
    relatedRepairs: ["unclog-drain", "fix-leaky-faucet", "fix-dripping-kitchen-faucet"],
  },
  {
    slug: "stop-toilet-running-after-flush",
    title: "How to Stop a Toilet from Running After Flushing",
    metaDescription: "Stop a toilet that keeps running after you flush. Fix the flapper, fill valve, or float in 20 minutes with no plumber. Includes diagnosis guide for each cause.",
    heroEmoji: "🚿",
    difficulty: "Easy",
    activeTime: 20,
    totalTime: 30,
    estimatedCost: "$5-20",
    safetyLevel: "DIY-friendly",
    overview: "A toilet that keeps running for more than a minute after you flush has a specific problem: the tank isn't filling and sealing properly before the fill valve shuts off. This is different from a constantly running toilet — here, the toilet flushes normally but then water continues trickling or running for several minutes (or indefinitely) before stopping.\n\nThe three most common causes are: (1) the flapper closes too slowly or doesn't seal fully after flushing, (2) the chain connecting the flush handle to the flapper is too long and getting caught under the flapper, or (3) the fill valve is slow or partially malfunctioning and takes too long to refill the tank.\n\nDiagnosing which cause you have takes about 60 seconds, and the fix usually costs under $10. This guide walks you through each scenario.",
    toolsNeeded: [
      "Adjustable wrench",
      "Towel or sponge",
      "Bucket",
    ],
    materialsNeeded: [
      { name: "Universal toilet flapper", estimatedCost: "$5-8", amazonSearch: "universal+toilet+flapper" },
      { name: "Toilet fill valve (universal)", estimatedCost: "$10-18", amazonSearch: "toilet+fill+valve+fluidmaster" },
      { name: "Complete toilet repair kit", estimatedCost: "$15-25", amazonSearch: "toilet+repair+kit+flapper+fill+valve" },
    ],
    steps: [
      {
        title: "Time how long the toilet runs after flushing",
        description: "Flush the toilet and watch what happens. If it stops within 90 seconds, your fill valve is just slow — possibly normal for older valves but a sign it's wearing out. If it runs for 3+ minutes or indefinitely, you have a sealing or overflow problem. Note the sound: a hissing fill sound means the tank is filling; a trickling sound with no fill action means water is leaking past the flapper.",
      },
      {
        title: "Remove the tank lid and diagnose",
        description: "Remove the tank lid (set it somewhere safe — porcelain chips easily). Watch a full flush cycle. Check: Is the flapper dropping back into place quickly after flushing, or does it float up for a long time? Is the chain getting caught under the flapper? Is the water level rising all the way up to 1 inch below the overflow tube, or does it stop short? Is water running over the overflow tube into the bowl?",
      },
      {
        title: "Fix a chain that's too long (easiest fix)",
        description: "If the chain has too much slack, it can curl under the flapper and prevent it from sealing after the flush. The correct slack is about 1/2 inch — just enough that the flapper can close fully but the chain doesn't go slack and pool at the bottom. Shorten the chain by clipping it to a higher hole on the flush arm. Cut off excess chain length if needed.",
      },
      {
        title: "Replace a worn flapper",
        description: "Turn off the water supply valve behind the toilet (clockwise). Flush to drain the tank. Unhook the old flapper from the ears on the overflow tube and disconnect the chain. Take it to the hardware store to match the size, or buy a universal flapper. Hook the new flapper onto the overflow tube ears, attach the chain with 1/2 inch of slack. Turn water back on and test.",
      },
      {
        title: "Adjust the float if water is overfilling",
        description: "If water is running over the overflow tube into the bowl, lower the float. For a ball float on an arm, bend the arm slightly downward. For a cup float on the fill valve shaft, pinch the clip and slide it down 1 inch. The water level should settle at least 1 inch below the top of the overflow tube.",
      },
      {
        title: "Replace a slow or malfunctioning fill valve",
        description: "If the tank fills slowly (taking more than 3 minutes) and the running continues well after the tank is full, the fill valve's shut-off mechanism is worn. Turn off the water supply, flush, and sponge out remaining water. Disconnect the supply line, unscrew the fill valve locknut underneath the tank, and pull out the old valve. Install a new universal fill valve (adjust height to match), tighten the locknut, reconnect the supply line, and restore water.",
      },
      {
        title: "Do a final leak test",
        description: "After making repairs, add a few drops of food coloring to the tank. Wait 15 minutes without flushing. If color appears in the bowl, your flapper still isn't sealing fully — try a different brand or size. If no color appears, the repair is successful. Flush 3 times to confirm consistent, quick shutoff.",
      },
    ],
    whenToCallPro: "Call a plumber if the shut-off valve behind the toilet is stuck, leaking, or stripped (you need the valve repaired before you can do any tank work), if you see water on the floor around the toilet base (wax ring leak — different problem entirely), or if you've replaced both the flapper and fill valve and the toilet still runs (may indicate a cracked overflow tube or flush valve seat).",
    relatedRepairs: ["fix-running-toilet", "replace-toilet-flapper", "unclog-drain"],
  },
  {
    slug: "fix-dripping-kitchen-faucet",
    title: "How to Fix a Dripping Kitchen Faucet",
    metaDescription: "Fix a dripping kitchen faucet yourself. Step-by-step guide for ball, cartridge, and ceramic disc faucets. Stop the drip and save $100+ on a plumber call.",
    heroEmoji: "🚰",
    difficulty: "Medium",
    activeTime: 45,
    totalTime: 60,
    estimatedCost: "$10-35",
    safetyLevel: "DIY-friendly",
    overview: "A dripping kitchen faucet wastes up to 3,000 gallons of water per year and adds $20-35 to your annual water bill — for what's usually a $15 fix. Kitchen faucets drip for one reason: internal seals or components are worn and no longer hold back the water pressure when the handle is closed.\n\nKitchen faucets come in four main types: ball (a single handle that rotates over a rounded cap), cartridge (single or double handle with an internal cartridge), ceramic disc (single lever over a wide cylindrical body), and compression (older style with two handles that screw down). Each is fixed differently, but all follow the same basic approach: identify the faucet type, buy the right repair kit, replace the worn parts.\n\nThis guide focuses on the two most common kitchen faucet types — ball and cartridge — which cover about 80% of kitchen faucets in U.S. homes.",
    toolsNeeded: [
      "Adjustable wrench",
      "Phillips and flathead screwdrivers",
      "Hex (Allen) wrench set",
      "Needle-nose pliers",
      "Utility knife",
      "Plumber's grease",
      "Bucket or towels",
    ],
    materialsNeeded: [
      { name: "Ball faucet repair kit (if you have a ball faucet)", estimatedCost: "$12-20", amazonSearch: "ball+faucet+repair+kit+kitchen" },
      { name: "Cartridge replacement (if you have a cartridge faucet)", estimatedCost: "$10-25", amazonSearch: "kitchen+faucet+cartridge+replacement" },
      { name: "Plumber's grease", estimatedCost: "$5-8", amazonSearch: "plumber%27s+grease+silicone" },
      { name: "Teflon tape", estimatedCost: "$3-5", amazonSearch: "teflon+tape+plumber" },
    ],
    steps: [
      {
        title: "Identify your faucet type and locate the drip",
        description: "Single-handle faucets that rotate on a ball: ball type. Single-handle faucets with a cartridge you can see if you remove the handle: cartridge type. Double-handle faucets with rubber seats: compression type. Note whether the drip comes from the spout (internal seal issue) or the base/handle area (O-ring issue). The spout drip is the most common complaint.",
      },
      {
        title: "Turn off the water supply and drain the lines",
        description: "Look under the sink for two shut-off valves (hot and cold). Turn both clockwise until they stop. Turn the faucet handle(s) to the on position to release remaining pressure and drain the lines — water will flow briefly then stop. Place a towel or bucket under the sink to catch drips. Close the drain so small parts don't fall in.",
        safetyWarning: "Make sure both hot and cold supply valves are fully closed. Test by turning the faucet on — no water should flow.",
      },
      {
        title: "Remove the handle",
        description: "Look for a decorative cap on top of the handle — pop it off with a flathead screwdriver to reveal a screw. Remove the screw (usually Phillips or hex/Allen). Pull the handle straight up to remove it. Some handles have the screw at the back of the handle base; others are held by a set screw on the side. If the handle won't come off, don't force it — wiggle it gently while pulling up.",
      },
      {
        title: "For ball faucets: replace the ball, seats, and springs",
        description: "Unscrew the cap and collar by hand or with adjustable pliers (wrap with tape to protect the finish). Lift out the ball, noting its orientation. Inside you'll see two small rubber seats each held by a spring — remove them with needle-nose pliers. Install the new springs and seats from your repair kit. Insert the new ball, aligning the slot in the ball with the metal pin in the faucet body. Reassemble the collar and cap.",
      },
      {
        title: "For cartridge faucets: pull and replace the cartridge",
        description: "Once the handle is off, you'll see a cartridge held by a retaining clip or nut. Pull the clip straight up with pliers or unscrew the nut. Grasp the cartridge stem and pull straight up — it takes firm, even force. Note the cartridge's orientation (the ears should face forward). Take the old cartridge to the hardware store to match the brand and model, or note the faucet brand and look up the part number. Press the new cartridge straight down, aligning the ears. Reinstall the retaining clip or nut.",
      },
      {
        title: "Replace O-rings if leaking at the base",
        description: "If water was leaking around the base of the spout (not the tip), the O-rings on the faucet body are worn. With the ball or cartridge removed, you can slide the spout straight up off the faucet body. You'll see rubber O-rings — cut them off with a utility knife and roll on new ones of the same size. Coat the new O-rings with plumber's grease before sliding the spout back on.",
      },
      {
        title: "Reassemble and test",
        description: "Reassemble in reverse order — cartridge or ball, collar, cap, handle, decorative cap. Tighten everything snugly but don't overtighten (you can crack the faucet body). Slowly open both shut-off valves under the sink. Turn the faucet on and off a few times. Check for leaks at the base and under the sink at the supply connections. The drip should be gone.",
      },
    ],
    whenToCallPro: "Call a plumber if the faucet body itself is cracked or corroded, if the shut-off valves under the sink are frozen or leaking (they need repair first), if you've replaced the cartridge and it still drips (may need a different cartridge size or the valve seat is damaged), or if you're considering replacing the entire faucet — that's a straightforward plumbing job that many homeowners do themselves with our replacement guide.",
    relatedRepairs: ["replace-bathroom-faucet", "unclog-drain", "fix-leaky-faucet"],
  },
  {
    slug: "patch-large-hole-drywall",
    title: "How to Patch a Large Hole in Drywall",
    metaDescription: "Patch a large hole in drywall (6 inches or bigger) with a professional-looking repair. Step-by-step guide using a drywall patch kit or California patch method.",
    heroEmoji: "🪣",
    difficulty: "Medium",
    activeTime: 60,
    totalTime: 300,
    estimatedCost: "$25-60",
    safetyLevel: "DIY-friendly",
    overview: "Large holes in drywall — typically anything over 6 inches — can't be fixed with mesh tape and a little joint compound. You need a structural patch that bridges the gap and gives the joint compound something solid to bond to.\n\nThere are two reliable methods for large holes: the California patch (also called a butterfly patch), which uses the drywall itself as a backing and works well for holes up to about 8 inches, and the backer board method, which installs wood backing strips inside the wall that a new drywall piece screws into — this works for any size hole.\n\nBoth methods require multiple coats of joint compound with drying time between coats, which means this is a multi-day project. Budget 1 hour of active work spread over 2-3 days. The result, when done correctly, is invisible — the patch will blend seamlessly into the surrounding wall.",
    toolsNeeded: [
      "Drywall saw or utility knife",
      "Drywall screws and drill/driver",
      "6-inch and 10-inch drywall knives (taping knives)",
      "Sanding block or pole sander",
      "Mud pan",
      "Tape measure and pencil",
      "Safety glasses",
    ],
    materialsNeeded: [
      { name: "Drywall panel (1/2\" or 5/8\" to match existing)", estimatedCost: "$12-18", amazonSearch: "drywall+panel+1%2F2+inch" },
      { name: "1x3 or 1x4 wood boards for backing", estimatedCost: "$8-15", amazonSearch: "1x3+wood+board+furring+strip" },
      { name: "All-purpose joint compound (premixed)", estimatedCost: "$10-15", amazonSearch: "all+purpose+joint+compound+premixed" },
      { name: "Drywall mesh tape", estimatedCost: "$5-8", amazonSearch: "drywall+mesh+tape+fiberglass" },
      { name: "Drywall screws (1-5/8\")", estimatedCost: "$6-10", amazonSearch: "drywall+screws+1+5%2F8+inch" },
      { name: "Primer and matching wall paint", estimatedCost: "$10-20", amazonSearch: "drywall+primer+spray" },
    ],
    steps: [
      {
        title: "Cut the damaged area into a clean rectangle",
        description: "Use a drywall saw or utility knife to cut the ragged hole into a clean rectangle or square. This makes it much easier to fit the patch. Use a speed square or level to keep the cuts straight. Make the rectangle slightly larger than the damaged area so you're cutting into undamaged drywall. Before cutting, check the area with a stud finder — if your hole is near a stud, you can use it as a natural edge.",
        safetyWarning: "Before cutting, use a stud finder and check for electrical wires or plumbing behind the wall. Cut slowly and shallowly to avoid hitting anything inside the wall.",
      },
      {
        title: "Install wood backer boards inside the wall",
        description: "Cut two pieces of 1x3 or 1x4 lumber about 4-6 inches longer than the height of your hole. Slide each board into the hole vertically and position them behind the drywall edges on the left and right sides of the opening, overlapping each edge by about 1 inch. Hold each board tightly against the back of the drywall and drive two drywall screws through the existing drywall into the board. These boards are now your solid backing for the patch.",
      },
      {
        title: "Cut the drywall patch to fit",
        description: "Measure the opening precisely. Cut a piece of drywall to match — score the front face deeply with a utility knife, snap the board along the score, then cut the paper backing. Test the fit before applying any compound. It should drop in flush with the surrounding wall surface. If it's slightly high, sand the back or edges. If it's low, you'll build it up with extra compound coats.",
      },
      {
        title: "Screw the patch into the backer boards",
        description: "Hold the patch in the opening and drive drywall screws through the patch into the backer boards on each side, spacing screws about 6-8 inches apart. Drive screws just deep enough so the head dimples slightly below the surface — don't overdrive or you'll break through the paper face. The patch should be stable and not flex when pressed.",
      },
      {
        title: "Apply mesh tape and first coat of joint compound",
        description: "Apply fiberglass mesh tape over all four seams where the patch meets the existing wall. Mix your joint compound to a peanut butter consistency if it's too thick. Apply a thin first coat with a 6-inch knife, pressing compound firmly into the tape and feathering the edges outward 2-3 inches onto the surrounding wall. Also fill the screw dimples. Let dry completely — usually 24 hours. The compound will shrink as it dries and look lighter in color when ready.",
      },
      {
        title: "Apply second and third coats, feathering wider each time",
        description: "Sand the first coat lightly with 120-grit paper to knock down ridges (don't sand through the tape). Apply a second coat with a 10-inch knife, feathering 6-8 inches out from the seams. Let dry. Lightly sand again, then apply a thin finish coat feathered even wider — 10-12 inches. The goal is to create a transition so gradual that it's invisible under paint. Each coat should be thinner than the last.",
      },
      {
        title: "Sand, prime, and paint",
        description: "Once the final coat is completely dry, sand the entire patch area with 120-grit followed by 220-grit paper until the surface is smooth and the edges are imperceptible to touch. Wipe away all dust. Apply a coat of drywall primer — this is essential, because unpainted joint compound will absorb paint differently than the surrounding wall, creating a visible 'hot spot' even after painting. Let primer dry, then apply two coats of matching wall paint.",
      },
    ],
    whenToCallPro: "Call a drywall contractor if the hole is the result of water damage (fix the leak first, then address any mold before closing the wall), if the damage involves multiple studs or structural members, if the hole is larger than 12 inches (still DIY-able but requires more precise framing), or if you simply want a guaranteed invisible result for a high-visibility area like a formal living room or hallway.",
    relatedRepairs: ["patch-drywall-hole", "paint-room", "fix-squeaky-door"],
  },
  {
    slug: "fix-water-heater-no-hot-water",
    title: "How to Fix a Water Heater with No Hot Water",
    metaDescription: "Troubleshoot a water heater not producing hot water. Check the pilot light, thermostat, and heating element before calling a plumber. Save $200+ on a service call.",
    heroEmoji: "🔥",
    difficulty: "Medium",
    activeTime: 45,
    totalTime: 120,
    estimatedCost: "$0-80",
    safetyLevel: "Advanced repair",
    overview: "Waking up to no hot water is one of the most stressful home emergencies — especially in winter. Before you panic and call a plumber, know this: the majority of no-hot-water situations are caused by something simple that you can fix in under an hour for little or no money.\n\nThe fix depends on whether you have a gas or electric water heater. Gas heaters rely on a pilot light and thermocouple. Electric heaters rely on one or two heating elements and a thermostat. Both types have dedicated circuit breakers and reset buttons that trip during power surges or overheating — checking these first takes 60 seconds and solves the problem a surprising percentage of the time.\n\nThis guide walks you through a systematic diagnostic: start with the fastest, free checks and escalate only if needed. Most homeowners solve the problem at step 1 or 2. If you have a gas heater, safety around the gas supply is critical — follow all warnings. If you smell gas at any point, leave the house and call your gas company immediately.\n\nTypical water heaters last 8-12 years. If yours is older, a repair may only buy you a year or two — factor that into your decision about whether to repair or replace.",
    toolsNeeded: [
      "Multimeter (for electric water heaters)",
      "Flathead screwdriver",
      "Phillips screwdriver",
      "Adjustable wrench",
      "Heatproof gloves",
      "Flashlight",
    ],
    materialsNeeded: [
      { name: "Water heater heating element (electric heaters)", estimatedCost: "$15-35", amazonSearch: "water+heater+heating+element+replacement" },
      { name: "Thermocouple (gas heaters)", estimatedCost: "$10-20", amazonSearch: "water+heater+thermocouple+universal" },
      { name: "Anode rod (if doing preventive maintenance)", estimatedCost: "$20-40", amazonSearch: "water+heater+anode+rod+magnesium" },
      { name: "Element wrench (for electric element removal)", estimatedCost: "$8-12", amazonSearch: "water+heater+element+wrench" },
    ],
    steps: [
      {
        title: "Check the circuit breaker or gas supply (first, always)",
        description: "For electric heaters: go to your electrical panel and look for a breaker labeled 'water heater' or 'WH.' If it's tripped (sitting between on and off), turn it fully off then back on. Electric water heaters use 240V double-pole breakers — make sure both breakers are on. For gas heaters: check that the gas supply valve on the pipe leading to the heater is open (handle parallel to the pipe = open). Also verify other gas appliances work — if the stove doesn't light, you may have a gas service interruption. Call your utility company if no gas appliances work.",
        safetyWarning: "If you smell gas anywhere near the water heater, do NOT touch any switches. Leave the house immediately, leave the door open, and call your gas company from outside.",
      },
      {
        title: "Relight the pilot light (gas heaters only)",
        description: "Look at the bottom of the gas water heater for the burner access panel — remove it. Find the gas valve knob (marked Pilot/Off/Hot) and the pilot assembly. Turn the gas valve to 'Pilot.' Press and hold the pilot button (or knob) down to send gas to the pilot tube. While holding, use a long lighter or match to ignite the small pilot flame at the burner tip. Keep holding the button for 30-60 seconds to heat the thermocouple — this is critical, as the thermocouple is a safety device that only allows gas to flow when it senses the pilot flame. After 60 seconds, slowly release. The pilot should stay lit. Turn the valve to 'Hot' and set your temperature. If the pilot won't stay lit, the thermocouple is likely faulty and needs replacement.",
        safetyWarning: "Never use an open flame to check for gas leaks. If you smell gas strongly, do not attempt to relight — call your gas company.",
      },
      {
        title: "Press the high-temperature reset button (electric heaters)",
        description: "Electric water heaters have a red reset button on the upper thermostat, hidden behind an access panel on the side of the heater. Turn off the water heater's circuit breaker first. Remove the upper access panel (usually 2-4 screws) and carefully move aside the insulation to expose the thermostat. You'll see a red button — press it firmly until you feel or hear a click. Replace the insulation and panel, then turn the breaker back on. Wait 30-60 minutes for the water to heat. If the reset trips again shortly after, you have a failing element or thermostat that needs replacement.",
        safetyWarning: "ALWAYS turn off the circuit breaker before opening the access panel on an electric water heater. The 240V terminals inside are lethal.",
      },
      {
        title: "Test and replace the thermostat (electric heaters)",
        description: "Electric water heaters have two thermostats (upper and lower) that regulate element temperature. With the breaker OFF and the access panels open, use a multimeter set to continuity or resistance mode to test the thermostats. The upper thermostat typically has 4 terminals — test between the two outer terminals and then between each outer terminal and the center. A good thermostat shows continuity/low resistance. If the thermostat reads open circuit (infinite resistance) in positions it shouldn't, it's failed. Thermostats are inexpensive ($10-20) and snap out and in easily — note wire positions carefully before disconnecting.",
      },
      {
        title: "Test and replace a heating element (electric heaters)",
        description: "With the breaker OFF, drain 2-3 gallons from the heater via the drain valve at the bottom (attach a hose). Access the upper or lower element through the side panel. Disconnect the element wires and test the element with a multimeter set to resistance — a working element reads 10-16 ohms. Open circuit (infinite) means the element is burned out. To replace: use an element wrench to unscrew the old element counter-clockwise. Wrap the threads of the new element with Teflon tape, install it, and reconnect the wires matching the original configuration. Refill the tank completely before turning the breaker back on — running the element dry destroys it immediately.",
        safetyWarning: "Never energize a heating element when the tank is not full of water. Running an element dry will burn it out instantly.",
      },
      {
        title: "Replace the thermocouple (gas heaters)",
        description: "If the pilot won't stay lit after following step 2, the thermocouple is the likely cause. The thermocouple is a thin copper tube running from the gas valve to the pilot flame. Turn the gas valve off and let the unit cool 30 minutes. Unscrew the thermocouple from the gas valve (usually hand-tight) and from the bracket holding it at the pilot. Take it to a hardware store to match the length, or buy a universal thermocouple. Thread the new thermocouple back through the same bracket, screw the end into the gas valve finger-tight plus 1/4 turn, and position the tip in the pilot flame path. Relight the pilot per Step 2.",
      },
      {
        title: "Adjust the thermostat temperature and test",
        description: "Once the heater is running, the thermostat should be set to 120°F for most households — hot enough to kill bacteria but cool enough to prevent scalding. On gas heaters, turn the dial on the gas valve. On electric heaters, adjust the dial behind the access panel (always turn off the breaker first). Wait 1-2 hours for a full tank to heat, then run hot water at a fixture for 2-3 minutes. If you get hot water consistently, the repair is successful. If the water is lukewarm, the lower element on an electric heater may also be failing.",
      },
    ],
    whenToCallPro: "Call a licensed plumber or HVAC technician if you smell gas and can't identify the source, if the water heater is leaking from the tank body (not a fitting — tank leaks mean the unit needs replacement), if the temperature and pressure relief valve is leaking or discharging hot water (a safety device that should never be bypassed), if your heater is over 12 years old and repeatedly losing hot water (replacement is more cost-effective), or if you're uncomfortable working with gas connections or 240V electrical systems.",
    relatedRepairs: ["fix-running-toilet", "fix-leaky-faucet", "install-smart-thermostat"],
  },
  {
    slug: "fix-clogged-toilet",
    title: "How to Unclog a Toilet Without Calling a Plumber",
    metaDescription: "Unclog a toilet yourself using a plunger, dish soap, or toilet auger. Step-by-step guide to clear any clog fast. Save $150 on an emergency plumber call.",
    heroEmoji: "🚽",
    difficulty: "Easy",
    activeTime: 20,
    totalTime: 30,
    estimatedCost: "$0-30",
    safetyLevel: "DIY-friendly",
    overview: "A clogged toilet is one of the most urgent and anxiety-inducing home problems — especially if it's your only bathroom. The good news is that the vast majority of toilet clogs are located in the toilet trap (the curved section inside the toilet itself) and can be cleared in under 10 minutes with nothing more than a toilet plunger.\n\nMany people make two common mistakes: they use the wrong type of plunger (a flat cup plunger designed for sinks won't work on a toilet), and they give up too soon. A toilet clog typically requires 10-15 vigorous plunges with proper technique, not 3-4 halfhearted ones.\n\nIf plunging doesn't work, a toilet auger (also called a closet auger) is a specialized tool that reaches further into the drain and physically breaks up or retrieves the obstruction. It handles the clogs that plungers can't — including when a non-flushable item has been accidentally flushed.\n\nThis guide covers all three levels of clog-clearing: the dish soap trick, proper plunger technique, and using a toilet auger. Work through them in order. Most clogs are solved at the first or second method. We also cover when to stop DIYing — multiple simultaneous clogs or a toilet that backs up into the shower drain are signs of a main sewer line issue that requires a plumber.",
    toolsNeeded: [
      "Flange plunger (toilet plunger with an extended rubber flap)",
      "Toilet auger / closet auger",
      "Rubber gloves",
      "Old towels or newspaper (for floor protection)",
      "Bucket",
    ],
    materialsNeeded: [
      { name: "Flange plunger (toilet-specific)", estimatedCost: "$10-20", amazonSearch: "toilet+flange+plunger+heavy+duty" },
      { name: "Toilet auger / closet auger (3-6 ft)", estimatedCost: "$20-35", amazonSearch: "toilet+auger+closet+auger+6+foot" },
      { name: "Dish soap (for the soap method)", estimatedCost: "$3-5", amazonSearch: "dish+soap+dawn" },
      { name: "Rubber gloves (heavy duty)", estimatedCost: "$5-8", amazonSearch: "rubber+gloves+heavy+duty+household" },
    ],
    steps: [
      {
        title: "Stop the toilet from overflowing (immediate action)",
        description: "If the water in the bowl is rising and about to overflow, don't flush again — this will make it much worse. Open the tank lid and push the flapper down by hand to stop more water entering the bowl. If water is still rising fast, reach behind the toilet and turn the shut-off valve clockwise to cut water to the toilet entirely. Place old towels around the base of the toilet to absorb any overflow. Once the situation is stable, you can work the clog.",
      },
      {
        title: "Try the dish soap and hot water method (for mild clogs)",
        description: "This works well for clogs caused by waste buildup rather than a hard object. Pour about 1/4 cup of liquid dish soap directly into the toilet bowl — squirt it right into the drain opening. Let it sit for 5-10 minutes. The soap acts as a lubricant and may be enough to let the clog slide through. Follow by slowly pouring a bucket of hot (not boiling — boiling water can crack a porcelain toilet) water from waist height. The height and volume creates pressure. Wait 5 minutes and try flushing once. If it drains, you're done.",
      },
      {
        title: "Use a flange plunger with proper technique",
        description: "Use a flange plunger, not a flat-bottom cup plunger. The flange is the rubber extension that folds down and fits into the toilet drain opening, creating a real seal. Pull the flange out before using. Lower the plunger into the water at an angle to fill it with water, not air — air in the plunger significantly reduces suction. Position it over the drain opening and press down gently to seal it. Then plunge with firm, rhythmic strokes — push down hard and pull up hard. Do 10-15 strokes. The suction on the pull-up is just as important as the pressure on the push-down. After 10-15 strokes, pull the plunger up sharply. The clog should release.",
      },
      {
        title: "Repeat plunging if needed and test",
        description: "Stubborn clogs may need 2-3 rounds of plunging. If the water level drops after plunging but the toilet doesn't fully flush, you've broken through part of the clog — add a bucket of water to the bowl and plunge again. Once the water level drops normally and you can flush successfully, do one more test flush with toilet paper to confirm it's fully clear. Run water for 30 seconds to ensure good flow through the drain.",
      },
      {
        title: "Use a toilet auger for stubborn or solid clogs",
        description: "A toilet auger (closet auger) is specifically designed for toilet drains. It has a rubber sleeve to protect the porcelain bowl and a flexible cable that reaches 3-6 feet into the drain. Place the auger into the drain and turn the handle clockwise while pushing the cable forward. When you feel resistance, you've reached the clog. Keep turning — this either breaks up the clog or hooks a solid object (like a toy or phone). Pull the cable back slowly to retrieve whatever is caught. Remove the auger, flush, and test. Never use a regular drain snake in a toilet — it will scratch the porcelain.",
        safetyWarning: "Always retrieve the auger slowly to avoid splashing. Wear rubber gloves throughout this process.",
      },
      {
        title: "Prevent future clogs",
        description: "The leading causes of toilet clogs are: flushing items that shouldn't be flushed (wipes — even 'flushable' ones, feminine products, cotton balls, paper towels), using too much toilet paper at once, and slow drains from mineral buildup. Only toilet paper should go in the toilet. Keep a wastebasket in the bathroom for everything else. If your toilet clogs frequently, you may have a partial blockage further down the drain line or a weak flush — a plumber can diagnose this quickly.",
      },
    ],
    whenToCallPro: "Call a plumber if multiple fixtures (toilet, sink, tub) are clogged simultaneously — this indicates a main sewer line blockage that a homeowner can't clear. Also call if sewage backs up into the bathtub or shower drain when you flush, if the clog keeps returning within days, if you've tried a full toilet auger and still can't clear it, or if you can hear gurgling in other drains when you flush (main line issue).",
    relatedRepairs: ["fix-running-toilet", "unclog-drain", "replace-toilet-flapper"],
  },
  {
    slug: "fix-leaky-pipe-under-sink",
    title: "How to Fix a Leaky Pipe Under the Sink",
    metaDescription: "Fix a leaky pipe under the kitchen or bathroom sink yourself. Covers P-trap replacement, compression fittings, and slip joint repairs. Stop the leak without a plumber.",
    heroEmoji: "🪠",
    difficulty: "Medium",
    activeTime: 30,
    totalTime: 45,
    estimatedCost: "$5-40",
    safetyLevel: "DIY-friendly",
    overview: "A leak under the sink is easy to ignore at first — maybe you only notice when you open the cabinet to get something. But a slow drip is quietly rotting the cabinet floor, growing mold inside the enclosed space, and wasting water every day. Catching it early and fixing it yourself saves you from a much bigger headache later.\n\nThe pipes under a sink form what's called the drain assembly: the tailpiece (vertical pipe from the sink strainer), the P-trap (the curved section that holds water to block sewer gases), and the horizontal drain arm that connects to the wall pipe. Most leaks occur at the slip joint connections between these sections — the threaded plastic or metal slip nuts that hold them together.\n\nThe good news: under-sink drain plumbing is designed to be user-serviceable. It doesn't require soldering or special skills. The pipes are connected with hand-tightenable slip nuts, and replacement parts cost $5-15 at any hardware store. For supply line leaks (the smaller braided hoses that bring hot and cold water to the faucet), tightening the connection usually stops the leak — and if not, replacing a supply line takes 10 minutes and costs $8.\n\nThis guide covers all the common leak points: slip joint connections, the P-trap, and supply lines. Read it through, identify where your leak is coming from, and go straight to the relevant steps.",
    toolsNeeded: [
      "Slip-joint pliers or channel-lock pliers",
      "Adjustable wrench",
      "Bucket (to catch water when disconnecting pipes)",
      "Old towels",
      "Pipe thread tape (Teflon tape)",
      "Flashlight or headlamp",
    ],
    materialsNeeded: [
      { name: "P-trap replacement kit (1-1/4\" or 1-1/2\" depending on drain size)", estimatedCost: "$8-15", amazonSearch: "p+trap+replacement+kit+sink+drain" },
      { name: "Slip joint washers and nuts (repair pack)", estimatedCost: "$5-8", amazonSearch: "slip+joint+washers+drain+repair" },
      { name: "Braided stainless supply lines (hot and cold)", estimatedCost: "$8-15", amazonSearch: "braided+stainless+supply+lines+faucet" },
      { name: "Teflon tape", estimatedCost: "$3-5", amazonSearch: "teflon+tape+plumbing" },
      { name: "Plumber's putty (if strainer leaks)", estimatedCost: "$4-7", amazonSearch: "plumber%27s+putty" },
    ],
    steps: [
      {
        title: "Identify the exact source of the leak",
        description: "Clear out everything from under the sink so you have room to work. Dry all the pipes and the cabinet floor thoroughly with a towel. Place a dry piece of cardboard or paper towel under the pipes. Run water in the sink (hot and cold) for 30 seconds and watch carefully. Check: the slip nut connections where pipes join together, the curved P-trap section, the connection where the drain arm meets the wall, and the supply lines (braided hoses running from the wall valves up to the faucet). Mark or note exactly where you see dripping — this tells you precisely what to fix.",
      },
      {
        title: "Tighten loose slip joint connections (most common fix)",
        description: "Slip joints are the plastic or metal threaded nuts at each pipe connection. Many leaks are caused by nothing more than a slightly loose nut — the connection was installed hand-tight but vibration or thermal expansion has loosened it slightly. Try tightening each nut at the leak location by hand first, then 1/4 turn with slip-joint pliers. Don't over-tighten plastic fittings — they crack. Run water and recheck. If the leak stops, you're done. If it continues, the washer inside the fitting is worn and needs replacement.",
      },
      {
        title: "Replace worn slip joint washers",
        description: "Turn off the water supply valves under the sink. Place a bucket under the P-trap. Unscrew the slip nuts by hand at both ends of the P-trap — the curved section should come free and water will drain into your bucket. Look inside each slip nut: there's a tapered rubber or plastic washer inside. If it's flattened, cracked, or has grooves worn into it, it's not sealing properly. Take the washer to the hardware store to match the size, or buy an assortment pack. Install the new washer into the slip nut, reassemble the P-trap, and tighten hand-tight plus 1/4 turn with pliers.",
      },
      {
        title: "Replace the entire P-trap assembly",
        description: "If the P-trap itself is cracked, corroded (on metal traps), or if the slip nuts are so old the threads are damaged, replace the whole P-trap assembly. These are inexpensive ($8-15) and come as a kit with all the pieces. With the water off and a bucket ready, unscrew all the slip nuts on the drain assembly — the tailpiece, P-trap, and drain arm. Take the old P-trap to the store to match the diameter (1-1/4\" for bathroom sinks, 1-1/2\" for kitchen sinks). Assemble the new trap, insert each slip nut washer with the tapered side facing the fitting it will press against, and tighten hand-tight plus 1/4 turn with pliers.",
        safetyWarning: "Don't overtighten plastic slip nuts — they crack easily. Hand-tight plus a quarter turn is sufficient.",
      },
      {
        title: "Fix a supply line leak",
        description: "If the leak is coming from one of the braided hoses connecting the shut-off valve to the faucet, first try tightening the nut at the leaking connection with an adjustable wrench — a quarter turn often stops the leak. If tightening doesn't help, or if the hose itself shows corrosion or bulging, replace the supply line. Turn off the shut-off valve (clockwise), unscrew both ends of the supply line, and take it to the store to match the length and end type. Wrap the faucet tailpiece threads with 2-3 wraps of Teflon tape before installing the new line. Hand-tighten both ends then add a quarter turn with a wrench.",
      },
      {
        title: "Test all repairs and check for leaks",
        description: "Once everything is reassembled, slowly turn the water supply valves back on. Run water for 2-3 minutes — both hot and cold. Watch every connection point under the sink with a flashlight. Check the slip joints, both ends of the P-trap, and the supply line fittings at both ends. Dry any drips and watch again. Any leak that persists after tightening means the washer isn't seating properly — disassemble, check the washer orientation (tapered side faces the fitting), and reassemble. Put a dry paper towel or piece of cardboard in the cabinet and check it 24 hours later to catch any slow drips.",
      },
    ],
    whenToCallPro: "Call a plumber if the shut-off valves under the sink leak when you turn them or won't fully close (they need replacement before any other work can proceed), if the wall drain pipe is leaking where it exits the wall (requires opening the wall), if you see mold or significant water damage to the cabinet floor or surrounding cabinets (water may have been leaking for a long time — assess the damage first), or if the kitchen sink drain is connected to a garbage disposal and the disposal itself is leaking from the bottom (internal seal failure requires disposal replacement).",
    relatedRepairs: ["unclog-drain", "fix-leaky-faucet", "fix-garbage-disposal"],
  },
  {
    slug: "fix-sticking-door",
    title: "How to Fix a Door That Sticks or Won't Close Properly",
    metaDescription: "Fix a door that sticks, rubs, or won't latch without calling anyone. Covers hinge tightening, shimming, planing, and strike plate adjustment. Easy DIY guide.",
    heroEmoji: "🚪",
    difficulty: "Easy",
    activeTime: 30,
    totalTime: 45,
    estimatedCost: "$0-25",
    safetyLevel: "DIY-friendly",
    overview: "A door that sticks, rubs against the frame, or won't latch properly is one of the most common and most annoying home problems. It becomes especially bad in summer when humidity causes wood to expand, or in older homes where settling has shifted the door frame out of square.\n\nBefore you pull out a plane or saw, know that 80% of sticking door problems are caused by one of two simple things: loose hinge screws or swollen wood — and most of those are fixed in under 15 minutes without removing the door. The instinct to immediately start sanding or planing is usually wrong; start with the hinges first.\n\nThis guide walks you through a systematic approach from the simplest fixes to more involved ones. You'll diagnose where the door is sticking, address the root cause, and end up with a door that opens and closes smoothly. We cover tightening hinges, repairing stripped screw holes, shimming hinges to realign the door, planing or sanding rubbing spots, and adjusting the strike plate so the door latches properly.\n\nNote: if your door started sticking suddenly (especially after rain or high humidity), try the humidity first. Run a dehumidifier or let dry conditions prevail for a week — the door may resolve itself. Only do permanent modifications after confirming the sticking persists in dry conditions.",
    toolsNeeded: [
      "Screwdriver (Phillips, #2)",
      "Hand plane or electric sander (for planing sticking spots)",
      "Hammer",
      "Chisel (for strike plate adjustment)",
      "Level",
      "Pencil",
      "Nail set",
    ],
    materialsNeeded: [
      { name: "Longer hinge screws (3\" wood screws, #8)", estimatedCost: "$5-8", amazonSearch: "3+inch+wood+screws+8+flat+head" },
      { name: "Wooden toothpicks or golf tees (for stripped holes)", estimatedCost: "$3", amazonSearch: "wooden+toothpicks+round" },
      { name: "Wood glue", estimatedCost: "$5-8", amazonSearch: "wood+glue+elmers+titebond" },
      { name: "Hinge shims (thin cardboard or commercial)", estimatedCost: "$5-10", amazonSearch: "door+hinge+shims+cardboard" },
      { name: "Strike plate (if replacing)", estimatedCost: "$5-10", amazonSearch: "door+strike+plate+replacement" },
    ],
    steps: [
      {
        title: "Diagnose exactly where the door sticks",
        description: "Open and close the door slowly and watch where it makes contact with the frame. Look for shiny spots or worn paint on the door edge or door frame — these are the contact points. Rub a piece of chalk or crayon on the door edge, close the door firmly, and open it — the chalk marks on the frame reveal exactly where the contact is. Common contact zones: top corner of the latch side (usually a hinge problem), bottom of the door (settling or warped door), or along the latch edge (swelling or out-of-square frame).",
      },
      {
        title: "Tighten all hinge screws first",
        description: "This is the most important step and fixes the majority of sticking doors. A door that's sagging even 1/8\" can rub against the frame. Open the door fully and tighten every screw in every hinge (usually 2-3 hinges, each with 4-6 screws on the door side and 4-6 on the frame side). If a screw spins without tightening — it's stripped. Fix stripped holes by removing the screw, pushing 2-3 toothpicks coated in wood glue into the hole, letting it dry 30 minutes, breaking them off flush, then re-driving the original screw. For better holding power, replace standard short hinge screws (3/4\") with 3-inch screws that reach into the stud behind the frame — this transforms a wobbly hinge into a rock-solid one.",
      },
      {
        title: "Shim a hinge to realign the door",
        description: "If the door rubs on the hinge side of the frame, the hinge mortises (recesses) may be cut too deep. If it rubs on the latch side, the hinges may need to go slightly deeper. To shim a hinge (add material to push the door away from the frame on that side): remove the hinge from the frame side, cut a piece of thin cardboard the same shape as the hinge leaf, and place it in the mortise before reattaching the hinge. This shifts the door away from the frame at that hinge. Adding a shim to the top hinge tilts the latch side of the door upward; shimming the bottom hinge tilts it downward. Experiment with different combinations to get the door hanging evenly.",
      },
      {
        title: "Plane or sand the sticking area",
        description: "If hinge adjustments don't fully solve the sticking, you need to remove material from the door edge. For minor rubbing, coarse sandpaper (60-80 grit) on a sanding block or electric sander works well. For significant sticking, a hand plane removes material more efficiently and gives you more control. You can plane the door in place if you have room to swing it open — no need to remove it for minor work. Plane in the direction of the wood grain. Remove a little at a time and test the fit frequently. Remember: if the door sticks due to seasonal swelling, don't remove too much or it will be loose in winter.",
        safetyWarning: "Wear eye protection when planing or sanding. If the door has old paint (pre-1978), test for lead paint before sanding — sanding lead paint creates hazardous dust.",
      },
      {
        title: "Adjust or relocate the strike plate",
        description: "If the door closes without sticking but the latch bolt doesn't engage the strike plate hole properly, the strike plate needs adjustment. Apply lipstick or chalk to the latch bolt, close the door, and open it — the mark shows exactly where the bolt is hitting. If the bolt hits too high, low, or to the side, try bending the strike plate slightly with a screwdriver, or file the strike plate opening to enlarge it in the direction needed. For major misalignment, remove the strike plate, chisel the mortise slightly in the new direction, and reinstall it in the correct position.",
      },
      {
        title: "Seal the door edges to prevent future sticking",
        description: "Once the door closes smoothly, seal the planed or sanded edges with paint or polyurethane to slow future moisture absorption. Unpainted wood absorbs humidity and swells much faster than sealed wood. This simple step significantly reduces how often the door will need adjusting. Pay particular attention to the bottom edge of the door, which is often left unpainted and absorbs the most moisture from the floor.",
      },
    ],
    whenToCallPro: "Call a carpenter or contractor if the door frame itself is visibly out of square or bowed (you can check with a level), if there are cracks in the wall or ceiling near the door frame (could indicate foundation settling or structural movement — have a structural engineer assess), if multiple doors throughout the house started sticking at the same time (possible foundation issue), or if the door is a fire-rated exterior or fire door that requires precise fit for safety reasons.",
    relatedRepairs: ["fix-squeaky-door", "patch-drywall-hole", "replace-light-switch"],
  },
  {
    slug: "replace-toilet-seat",
    title: "How to Replace a Toilet Seat",
    metaDescription: "Replace a toilet seat in 10 minutes. Learn how to measure, remove the old seat, and install a new one. Works on all toilet shapes. No plumber needed.",
    heroEmoji: "🪑",
    difficulty: "Easy",
    activeTime: 10,
    totalTime: 15,
    estimatedCost: "$15-80",
    safetyLevel: "DIY-friendly",
    overview: "Replacing a toilet seat is one of the quickest and most satisfying home improvements you can make. An old, cracked, yellowed, or unstable toilet seat is uncomfortable, unhygienic, and just unpleasant to deal with every day. A new seat makes the whole bathroom feel cleaner and more updated — and the entire job takes about 10 minutes with no tools or plumbing experience required.\n\nThe only things that matter for buying the right replacement are your toilet bowl shape and the bolt hole spacing. Toilet bowls come in two shapes: round (compact, about 16.5 inches from the front of the bowl to the bolt holes) and elongated (about 18.5 inches). Buying the wrong shape means the seat won't fit. Bolt hole spacing is almost always the standard 5.5 inches apart, but it's worth measuring yours before you head to the store.\n\nBeyond basic seat replacement, modern seats offer a huge range of upgrades: slow-close hinges that never slam (a game-changer if you have children or a light sleeper in the house), quick-release hinges for easy cleaning, soft-close plastic vs. enameled wood construction, and full-featured bidet seats that add a warm water wash function. All install the same basic way.\n\nThis guide covers everything: measuring your toilet, removing the old seat (including the common problem of seized or corroded mounting bolts), and installing the new one correctly so it doesn't shift or wobble.",
    toolsNeeded: [
      "Tape measure",
      "Adjustable wrench or pliers",
      "Flathead screwdriver",
      "Hacksaw (for seized bolts only)",
      "Rubber gloves",
    ],
    materialsNeeded: [
      { name: "Replacement toilet seat (round or elongated to match)", estimatedCost: "$15-80", amazonSearch: "toilet+seat+slow+close+elongated" },
      { name: "WD-40 (for corroded mounting bolts)", estimatedCost: "$5-8", amazonSearch: "wd40+lubricant+spray" },
    ],
    steps: [
      {
        title: "Measure your toilet bowl shape and bolt spacing",
        description: "Before buying a new seat, measure two things. First, the bowl shape: measure from the center of the mounting bolts (at the back of the bowl) to the very front of the bowl. Round bowls measure approximately 16.5 inches; elongated bowls measure approximately 18.5 inches. Look straight down at your existing seat — round seats look circular and elongated seats look like an oval egg shape. Second, measure the distance between the two bolt holes from center to center. Standard is 5.5 inches, but confirm yours. Write these measurements down before shopping.",
      },
      {
        title: "Remove the old seat: open the hinge caps",
        description: "Most toilet seats have plastic caps covering the mounting bolts at the back of the seat. Flip these caps up by prying gently with a flathead screwdriver — they're usually hinged and just need a firm pry. Underneath you'll see the bolt heads (typically Phillips screws or slotted bolts).",
      },
      {
        title: "Unscrew the mounting bolts",
        description: "Hold the nut underneath the toilet bowl rim with pliers while turning the bolt head on top counter-clockwise with a screwdriver. If everything spins freely, you may need someone to hold the bolt still from above while you turn the nut below. The nut is underneath the porcelain rim — reach around or under with pliers. Once the nuts are off, lift the old seat straight up and off the bowl. Dispose of it — toilet seats are not recyclable.",
        safetyWarning: "Old toilet seats can harbor bacteria. Wear rubber gloves during removal and wash hands thoroughly afterward.",
      },
      {
        title: "Deal with seized or corroded bolts (if they won't turn)",
        description: "Toilet seat bolts are often made of plastic or cheap metal and corrode over time, especially in high-humidity bathrooms. Spray WD-40 onto the bolt where it meets the nut and let it soak for 5-10 minutes. Try again with pliers. If the bolt still won't turn, hold the bolt completely still (use locking pliers to grip it) and try turning the nut — sometimes this works when the top won't. Last resort: use a hacksaw to cut through the bolt between the nut and the bottom of the porcelain. Cut carefully to avoid scratching the toilet. The bolt and seat come free after cutting.",
      },
      {
        title: "Clean the mounting area",
        description: "Before installing the new seat, clean around the bolt holes thoroughly. Mineral deposits, old caulk, or soap scum can build up here and prevent the new seat from sitting flat. Wipe the area with a disinfecting cleaner and let it dry. Check that both bolt holes are clear and that the porcelain surface is flat and clean where the new seat will contact it.",
      },
      {
        title: "Install the new seat",
        description: "Most modern toilet seats have plastic bolts that come pre-assembled into the seat hinges. Align the hinge bolts over the two mounting holes and drop them through. Go under the toilet rim and thread the plastic nuts onto the bolts finger-tight. Once both nuts are on, tighten them — plastic nuts are usually hand-tightened only, or tightened with a wrench to 'snug' but never cranked down hard (you can crack the porcelain). For seats with metal bolts, the same process applies. Snap the plastic hinge caps down over the bolts. Test the seat: sit on it and try to shift it side to side — it should feel rock solid with no movement.",
      },
      {
        title: "Test slow-close function and alignment",
        description: "If your new seat has slow-close hinges, test by lifting the seat to vertical and releasing — it should float down slowly and close without a sound. Lift the lid and seat together and test both. Check that the seat is centered left-to-right on the bowl. Most hinges allow minor adjustment: slightly loosen the mounting nuts, shift the seat into position, and retighten. The seat front should slightly overhang the front of the bowl but not by more than 3/4 inch.",
      },
    ],
    whenToCallPro: "Replacing a toilet seat essentially never requires a plumber. However, if the toilet is wobbly on the floor (not just the seat, but the whole toilet), that indicates the wax ring or floor bolts may be failing — that does need a plumber. If the porcelain around the bolt holes is cracked, the toilet itself may need replacement.",
    relatedRepairs: ["fix-running-toilet", "fix-clogged-toilet", "replace-toilet-flapper"],
  },
  {
    slug: "replace-bathroom-faucet",
    title: "How to Replace a Bathroom Faucet",
    metaDescription: "Replace a bathroom faucet yourself in 1-2 hours. Complete guide covering single-hole and three-hole faucets, supply line connections, and drain assembly installation.",
    heroEmoji: "🪠",
    difficulty: "Medium",
    activeTime: 90,
    totalTime: 120,
    estimatedCost: "$40-200",
    safetyLevel: "DIY-friendly",
    overview: "Replacing a bathroom faucet is one of the most satisfying DIY plumbing upgrades — you're working in a confined space, but there's no soldering, no permits required, and the payoff is immediate. A new faucet can transform the look of an entire bathroom.\n\nThe most important thing before you start is buying the right faucet. You need to know your sink's hole configuration: single-hole (one faucet handle with integrated spout), centerset (two handles and spout as one unit, with holes 4 inches apart), or widespread (two separate handles and a spout, with holes 6-8 inches apart). Most bathroom sinks are centerset. Check under your sink and count the holes before buying.\n\nBudget 90-120 minutes for a first-timer. The hardest part is usually working under the sink in an awkward position — a basin wrench makes this dramatically easier.",
    toolsNeeded: [
      "Basin wrench (essential — makes under-sink work possible)",
      "Adjustable wrench",
      "Plumber's putty or silicone sealant",
      "Bucket and towels",
      "Flathead and Phillips screwdrivers",
      "Flashlight or headlamp",
      "Utility knife",
    ],
    materialsNeeded: [
      { name: "New bathroom faucet (centerset, single-hole, or widespread to match your sink)", estimatedCost: "$40-200", amazonSearch: "bathroom+faucet+centerset+brushed+nickel" },
      { name: "Basin wrench", estimatedCost: "$15-25", amazonSearch: "basin+wrench+plumbing" },
      { name: "Flexible supply lines (10\" or 12\", if not included with faucet)", estimatedCost: "$8-15", amazonSearch: "braided+stainless+faucet+supply+lines" },
      { name: "Plumber's putty", estimatedCost: "$4-7", amazonSearch: "plumber%27s+putty" },
      { name: "Teflon tape", estimatedCost: "$3-5", amazonSearch: "teflon+tape+thread+seal" },
    ],
    steps: [
      {
        title: "Shut off water and clear out under the sink",
        description: "Turn both shut-off valves (hot and cold) under the sink clockwise until fully closed. Turn the faucet handles on to release pressure and drain the lines. Place a bucket under the supply line connections to catch residual water. Clear everything out from under the sink — you'll need room to work.",
      },
      {
        title: "Disconnect the supply lines",
        description: "Using an adjustable wrench, unscrew the supply line nuts from the shut-off valves (bottom connection) and from the faucet tailpieces (top connection). These are usually 3/8-inch compression fittings. Have your bucket ready — each line will drain a cup or two of water. If the lines are old and stiff, this is a good time to replace them with new braided stainless lines.",
      },
      {
        title: "Disconnect the drain linkage",
        description: "Most bathroom faucets include a pop-up drain stopper that's connected to the faucet via a thin rod and pivot mechanism. Under the sink, look for a horizontal pivot rod going into the drain pipe, held in by a clip. Pull the clip and pull out the pivot rod. The vertical lift rod passes through the faucet body — you'll pull this out when you remove the faucet. Some faucets have a separate drain assembly — just loosen the pivot rod connection.",
      },
      {
        title: "Remove the old faucet",
        description: "Under the sink, use the basin wrench to unscrew the mounting nuts holding the faucet to the sink deck — there's usually one or two nuts, one per tailpiece. Basin wrenches are specifically designed to reach up in tight spaces where your hands can't reach. Once the nuts are off, lift the faucet out from the top. Scrape away any old putty or sealant from the sink surface with a plastic scraper or utility knife.",
      },
      {
        title: "Install the new faucet",
        description: "Read the instructions included with your new faucet — brands vary. Most faucets have a deck plate or gasket that goes between the faucet body and the sink. If the faucet uses plumber's putty, roll a rope of putty and press it under the deck plate before setting it in place. If it uses a rubber gasket (more common now), just set it in place dry. Insert the faucet through the hole(s) from the top, thread the mounting hardware from below, and tighten the mounting nuts with the basin wrench until snug.",
        safetyWarning: "Don't overtighten the mounting nuts — you can crack a porcelain sink. Tighten until snug plus a quarter turn.",
      },
      {
        title: "Connect the supply lines",
        description: "Wrap the faucet tailpiece threads with 2-3 wraps of Teflon tape. Attach the new supply lines to the faucet tailpieces first (hand-tight plus a quarter turn with a wrench). Then connect the other ends to the shut-off valves. Don't overtighten — these are compression fittings and overtightening will damage them. Hand tight plus a quarter turn is usually sufficient.",
      },
      {
        title: "Install the drain assembly",
        description: "Your new faucet should include a new drain assembly. Apply plumber's putty around the underside of the drain flange, insert it through the drain hole from the top, and hand-tighten the drain nut from below. Insert the pivot rod through the horizontal opening in the drain pipe, hook it through the drain stopper loop, and secure the clip. Thread the lift rod down through the faucet body and clip it to the pivot rod connector bar. Test the stopper action before finishing.",
      },
      {
        title: "Turn on water and check for leaks",
        description: "Slowly open both shut-off valves. Turn on the faucet and let water run for 30 seconds. Shine a flashlight on every connection under the sink: supply line fittings at the valve and at the faucet, and the drain body connection. Any drip means a connection needs to be tightened slightly. A slow drip now will become a steady drip or leak within weeks — fix it before closing up.",
      },
    ],
    whenToCallPro: "Call a plumber if the shut-off valves under the sink are frozen, corroded, or begin leaking when you try to close them (the valves need to be replaced before any faucet work can happen), if you discover corrosion or damage to the drain tailpiece or P-trap, or if you're replacing a faucet on an older home with galvanized or copper supply lines (connections to old pipe types require different fittings and more experience).",
    relatedRepairs: ["fix-dripping-kitchen-faucet", "fix-leaky-faucet", "replace-shower-head"],
  },
  {
    slug: "stop-smoke-detector-chirping",
    title: "How to Stop a Smoke Detector from Chirping",
    metaDescription: "Smoke detector chirping every 30-60 seconds? Here's how to stop it in under 10 minutes. Covers dying batteries, end-of-life alarms, dust, and wired units.",
    heroEmoji: "🚨",
    difficulty: "Easy",
    activeTime: 10,
    totalTime: 15,
    estimatedCost: "$3-15",
    safetyLevel: "DIY-friendly",
    overview: "A chirping smoke detector is one of the most universally annoying sounds in a home — a single short beep every 30 to 60 seconds, always louder at 2 a.m. The good news is that a chirp (not a full alarm) almost always means the detector is working correctly and is trying to tell you something specific. The bad news is that replacing the battery doesn't always fix it.\n\nThere are four common causes of a chirping smoke detector: a dying battery, an end-of-life signal (the detector itself is 10+ years old and needs to be replaced), dust or debris interfering with the sensor, or — for hardwired units — a tripped breaker or loose backup battery. The fix is usually under 10 minutes once you know which one it is.\n\nWe'll walk through the exact order to diagnose and fix it, including why the chirp sometimes continues after a new battery and what the end-of-life chirp means. No tools required for most fixes.",
    toolsNeeded: ["Step stool or ladder", "Canned air or vacuum with brush attachment", "Soft cloth"],
    materialsNeeded: [
      { name: "9V battery (most common size)", estimatedCost: "$3-6", amazonSearch: "9v+battery+alkaline+smoke+detector" },
      { name: "AA batteries (for newer models)", estimatedCost: "$4-8", amazonSearch: "aa+alkaline+battery+pack" },
      { name: "Replacement 10-year sealed smoke detector", estimatedCost: "$15-25", amazonSearch: "10+year+sealed+smoke+detector" },
      { name: "Combination smoke and CO detector", estimatedCost: "$25-45", amazonSearch: "combination+smoke+carbon+monoxide+detector" },
    ],
    steps: [
      {
        title: "Identify which detector is chirping",
        description: "If you have multiple detectors, the chirp can echo and sound like it's coming from the wrong spot. Stand under each unit for 30-60 seconds and wait for the next chirp — it's usually obvious when you're right under the source. Interconnected detectors (common in homes built after 1996) can all chirp in sequence, so you may need to silence the loudest one first. Write down which unit it is before climbing up.",
      },
      {
        title: "Check the manufacture date on the back",
        description: "Take the detector down (twist counter-clockwise about 1/4 turn to release from the mounting bracket). Look at the back of the unit for a manufacture date — it's usually printed on a label. If the detector is 10 years or older, it has reached end of life and the chirp will not stop until you replace the entire unit. This is non-negotiable: the sensor degrades and a new battery will not help. Skip to step 6 if this is the case.",
        safetyWarning: "Smoke detectors are legally required to be replaced every 10 years. Do not attempt to silence an end-of-life unit permanently — it is no longer reliable.",
      },
      {
        title: "Replace the battery (even if you just changed it)",
        description: "Open the battery compartment and remove the old battery. Important: use a brand-new battery from a fresh pack — not one from a junk drawer. Half-full batteries are the #1 reason a new battery 'doesn't fix it.' Most older detectors use a 9V; some newer models use AA. Match the polarity carefully. Reinstall the battery, close the compartment, and reattach the detector to the ceiling bracket. Wait 60 seconds. If the chirp stops, you're done.",
      },
      {
        title: "Clear the silence/hush button",
        description: "Press and hold the test/silence button on the front of the detector for 15-20 seconds. This drains any residual charge from the capacitor that can make the unit 'remember' the low-battery state even after a new battery is installed. Release the button — you should hear a single confirmation chirp. Reinstall the detector and wait. This single step fixes roughly 1 in 5 'chirping after battery replacement' cases.",
      },
      {
        title: "Clean out dust and debris",
        description: "Dust, cobwebs, and insects inside the sensor chamber can cause nuisance chirps and even false alarms. With the battery out, use a can of compressed air to blow out the vents on the side of the detector. Hold the can 4-6 inches away and blow air through each vent slot. Follow up with a vacuum brush attachment around the outside. Wipe the housing with a dry cloth. Reinstall the battery and remount. Plan to do this every 6 months — it extends the life of the unit and prevents most future chirps.",
      },
      {
        title: "For hardwired detectors — check the breaker and backup battery",
        description: "Hardwired smoke detectors (connected to household AC with a backup battery) chirp when either the backup battery is low OR when power to the circuit is interrupted. First, check your electrical panel for a tripped breaker labeled 'smoke detectors' or 'bedrooms' and reset it if needed. Then take the unit down, disconnect the wiring harness by squeezing the clip, replace the backup battery, reconnect the harness, and reattach to the bracket. Wait 60 seconds for the chirp to clear.",
        safetyWarning: "Never cut or splice smoke detector wiring without turning off the breaker first. If you're uncomfortable with any electrical work, call an electrician.",
      },
      {
        title: "If all else fails, replace the detector",
        description: "If the chirp continues after a fresh battery, a hold-reset, and a cleaning, the detector is failing. Even if it's under 10 years old, a persistently chirping unit with no diagnosable cause should be replaced — the internal sensor or circuitry is unreliable. Buy a 10-year sealed lithium battery model so you never have to change batteries again, just replace the whole unit in a decade. If the unit is near a kitchen or bathroom, consider a photoelectric model (fewer nuisance alarms from cooking and steam). Write the install date on the back with a permanent marker.",
      },
    ],
    whenToCallPro: "Call an electrician if multiple hardwired detectors are chirping at once and a breaker reset doesn't fix it (could indicate a wiring issue), if you smell anything burning near the detector, if the detector is giving a full three-beep alarm pattern rather than a single chirp (that's a smoke signal — evacuate first, then investigate), or if you have a combination smoke/CO detector giving a four-beep pattern (that's carbon monoxide — evacuate and call 911). A chirp is a maintenance issue; an alarm is an emergency.",
    relatedRepairs: ["reset-gfci-outlet", "replace-light-switch", "fix-wobbly-ceiling-fan"],
  },
  {
    slug: "fix-wobbly-ceiling-fan",
    title: "How to Fix a Wobbly Ceiling Fan",
    metaDescription: "Stop a wobbly ceiling fan in under 30 minutes. Covers loose blades, balancing kits, mounting screws, and warped blades. No electrician needed.",
    heroEmoji: "💨",
    difficulty: "Easy",
    activeTime: 20,
    totalTime: 30,
    estimatedCost: "$0-15",
    safetyLevel: "DIY-friendly",
    overview: "A wobbly ceiling fan isn't just annoying — it's a sign that something is out of balance, and left unchecked, it accelerates wear on the motor bearings and can loosen the mounting hardware over time. The wobble gets worse, the noise gets louder, and eventually you're staring at a fan you're afraid to turn on high.\n\nHere's the thing most people don't realize: a wobble almost never means the fan is about to fall. It usually means one blade is slightly heavier, warped, or mounted at a different angle than the others. The fix is methodical but simple — tighten everything first, then balance.\n\nThe entire job takes 20-30 minutes, costs $0-15, and the only tool you truly need beyond a screwdriver is a $7 balancing kit that comes with most fans (check your junk drawer — you might already have one).",
    toolsNeeded: ["Step stool or ladder", "Screwdriver (Phillips, usually)", "Ruler or yardstick", "Ceiling fan balancing kit (clip-on weights)"],
    materialsNeeded: [
      { name: "Ceiling fan balancing kit", estimatedCost: "$7-10", amazonSearch: "ceiling+fan+balancing+kit" },
      { name: "Thread-locking compound (optional)", estimatedCost: "$5-8", amazonSearch: "loctite+threadlocker+blue+242" },
      { name: "Replacement fan blade (if warped)", estimatedCost: "$10-15", amazonSearch: "universal+ceiling+fan+blade+replacement" },
    ],
    steps: [
      {
        title: "Turn off the fan and let it stop completely",
        description: "Turn off the fan at the wall switch or pull chain. Wait until the blades come to a complete stop — never work on a fan that's still spinning or coasting. If the fan has a light, turn that off too. You don't need to kill the breaker for this repair since you won't be touching any wiring, but if you want extra peace of mind, flip the breaker.",
      },
      {
        title: "Tighten the blade screws (this alone fixes 50% of wobbles)",
        description: "Climb up and check every screw on every blade. Each blade has two connection points: the screws holding the blade to the blade bracket (blade iron), and the screws holding the blade bracket to the motor housing. Tighten all of them. Don't over-torque — just snug plus a quarter turn. Loose blade screws are the single most common cause of ceiling fan wobble. If a screw is stripped and won't tighten, replace it with one that's the same diameter but slightly longer, or use a drop of thread-locking compound.",
      },
      {
        title: "Check the mounting bracket and canopy",
        description: "With the fan still off, gently try to rock the entire fan unit where it meets the ceiling. If the whole assembly moves, the mounting bracket or canopy screws are loose. Remove the canopy cover (it usually unscrews or has a few screws around the rim) to access the mounting bracket. Tighten the screws attaching the bracket to the electrical box. Also check that the downrod ball sits properly in the bracket socket — if it's seated crooked, the whole fan will wobble regardless of blade balance. Reattach the canopy.",
        safetyWarning: "If the electrical box itself feels loose or pulls away from the ceiling, stop. That's a structural issue — the box may not be fan-rated. Have an electrician install a fan-rated brace box before using the fan again.",
      },
      {
        title: "Measure blade alignment",
        description: "Hold a yardstick or ruler vertically so the end touches the ceiling and the flat edge extends down past a blade tip. Rotate each blade to the same position under the ruler and note the distance between the ruler and each blade tip. All blades should be the same distance from the ceiling (within 1/8 inch). If one blade is higher or lower, gently bend the blade bracket (blade iron) at the motor housing to bring it into alignment. Small adjustments — a few millimeters — make a big difference.",
      },
      {
        title: "Balance the blades with a balancing kit",
        description: "Turn the fan on medium speed. If it still wobbles after tightening and alignment, you need to balance the blades by weight. Clip the balancing clip (from the kit) to the center of one blade, halfway between the bracket and the tip. Run the fan on medium and note the wobble. Move the clip to the next blade and repeat. The blade where the clip reduces the wobble the most is the light blade. Once you've identified the right blade, slide the clip along that blade to find the exact position where the wobble is minimized. Peel a sticky weight from the kit and apply it to the top of the blade at that position, centered on the blade's midline. Remove the clip.",
      },
      {
        title: "Check for warped blades",
        description: "If balancing doesn't fully solve it, lay each blade flat on a countertop or table. A warped blade will rock or have a visible curve. Warped blades are common in humid climates (South Florida, Gulf Coast) or if the fan has been off for months. You can try flipping the warped blade — sometimes the warp cancels out in the other direction. If it's badly warped, replace it. Buy the same brand/model blade, or get a universal set and replace all blades at once for a consistent look.",
      },
      {
        title: "Test on all speeds",
        description: "Run the fan on low, medium, and high for at least 30 seconds each. A properly balanced fan should run with minimal visible wobble at every speed. Some very slight movement is normal — fans are not precision instruments. But you should not see the downrod swinging or the pull chain swaying. If the wobble is gone on low and medium but returns on high, you may need to add a second balancing weight or the motor bearings may be worn (which is a replacement situation, not a repair).",
      },
    ],
    whenToCallPro: "Call a professional if the electrical box is loose or not fan-rated (this is a safety hazard — the fan needs a proper ceiling-mounted brace box), if the motor makes grinding or buzzing noises unrelated to the wobble (bearing failure), if the downrod or mounting ball is visibly damaged or cracked, or if the fan is on a vaulted ceiling and you can't safely reach it with a ladder. Wobble itself is a DIY fix; structural and motor problems are not.",
    relatedRepairs: ["install-ceiling-fan", "replace-light-switch", "stop-smoke-detector-chirping"],
  },
  {
    slug: "reset-gfci-outlet",
    title: "How to Reset a GFCI Outlet That Won't Reset",
    metaDescription: "GFCI outlet won't reset? Here's the exact diagnostic order: upstream tripped GFCI, moisture, bad appliance, or dead outlet. 10 minutes, no electrician needed in most cases.",
    heroEmoji: "⚡",
    difficulty: "Easy",
    activeTime: 10,
    totalTime: 20,
    estimatedCost: "$0-25",
    safetyLevel: "DIY-friendly",
    overview: "A GFCI outlet (the one with the little Test and Reset buttons, usually in bathrooms, kitchens, garages, and outdoors) is designed to cut power the instant it detects even a tiny current leak — the kind that would otherwise run through a person standing in water. That's the job. When it trips, it's almost always doing the right thing. The question is why, and whether you can reset it.\n\nHere's what most people don't know: one GFCI outlet typically protects several outlets downstream of it. So when half your bathroom, kitchen counter, or garage goes dead at the same time, it's almost always a single tripped GFCI somewhere — and it may not be the outlet you're standing in front of. The bathroom GFCI might actually control the garage outlet. The kitchen GFCI might control the outdoor plug. Finding the right one is the whole game.\n\nThis guide walks through the exact diagnostic order: find the upstream GFCI, check for moisture, unplug any appliance that could be causing the trip, and finally, test whether the outlet itself is dead. 90% of 'won't reset' problems are solved in the first three steps. The last 10% usually means the GFCI is worn out — a $15 part with a 15-minute replacement that most homeowners can do safely if they're comfortable pulling a breaker.",
    toolsNeeded: ["Non-contact voltage tester (pen-style)", "Flashlight", "Phillips screwdriver", "Flat-head screwdriver"],
    materialsNeeded: [
      { name: "Replacement GFCI outlet (15A or 20A, match existing)", estimatedCost: "$15-25", amazonSearch: "gfci+outlet+15+amp+tamper+resistant" },
      { name: "Non-contact voltage tester", estimatedCost: "$10-20", amazonSearch: "non+contact+voltage+tester+pen" },
      { name: "GFCI receptacle tester with trip indicator", estimatedCost: "$10-15", amazonSearch: "gfci+receptacle+outlet+tester" },
      { name: "Electrical tape (black)", estimatedCost: "$3-5", amazonSearch: "electrical+tape+black+3m" },
    ],
    steps: [
      {
        title: "Unplug everything from the dead outlet (and any outlet near it)",
        description: "Before you touch the GFCI, remove every plug from the outlet that won't reset and every outlet in the same room. A faulty appliance — most commonly a hair dryer, space heater, old freezer, pond pump, or anything that's been rained on — will trip a GFCI the instant you reset it. If you don't unplug it first, the GFCI will click, trip again, and you'll waste 20 minutes chasing the wrong problem. Pay special attention to anything with a motor, a heating element, or a plug that looks corroded, cracked, or damp.",
      },
      {
        title: "Press Reset firmly — you should feel a distinct click",
        description: "With nothing plugged in, press the Reset button with a firm, deliberate push. You're looking for a clear mechanical click and, on most models, the little indicator light should go from off/red to off (no light = reset, on most models). If the button won't stay pushed in and pops right back out, something downstream is still tripping it — either moisture, a wiring issue, or a bad GFCI. If the button feels mushy or doesn't click at all, the outlet has failed internally and needs to be replaced (skip to step 7).",
      },
      {
        title: "Look for the upstream GFCI that might control this outlet",
        description: "If the outlet in front of you doesn't have a Reset button at all but is still dead, it's being protected by a GFCI somewhere else. Check every GFCI in the house — bathrooms, kitchen, laundry room, garage, basement, outdoor walls, and sometimes even one labeled inside the breaker panel. Press Reset on each one. The culprit is usually: a bathroom GFCI that also controls a second bathroom, a kitchen counter GFCI that controls the outdoor patio outlet, or a garage GFCI that controls all exterior outlets. Follow the click — when you hear one reset, check whether your dead outlet came back to life.",
        safetyWarning: "Do not remove any outlet covers to trace wiring while power is on. If you need to open an outlet to investigate, turn off the breaker first and confirm with a non-contact voltage tester.",
      },
      {
        title: "Check for moisture — the silent killer of outdoor and bathroom GFCIs",
        description: "Moisture inside a GFCI or downstream outlet will trip it every time. Look at the outlet and every outlet on the same circuit: are any of them outside, under a sink, near a shower, in a damp basement, or exposed to recent rain? Water intrusion is the #1 reason an outdoor GFCI won't reset after a storm. If you suspect moisture, turn off the breaker to that circuit, remove the outlet cover (and the outlet if needed), and let it air-dry for at least 24 hours. For outdoor outlets, make sure the weatherproof in-use cover (the bubble cover) is actually closing and sealing — a broken or missing cover is a frequent cause of repeat tripping.",
        safetyWarning: "Never attempt to dry out a wet outlet with power on, and never stick anything inside the slots to speed up drying. Turn off the breaker first, always.",
      },
      {
        title: "Test the Reset with no load, then one device at a time",
        description: "Once you've ruled out moisture and the GFCI clicks into Reset with nothing plugged in, test each appliance one at a time. Plug in a known-good device (like a phone charger or lamp) first — if it works, the outlet is fine. Then plug in the other items one by one. The moment the GFCI trips, the last thing you plugged in is the culprit. A tripping appliance almost always needs to be repaired or replaced — it has a ground fault, which is a low-grade shock hazard, not just a nuisance. Common repeat offenders: old hair dryers, ancient extension cords, pond pumps, holiday light strings with frayed wires.",
      },
      {
        title: "Test the Test/Reset cycle to confirm the outlet is functioning",
        description: "With the outlet reset and a lamp or GFCI tester plugged in, press the Test button. The lamp should go dark and the Reset button should pop out — that proves the GFCI is actually protecting the circuit. Press Reset. The lamp should come back on. If the Test button does nothing, or if the Reset doesn't drop power, the GFCI is failed-safe but not functioning as a safety device and must be replaced. A $10 plug-in GFCI tester (yellow, with three lights and a little trip button) is the cleanest way to verify this without a lamp.",
      },
      {
        title: "Replace the GFCI if it's over 10-15 years old or failing the test",
        description: "GFCIs wear out. The internal electronics degrade, especially in humid climates or outdoor locations, and the industry recommendation is to replace them every 10-15 years even if they seem fine. If yours won't reset after you've ruled out everything above, or if it fails the Test/Reset cycle, replace it. Turn off the breaker, confirm the outlet is dead with a non-contact voltage tester (touch the probe to each slot), unscrew the outlet, label the 'LINE' wires (power coming in) and 'LOAD' wires (going to downstream outlets) before disconnecting — this is the most common mistake. Wire the new GFCI: LINE screws to the incoming wires, LOAD screws to the downstream wires, ground to green screw. Tuck wires in, screw outlet to box, replace cover, restore power, test.",
        safetyWarning: "Do not reverse LINE and LOAD. A GFCI wired backwards will not protect downstream outlets and may not reset at all. Both terminals are clearly labeled on the back of the outlet. If you're not 100% sure which wires are LINE vs LOAD, use a non-contact tester with the breaker on (carefully, without touching anything metal) to identify the hot pair — those are LINE.",
      },
    ],
    whenToCallPro: "Call a licensed electrician if you've replaced the GFCI and it still won't hold a reset (could be a shared neutral, a damaged wire in the wall, or a miswired junction box upstream), if the outlet or wiring shows visible burn marks, melted plastic, or smells like burning, if the breaker itself trips every time you reset the GFCI (indicates a short, not a ground fault), or if the GFCI is on a circuit that also serves hardwired equipment like a disposal or a bathroom exhaust fan — those situations require diagnostic testing beyond a basic reset. Electrical work inside the panel or in a junction box behind the wall is not a DIY job without a tester, a voltmeter, and code knowledge. $120-200 for an electrician beats a fire.",
    relatedRepairs: ["replace-light-switch", "stop-smoke-detector-chirping", "fix-doorbell"],
  },
];

export const getRepairBySlug = (slug: string): RepairGuide | undefined =>
  REPAIRS.find((r) => r.slug === slug);


