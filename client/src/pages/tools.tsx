import { Wrench, Hammer, Ruler, Paintbrush, Zap, Droplets, ThermometerSun, ShoppingCart, Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AMAZON_TAG = "myhandyman-20";

type Tool = {
  name: string;
  description: string;
  price: string;
  amazonSearch: string;
  essential?: boolean;
};

type ToolCategory = {
  title: string;
  icon: React.ReactNode;
  description: string;
  tools: Tool[];
};

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    title: "Starter Toolkit",
    icon: <Star className="size-5 text-[#C6A75E]" />,
    description: "Everything a homeowner needs for 80% of common repairs. Start here.",
    tools: [
      { name: "Cordless Drill/Driver Kit", description: "The single most useful tool you can own. Drives screws, drills holes, does it all.", price: "$50-80", amazonSearch: "cordless+drill+driver+kit", essential: true },
      { name: "25ft Tape Measure", description: "Measure twice, cut once. Get one with a magnetic tip.", price: "$10-15", amazonSearch: "25ft+tape+measure+magnetic", essential: true },
      { name: "Adjustable Wrench Set", description: "Fits most nuts and bolts. Get a 6-inch and 10-inch pair.", price: "$15-25", amazonSearch: "adjustable+wrench+set", essential: true },
      { name: "Needle-Nose & Slip-Joint Pliers", description: "For gripping, pulling, and bending. Two types cover most needs.", price: "$15-20", amazonSearch: "pliers+set+needle+nose", essential: true },
      { name: "Magnetic Stud Finder", description: "Find wall studs before you hang anything. Saves drywall patches.", price: "$10-30", amazonSearch: "stud+finder+magnetic", essential: true },
      { name: "Utility Knife", description: "Cuts drywall, opens packages, scores materials. Replace blades often.", price: "$8-12", amazonSearch: "utility+knife+retractable" },
      { name: "Torpedo Level", description: "Keep things straight. Essential for shelves, TVs, and picture frames.", price: "$8-15", amazonSearch: "torpedo+level+magnetic" },
      { name: "Headlamp", description: "Both hands free while you work in dark cabinets and crawl spaces.", price: "$15-25", amazonSearch: "headlamp+rechargeable+bright", essential: true },
    ],
  },
  {
    title: "Plumbing",
    icon: <Droplets className="size-5 text-blue-500" />,
    description: "Fix leaks, unclog drains, and handle toilet repairs.",
    tools: [
      { name: "Tongue & Groove Pliers (12\")", description: "The go-to for gripping pipes and fittings. Also called Channel Locks.", price: "$15-25", amazonSearch: "tongue+groove+pliers+12+inch" },
      { name: "Basin Wrench", description: "The only way to reach faucet mounting nuts under the sink.", price: "$12-20", amazonSearch: "basin+wrench+faucet" },
      { name: "Plunger (flange style)", description: "Flange plungers work on toilets. Cup plungers are for sinks.", price: "$10-15", amazonSearch: "flange+plunger+toilet" },
      { name: "Drain Snake / Auger", description: "When the plunger fails. Clears clogs without chemicals.", price: "$20-35", amazonSearch: "drain+snake+auger+25ft" },
      { name: "Teflon Tape", description: "Wrap pipe threads to prevent leaks. Cheap and essential.", price: "$3-5", amazonSearch: "teflon+tape+plumbing" },
      { name: "Toilet Repair Kit", description: "Flapper, fill valve, and gaskets. Fixes 90% of running toilets.", price: "$15-25", amazonSearch: "toilet+repair+kit+universal" },
    ],
  },
  {
    title: "Electrical",
    icon: <Zap className="size-5 text-amber-500" />,
    description: "Safely handle switches, outlets, and light fixtures.",
    tools: [
      { name: "Non-Contact Voltage Tester", description: "Tests if wires are live WITHOUT touching them. Never skip this.", price: "$15-25", amazonSearch: "non+contact+voltage+tester", essential: true },
      { name: "Wire Strippers", description: "Cleanly strips insulation without damaging the wire.", price: "$10-15", amazonSearch: "wire+strippers+automatic" },
      { name: "Insulated Screwdriver Set", description: "Rated for electrical work. Phillips and flathead.", price: "$15-25", amazonSearch: "insulated+screwdriver+set+electrician" },
      { name: "Electrical Tape", description: "Insulates wire connections. Get UL-listed black tape.", price: "$3-5", amazonSearch: "electrical+tape+black" },
      { name: "Wire Nuts Assortment", description: "Connect wires safely. Get a multi-size pack.", price: "$5-10", amazonSearch: "wire+nuts+assortment+pack" },
    ],
  },
  {
    title: "Drywall & Painting",
    icon: <Paintbrush className="size-5 text-purple-500" />,
    description: "Patch holes, fix dents, and paint like a pro.",
    tools: [
      { name: "Putty Knife Set (2\", 4\", 6\")", description: "Apply and smooth spackling compound. Multiple sizes for different patches.", price: "$10-15", amazonSearch: "putty+knife+set+drywall" },
      { name: "Drywall Patch Kit", description: "Self-adhesive mesh patches for holes up to 6 inches.", price: "$8-12", amazonSearch: "drywall+patch+kit+mesh" },
      { name: "Sanding Sponge (fine grit)", description: "Smooth dried compound before painting. Fine grit for a clean finish.", price: "$5-8", amazonSearch: "sanding+sponge+fine+grit+drywall" },
      { name: "Painters Tape (1.5\")", description: "Clean paint lines. Remove within 24 hours for best results.", price: "$5-8", amazonSearch: "painters+tape+1.5+inch+frog" },
      { name: "Paint Roller Kit", description: "Roller frame, covers, tray, and brush. Everything for one room.", price: "$15-25", amazonSearch: "paint+roller+kit+tray" },
    ],
  },
  {
    title: "HVAC & Climate",
    icon: <ThermometerSun className="size-5 text-red-500" />,
    description: "Filters, thermostats, and basic HVAC maintenance.",
    tools: [
      { name: "HVAC Filter (check your size)", description: "Replace every 1-3 months. Improves air quality and efficiency.", price: "$10-30", amazonSearch: "hvac+air+filter+home" },
      { name: "Fin Comb", description: "Straighten bent AC condenser fins. Improves cooling efficiency.", price: "$8-12", amazonSearch: "fin+comb+ac+condenser" },
      { name: "Smart Thermostat", description: "Saves 10-15% on energy bills. Installs in 30 minutes.", price: "$80-130", amazonSearch: "smart+thermostat+programmable" },
      { name: "Condensate Drain Cleaning Kit", description: "Prevents AC drain clogs that cause water damage.", price: "$10-15", amazonSearch: "condensate+drain+cleaning+kit" },
    ],
  },
];

export default function Tools() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 pb-24">
      <div className="mb-8 flex items-start gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl border bg-background shadow-sm">
          <Wrench className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Recommended Tools</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Curated tool recommendations for every type of home repair. Click &ldquo;Buy&rdquo; to find the best price on Amazon.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {TOOL_CATEGORIES.map((category) => (
          <div key={category.title}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex size-9 items-center justify-center rounded-xl bg-muted">
                {category.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold">{category.title}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {category.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="rounded-xl border bg-white p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-semibold leading-tight">{tool.name}</h4>
                      {tool.essential && (
                        <Badge variant="secondary" className="text-[10px] shrink-0 bg-[#2FA3A0]/10 text-[#2FA3A0]">
                          Essential
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{tool.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#1F4E79]">{tool.price}</span>
                    <a
                      href={`https://www.amazon.com/s?k=${tool.amazonSearch}&tag=${AMAZON_TAG}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#2FA3A0] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2FA3A0]/90 transition-colors"
                    >
                      <ShoppingCart className="size-3" />
                      Buy
                      <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-[#2FA3A0]/20 bg-[#2FA3A0]/5 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          <strong>Affiliate Disclosure:</strong> MyHandyman.ai is a participant in the Amazon Services LLC Associates Program. We may earn a small commission on qualifying purchases at no additional cost to you.
        </p>
      </div>
    </div>
  );
}
