import { createClient } from "@/lib/supabase/server"
import { MagneticButton } from "@/components/magnetic-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="p-6 md:p-12 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-sans text-3xl font-light tracking-tight text-foreground mb-2">Settings</h1>
        <p className="text-foreground/60">Manage your account preferences.</p>
      </div>

      <div className="space-y-8">
        <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 md:p-8">
          <h2 className="text-xl font-medium mb-6">Profile Information</h2>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled className="bg-background/50 border-foreground/10" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <Input
                  defaultValue={user?.user_metadata?.first_name || ""}
                  className="bg-background/50 border-foreground/10"
                />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  defaultValue={user?.user_metadata?.last_name || ""}
                  className="bg-background/50 border-foreground/10"
                />
              </div>
            </div>
            <div className="pt-4">
              <MagneticButton size="sm">Save Changes</MagneticButton>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-red-500/10 bg-red-500/5 p-6 md:p-8">
          <h2 className="text-xl font-medium text-red-400 mb-2">Danger Zone</h2>
          <p className="text-sm text-foreground/60 mb-6">Irreversible actions related to your account.</p>
          <button className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors border border-red-500/20 bg-red-500/10 px-4 py-2 rounded-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
