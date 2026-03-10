import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { BookOpen, Camera, Clock, DollarSign, Star, ArrowRight, Hammer } from "lucide-react";
// Header/Footer are provided by AppShell
import { ProjectImage } from "@/components/project-image";
import { ProjectRating } from "@/components/project-rating";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

export default function MyProjects() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = localStorage.getItem('anonymousUserId');
    setUserId(storedId);
  }, []);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/users', userId, 'projects'],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/projects`);
      if (!res.ok) throw new Error('Failed to load projects');
      return res.json();
    },
    enabled: !!userId,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-3xl font-extrabold text-foreground">
              My projects
            </h2>
          </div>
          <p className="text-muted-foreground text-sm ml-[3.25rem]">
            Your saved build plans, ready when you are.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="card-premium rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-video bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No User State */}
        {!userId && !isLoading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              No projects yet
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Snap your first photo to generate a build plan. It’ll show up here automatically.
            </p>
            <Button asChild className="font-semibold">
              <Link href="/">
                <Camera className="w-4 h-4 mr-2" />
                Start building
              </Link>
            </Button>
          </div>
        )}

        {/* Empty State */}
        {userId && !isLoading && (!projects || projects.length === 0) && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-muted border border-border flex items-center justify-center mx-auto mb-5">
              <Hammer className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              No builds yet
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
              Snap a photo of what you want to build — and your plan will show up here.
            </p>
            <Button asChild className="font-semibold">
              <Link href="/">
                <Camera className="w-4 h-4 mr-2" />
                Snap your first build
              </Link>
            </Button>
          </div>
        )}

        {/* Projects Grid */}
        {projects && projects.length > 0 && (
          <>
            <p className="text-muted-foreground text-xs mb-5 text-right">{projects.length} build{projects.length !== 1 ? 's' : ''} saved</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((project) => {
                const difficultyColor =
                  project.difficulty === 'Easy' ? 'bg-green-500/15 text-green-400 border-0' :
                  project.difficulty === 'Medium' ? 'bg-yellow-500/15 text-yellow-400 border-0' :
                  'bg-red-500/15 text-red-400 border-0';

                return (
                  <Link key={project.id} href={`/project/${project.id}`}>
                    <div className="card-premium rounded-xl overflow-hidden cursor-pointer group transition-all duration-200">
                      {/* Project Image */}
                      <div className="aspect-video bg-muted relative overflow-hidden">
                        <ProjectImage
                          imageUrl={project.imageUrl}
                          title={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <span className="text-white text-sm font-semibold flex items-center gap-1">
                            View build plan <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        {(project.totalRatings || 0) > 0 && (
                          <div className="absolute top-2.5 right-2.5">
                            <span className="badge-premium rounded-full px-2.5 py-0.5 text-xs">
                              {project.ratingPercentage}%
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Project Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-semibold text-foreground text-sm leading-tight">{project.title}</h4>
                          <Badge variant="outline" className="text-xs flex-shrink-0 ml-1">
                            {project.category}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                          {(project.totalRatings || 0) > 0 ? (
                            <ProjectRating
                              averageRating={project.averageRating}
                              totalRatings={project.totalRatings}
                              ratingPercentage={project.ratingPercentage}
                              size="sm"
                              showPercentage={false}
                            />
                          ) : (
                            <span className="text-muted-foreground text-xs italic">No ratings yet</span>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{project.estimatedTime}min</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className={difficultyColor}>
                            <Star className="w-3 h-3 mr-1" />
                            {project.difficulty}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                              <Hammer className="w-3 h-3 mr-1" />
                              Ready to Build
                            </Badge>
                            {project.estimatedCost && (
                              <div className="flex items-center text-primary text-sm font-semibold">
                                <DollarSign className="w-3 h-3" />
                                {project.estimatedCost}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA to build more */}
            <div className="mt-10 text-center">
              <Button asChild variant="outline" className="text-muted-foreground">
                <Link href="/">
                  <Camera className="w-4 h-4 mr-2" />
                  Start a New Build
                </Link>
              </Button>
            </div>
          </>
        )}

    </main>
  );
}
