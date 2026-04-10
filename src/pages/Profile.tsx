import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import { useProfile } from "@/hooks/use-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Save, User } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { profile, loading, updateProfile, initials } = useProfile();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    birth_date: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        first_name: profile.first_name ?? "",
        last_name: profile.last_name ?? "",
        phone: profile.phone ?? "",
        birth_date: profile.birth_date ?? "",
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    const ok = await updateProfile({
      first_name: form.first_name || null,
      last_name: form.last_name || null,
      phone: form.phone || null,
      birth_date: form.birth_date || null,
    });
    setSaving(false);
    if (ok) {
      toast({ title: "Perfil actualizado", description: "Tus datos se han guardado correctamente." });
    } else {
      toast({ variant: "destructive", title: "Error", description: "No se pudo guardar el perfil." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto max-w-2xl">

          <div className="mb-6 flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="text-white/60 hover:text-white hover:bg-white/10">
              <Link to="/dashboard">
                <ArrowLeft size={16} className="mr-1" />
                Dashboard
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white font-bold text-2xl">
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
              <p className="text-white/50 text-sm">{user?.email}</p>
            </div>
          </div>

          <Card className="bg-darkbg-lighter border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-base">
                <User size={18} className="text-purple" />
                Información personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 bg-white/5 rounded-md animate-pulse" />
                  ))}
                </div>
              ) : (
                <>
                  <div>
                    <Label className="text-white/70 text-sm">Correo electrónico</Label>
                    <Input
                      value={user?.email ?? ""}
                      disabled
                      className="mt-1.5 bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
                    />
                    <p className="text-white/30 text-xs mt-1">El email no se puede modificar</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white/70 text-sm">Nombre</Label>
                      <Input
                        value={form.first_name}
                        onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
                        placeholder="Tu nombre"
                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple"
                      />
                    </div>
                    <div>
                      <Label className="text-white/70 text-sm">Apellido</Label>
                      <Input
                        value={form.last_name}
                        onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                        placeholder="Tu apellido"
                        className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/70 text-sm">Teléfono</Label>
                    <Input
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+34 600 000 000"
                      type="tel"
                      className="mt-1.5 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple"
                    />
                  </div>

                  <div>
                    <Label className="text-white/70 text-sm">Fecha de nacimiento</Label>
                    <Input
                      value={form.birth_date}
                      onChange={(e) => setForm((f) => ({ ...f, birth_date: e.target.value }))}
                      type="date"
                      className="mt-1.5 bg-white/5 border-white/10 text-white focus:border-purple"
                    />
                  </div>

                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-purple to-pink text-white hover:opacity-90"
                  >
                    <Save size={16} className="mr-2" />
                    {saving ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
