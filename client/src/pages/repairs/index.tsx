import { Link } from "wouter";
import { REPAIRS } from "@/content/repairs";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Wrench } from "lucide-react";
import { useEffect } from "react";

export default function RepairsListing() {
  useEffect(() => {
    document.title = "Common Home Repairs — MyHandyman.ai";
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#1F4E79]">Common Home Repairs</h1>
        <p className="mt-2 text-muted-foreground">
          Step-by-step guides for the most common household repairs. Each guide includes tools, materials, cost estimates, and safety assessments.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPAIRS.map((repair) => (
          <Link key={repair.slug} href={`/repairs/${repair.slug}`}>
            <div className="rounded-xl border bg-white p-5 hover:shadow-lg hover:border-[#2FA3A0]/40 transition-all cursor-pointer h-full flex flex-col">
              <div className="text-3xl mb-3">{repair.heroEmoji}</div>
              <h2 className="text-base font-bold text-[#1F4E79] mb-1">{repair.title}</h2>
              <p className="text-xs text-muted-foreground mb-3 flex-grow line-clamp-2">{repair.metaDescription}</p>
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                <Badge variant="secondary" className={
                  repair.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                  repair.difficulty === "Medium" ? "bg-amber-100 text-amber-700" :
                  "bg-red-100 text-red-700"
                }>
                  {repair.difficulty}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" /> {repair.activeTime} min
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DollarSign className="size-3" /> {repair.estimatedCost}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
