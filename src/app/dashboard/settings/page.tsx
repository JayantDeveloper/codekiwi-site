import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// server actions (same folder)
import { loadMeAndSettings, updateProfile, updateSettings } from "./actions";
import type { Prisma } from "@prisma/client";

// Safely extract `school` from a Prisma JSON column (no `any`)
function getSchoolFromSettings(
  json: Prisma.JsonValue | null | undefined
): string {
  if (json && typeof json === "object" && !Array.isArray(json)) {
    const obj = json as Prisma.JsonObject;
    const v = obj["school"];
    return typeof v === "string" ? v : "";
  }
  return "";
}

export default async function SettingsPage() {
  // Load the current user and their settings from DB
  const me = await loadMeAndSettings();

  // Fallbacks if something is missing (should be set if authenticated)
  const name = me?.name ?? "";
  const email = me?.email ?? "";
  const school = getSchoolFromSettings(me?.settings?.json);

  const theme = me?.settings?.theme ?? "system";
  const editorFontSize = me?.settings?.editorFontSize ?? 14;
  const lockDefault = me?.settings?.lockDefault ?? false;
  const slidesPerPage = me?.settings?.slidesPerPage ?? 1;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#d6c49f]/30 bg-white px-4">
          <h1 className="text-xl font-semibold text-[#6b8f2b]">Settings</h1>
        </header>

        <main className="w-full px-4 sm:px-8 md:px-12 py-6">
          <Tabs defaultValue="account">
            <TabsList className="mb-6 bg-[#cfc6b8]/10 border border-[#d6c49f]/30">
              <TabsTrigger
                value="account"
                className="data-[state=active]:bg-white data-[state=active]:text-[#6b8f2b] data-[state=active]:shadow-sm"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="integrations"
                className="data-[state=active]:bg-white data-[state=active]:text-[#6b8f2b] data-[state=active]:shadow-sm"
              >
                Integrations
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-white data-[state=active]:text-[#6b8f2b] data-[state=active]:shadow-sm"
              >
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* ACCOUNT TAB */}
            <TabsContent value="account" className="space-y-6">
              <form
                action={updateProfile}
                className="rounded-xl border border-[#d6c49f]/30 p-6 shadow-sm"
              >
                <h2 className="mb-4 text-xl font-semibold text-[#6b8f2b]">
                  Profile Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center justify-between rounded-md border border-[#d6c49f]/30 p-3">
                      <div>
                        <p className="font-medium text-[#6b8f2b]">
                          Lock Editors by Default
                        </p>
                        <p className="text-sm text-[#6b8f2b]/70">
                          New sessions start locked
                        </p>
                      </div>

                      {/* Native checkbox ensures form posts `lockDefault=on` when checked */}
                      <input
                        id="lockDefault"
                        name="lockDefault"
                        type="checkbox"
                        defaultChecked={lockDefault}
                        className="h-5 w-5 accent-[#6b8f2b] cursor-pointer"
                        aria-label="Lock editors by default"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slidesPerPage" className="text-[#6b8f2b]">
                        Slides Per Page
                      </Label>
                      <Input
                        id="slidesPerPage"
                        name="slidesPerPage"
                        type="number"
                        defaultValue={slidesPerPage}
                        className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="school" className="text-[#6b8f2b]">
                      School/Institution
                    </Label>
                    <Input
                      id="school"
                      name="school"
                      defaultValue={school}
                      className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b]"
                    />
                  </div>

                  <Button className="bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white">
                    Save Changes
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* INTEGRATIONS TAB (visual stub; hook up later) */}
            <TabsContent value="integrations" className="space-y-6">
              <div className="rounded-xl border border-[#d6c49f]/30 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-[#6b8f2b]">
                  Google Integration
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#6b8f2b]">
                        Google Slides
                      </p>
                      <p className="text-sm text-[#6b8f2b]/70">
                        Connect to access your Google Slides presentations
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#d6c49f]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/10 bg-transparent"
                    >
                      Connect
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-[#6b8f2b]">
                        Google Classroom
                      </p>
                      <p className="text-sm text-[#6b8f2b]/70">
                        Sync with your Google Classroom courses
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#d6c49f]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/10 bg-transparent"
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#d6c49f]/30 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-[#6b8f2b]">
                  Google Slides Add-on
                </h2>
                <p className="mb-4 text-[#6b8f2b]/70">
                  Install the CodeKiwi add-on for Google Slides to mark coding
                  exercises in your presentations.
                </p>
                <Button
                  type="button"
                  className="bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white"
                >
                  Install Add-on
                </Button>
              </div>
            </TabsContent>

            {/* NOTIFICATIONS / PREFERENCES TAB */}
            <TabsContent value="notifications" className="space-y-6">
              <form
                action={updateSettings}
                className="rounded-xl border border-[#d6c49f]/30 p-6 shadow-sm space-y-4"
              >
                <h2 className="text-xl font-semibold text-[#6b8f2b]">
                  Preferences
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="theme" className="text-[#6b8f2b]">
                      Theme
                    </Label>
                    <Input
                      id="theme"
                      name="theme"
                      defaultValue={theme}
                      className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="editorFontSize" className="text-[#6b8f2b]">
                      Editor Font Size
                    </Label>
                    <Input
                      id="editorFontSize"
                      name="editorFontSize"
                      type="number"
                      defaultValue={editorFontSize}
                      className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded-md border border-[#d6c49f]/30 p-3">
                    <div>
                      <p className="font-medium text-[#6b8f2b]">
                        Lock Editors by Default
                      </p>
                      <p className="text-sm text-[#6b8f2b]/70">
                        New sessions start locked
                      </p>
                    </div>
                    <Switch
                      name="lockDefault"
                      defaultChecked={lockDefault}
                      className="data-[state=checked]:bg-[#6b8f2b]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slidesPerPage" className="text-[#6b8f2b]">
                      Slides Per Page
                    </Label>
                    <Input
                      id="slidesPerPage"
                      name="slidesPerPage"
                      type="number"
                      defaultValue={slidesPerPage}
                      className="border-[#d6c49f]/30 focus-visible:ring-[#6b8f2b]"
                    />
                  </div>
                </div>

                <Button className="bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white">
                  Save Settings
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
