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
    relatedRepairs: ["replace-toilet-flapper", "unclog-drain", "fix-leaky-faucet"],
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
    relatedRepairs: ["unclog-drain", "replace-shower-head", "fix-running-toilet"],
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
    relatedRepairs: ["paint-room", "fix-squeaky-door", "mount-tv-on-wall"],
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
    relatedRepairs: ["patch-drywall-hole", "fix-leaky-faucet", "paint-room"],
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
    relatedRepairs: ["unclog-drain", "fix-leaky-faucet", "replace-shower-head"],
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
    relatedRepairs: ["replace-light-switch", "install-ceiling-fan", "fix-doorbell"],
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
];

export const getRepairBySlug = (slug: string): RepairGuide | undefined =>
  REPAIRS.find((r) => r.slug === slug);
