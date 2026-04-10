import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { useEnrollments } from "@/hooks/use-enrollments";
import { useProfile } from "@/hooks/use-profile";
import { programs } from "@/data/programs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  LayoutDashboard,
  PlayCircle,
  Plus,
  User,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { enrollments, loading } = useEnrollments();
  const { displayName } = useProfile();

  const enrolledPrograms = enrollments
    .map((e) => ({
      enrollment: e,
      program: programs.find((p) => p.id === e.program_id),
    }))
    .filter((x) => x.program !== undefined);

  const activeCount = enrollments.filter((e) => e.status === "active").length;
  const completedCount = enrollments.filter((e) => e.status === "completed").length;
  const totalProgress =
    enrollments.length > 0
      ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
      : 0;

  const recommended = programs
    .filter((p) => !enrollments.some((e) => e.program_id === p.id))
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">

          {/* Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple mb-1">
                <LayoutDashboard size={18} />
                <span className="text-sm font-medium">Mi Dashboard</span>
              </div>
              <h1 className="text-3xl font-bold text-white">
                Hola, <span className="gradient-text">{displayName}</span>
              </h1>
              <p className="text-white/60 mt-1">Aquí tienes un resumen de tu aprendizaje</p>
            </div>
            <Button asChild className="bg-gradient-to-r from-purple to-pink text-white hover:opacity-90 self-start sm:self-auto">
              <Link to="/programs">
                <Plus size={16} className="mr-2" />
                Explorar programas
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <Card className="bg-darkbg-lighter border-white/10">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-purple/20 p-3 rounded-xl">
                  <BookOpen className="text-purple" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{enrollments.length}</p>
                  <p className="text-white/60 text-sm">Programas inscritos</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-darkbg-lighter border-white/10">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-pink/20 p-3 rounded-xl">
                  <PlayCircle className="text-pink" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{activeCount}</p>
                  <p className="text-white/60 text-sm">En progreso</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-darkbg-lighter border-white/10">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <CheckCircle className="text-green-400" size={24} />
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">{completedCount}</p>
                  <p className="text-white/60 text-sm">Completados</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* My Programs */}
            <div className="lg:col-span-2">
              <Card className="bg-darkbg-lighter border-white/10">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    <GraduationCap size={20} className="text-purple" />
                    Mis programas
                  </CardTitle>
                  {enrollments.length > 0 && (
                    <span className="text-white/40 text-sm">Progreso medio: {totalProgress}%</span>
                  )}
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-4">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-20 bg-white/5 rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : enrolledPrograms.length === 0 ? (
                    <div className="text-center py-12">
                      <GraduationCap size={40} className="text-white/20 mx-auto mb-3" />
                      <p className="text-white/40 mb-4">Aún no estás inscrito en ningún programa</p>
                      <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Link to="/programs">Explorar programas</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enrolledPrograms.map(({ enrollment, program }) => (
                        <Link
                          key={enrollment.id}
                          to={`/programs/${program!.id}`}
                          className="flex gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                          <img
                            src={program!.imageSrc}
                            alt={program!.title}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="text-white font-medium text-sm line-clamp-1 group-hover:text-purple transition-colors">
                                {program!.title}
                              </h3>
                              <Badge
                                className={`shrink-0 text-xs ${
                                  enrollment.status === "completed"
                                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                                    : "bg-purple/20 text-purple border-purple/30"
                                }`}
                                variant="outline"
                              >
                                {enrollment.status === "completed" ? "Completado" : "En curso"}
                              </Badge>
                            </div>
                            <p className="text-white/40 text-xs mb-2 flex items-center gap-1">
                              <Clock size={11} />
                              {program!.duration} · {program!.provider}
                            </p>
                            <div className="flex items-center gap-2">
                              <Progress value={enrollment.progress} className="h-1.5 flex-1" />
                              <span className="text-white/40 text-xs w-8 text-right">{enrollment.progress}%</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">

              {/* Profile card */}
              <Card className="bg-darkbg-lighter border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white font-bold text-sm">
                      {user?.email?.[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{displayName}</p>
                      <p className="text-white/40 text-xs">{user?.email}</p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Link to="/profile">
                      <User size={14} className="mr-2" />
                      Editar perfil
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recommended */}
              <Card className="bg-darkbg-lighter border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-base">Recomendados para ti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommended.map((p) => (
                    <Link
                      key={p.id}
                      to={`/programs/${p.id}`}
                      className="flex gap-3 group"
                    >
                      <img src={p.imageSrc} alt={p.title} className="w-10 h-10 rounded-md object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="text-white/80 text-xs font-medium line-clamp-2 group-hover:text-purple transition-colors">{p.title}</p>
                        <p className="text-white/40 text-xs">{p.provider}</p>
                      </div>
                    </Link>
                  ))}
                  <Button asChild variant="ghost" size="sm" className="w-full text-purple hover:text-purple hover:bg-purple/10 mt-2">
                    <Link to="/programs">Ver todos →</Link>
                  </Button>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
