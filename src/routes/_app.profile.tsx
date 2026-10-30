import { createFileRoute } from "@tanstack/react-router";
import {
  Camera,
  Save,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { request } from "@/lib/api";

export const Route = createFileRoute("/_app/profile")({
  component: Profile,
});

type ProfileData = {
  _id?: string;
  user_id?: string;

  name: string;
  email: string;

  phone?: string;
  college?: string;
  branch?: string;
  year?: string;
  cgpa?: string;
  goal?: string;
  avatar?: string;

  skills?: string[];
  interests?: string[];
};

function getInitials(name: string) {
  const cleanName = name.trim();

  if (!cleanName) {
    return "U";
  }

  const parts = cleanName.split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (
    parts[0].charAt(0) +
    parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

function Profile() {
  const [form, setForm] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    college: "",
    branch: "",
    year: "",
    cgpa: "",
    goal: "",
    avatar: "",
    skills: [],
    interests: [],
  });

  /*
   * Keep these as strings while typing.
   * This is important because it allows commas to be typed normally.
   */
  const [skillsText, setSkillsText] = useState("");
  const [interestsText, setInterestsText] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =========================================
  // LOAD PROFILE
  // =========================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("acg:token");

        if (!token) {
          toast.error("Please login first");
          setLoading(false);
          return;
        }

        const profile = await request<ProfileData>(
          "get",
          "/profile"
        );

        const loadedSkills = Array.isArray(profile.skills)
          ? profile.skills
          : [];

        const loadedInterests = Array.isArray(profile.interests)
          ? profile.interests
          : [];

        setForm({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          college: profile.college || "",
          branch: profile.branch || "",
          year: profile.year || "",
          cgpa: profile.cgpa || "",
          goal: profile.goal || "",
          avatar: profile.avatar || "",
          skills: loadedSkills,
          interests: loadedInterests,
        });

        /*
         * Convert MongoDB arrays to display text.
         *
         * Example:
         * ["Java", "React", "SQL"]
         *
         * becomes:
         * "Java, React, SQL"
         */
        setSkillsText(loadedSkills.join(", "));
        setInterestsText(loadedInterests.join(", "));
      } catch (error) {
        console.error("Failed to load profile:", error);

        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // =========================================
  // UPDATE NORMAL FIELD
  // =========================================

  const upd = (
    key: keyof ProfileData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  // =========================================
  // CONVERT COMMA TEXT TO ARRAY
  // =========================================

  const convertToArray = (text: string) => {
    return text
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  // =========================================
  // SAVE PROFILE
  // =========================================

  const saveProfile = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSaving(true);

    try {
      /*
       * Convert the text fields to arrays ONLY when saving.
       *
       * Example:
       * "Java, React, SQL"
       *
       * becomes:
       * ["Java", "React", "SQL"]
       */

      const skills = convertToArray(skillsText);
      const interests = convertToArray(interestsText);

      const updatedProfile =
        await request<ProfileData>(
          "put",
          "/profile",
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            college: form.college,
            branch: form.branch,
            year: form.year,
            cgpa: form.cgpa,
            goal: form.goal,
            avatar: form.avatar,

            skills,
            interests,
          }
        );

      /*
       * Update local state with the response
       * from MongoDB.
       */

      const updatedSkills =
        Array.isArray(updatedProfile.skills)
          ? updatedProfile.skills
          : skills;

      const updatedInterests =
        Array.isArray(updatedProfile.interests)
          ? updatedProfile.interests
          : interests;

      setForm({
        name: updatedProfile.name || "",
        email: updatedProfile.email || "",
        phone: updatedProfile.phone || "",
        college: updatedProfile.college || "",
        branch: updatedProfile.branch || "",
        year: updatedProfile.year || "",
        cgpa: updatedProfile.cgpa || "",
        goal: updatedProfile.goal || "",
        avatar: updatedProfile.avatar || "",
        skills: updatedSkills,
        interests: updatedInterests,
      });

      /*
       * Keep the comma-separated text visible
       * after saving.
       */

      setSkillsText(updatedSkills.join(", "));
      setInterestsText(updatedInterests.join(", "));

      toast.success(
        "Profile updated successfully"
      );
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // CANCEL
  // =========================================

  const cancelChanges = () => {
    window.location.reload();
  };

  // =========================================
  // INITIALS
  // =========================================

  const initials = getInitials(
    form.name || "User"
  );

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading profile...
        </div>
      </div>
    );
  }

  // =========================================
  // PROFILE PAGE
  // =========================================

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}

      <header>
        <h1 className="font-display text-2xl font-bold">
          Profile
        </h1>

        <p className="text-muted-foreground">
          Manage your personal information.
        </p>
      </header>

      {/* PROFILE CARD */}

      <div className="rounded-2xl p-6 bg-card border border-border shadow-card">

        {/* PROFILE SUMMARY */}

        <div className="flex flex-col sm:flex-row items-center gap-5">

          {/* AVATAR */}

          <div className="relative">

            <div className="h-24 w-24 rounded-2xl bg-gradient-primary grid place-items-center text-white text-3xl font-bold">
              {initials}
            </div>

            <button
              type="button"
              onClick={() =>
                toast.info(
                  "Profile photo upload can be added next."
                )
              }
              className="absolute -bottom-2 -right-2 h-9 w-9 rounded-xl bg-card border border-border grid place-items-center shadow-card hover:bg-muted"
              aria-label="Change profile photo"
            >
              <Camera className="h-4 w-4" />
            </button>

          </div>

          {/* USER DETAILS */}

          <div className="text-center sm:text-left">

            <p className="font-display text-xl font-bold">
              {form.name || "User"}
            </p>

            <p className="text-sm text-muted-foreground">
              {form.email || "No email"}
            </p>

            <p className="text-sm mt-1">
              {[
                form.branch,
                form.year,
                form.college,
              ]
                .filter(Boolean)
                .join(" • ") ||
                "Add your education details"}
            </p>

          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={saveProfile}
          className="mt-8 grid sm:grid-cols-2 gap-4"
        >

          {/* FULL NAME */}

          <div>
            <label className="text-sm font-medium">
              Full name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                upd("name", e.target.value)
              }
              placeholder="Your full name"
              required
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* EMAIL */}

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                upd("email", e.target.value)
              }
              placeholder="your@email.com"
              required
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* PHONE */}

          <div>
            <label className="text-sm font-medium">
              Phone
            </label>

            <input
              value={form.phone || ""}
              onChange={(e) =>
                upd("phone", e.target.value)
              }
              placeholder="Phone number"
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* COLLEGE */}

          <div>
            <label className="text-sm font-medium">
              College
            </label>

            <input
              value={form.college || ""}
              onChange={(e) =>
                upd("college", e.target.value)
              }
              placeholder="College name"
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* BRANCH */}

          <div>
            <label className="text-sm font-medium">
              Branch
            </label>

            <input
              value={form.branch || ""}
              onChange={(e) =>
                upd("branch", e.target.value)
              }
              placeholder="Computer Science"
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* YEAR */}

          <div>
            <label className="text-sm font-medium">
              Year
            </label>

            <input
              value={form.year || ""}
              onChange={(e) =>
                upd("year", e.target.value)
              }
              placeholder="3rd Year"
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* CGPA */}

          <div>
            <label className="text-sm font-medium">
              CGPA
            </label>

            <input
              value={form.cgpa || ""}
              onChange={(e) =>
                upd("cgpa", e.target.value)
              }
              placeholder="8.5"
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* CAREER GOAL */}

          <div>
            <label className="text-sm font-medium">
              Career Goal
            </label>

            <input
              value={form.goal || ""}
              onChange={(e) =>
                upd("goal", e.target.value)
              }
              placeholder="Software Engineer"
              className="mt-1.5 w-full h-11 px-3 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none"
            />
          </div>

          {/* =================================
              SKILLS
          ================================== */}

          <div className="sm:col-span-2">

            <label className="text-sm font-medium">
              Skills
            </label>

            <textarea
              value={skillsText}
              onChange={(e) =>
                setSkillsText(e.target.value)
              }
              rows={3}
              placeholder="Java, React, SQL, Python, MongoDB"
              className="mt-1.5 w-full px-3 py-2 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none resize-none"
            />

            <p className="mt-1 text-xs text-muted-foreground">
              Separate each skill with a comma.
            </p>

          </div>

          {/* =================================
              INTERESTS
          ================================== */}

          <div className="sm:col-span-2">

            <label className="text-sm font-medium">
              Interests
            </label>

            <textarea
              value={interestsText}
              onChange={(e) =>
                setInterestsText(e.target.value)
              }
              rows={3}
              placeholder="AI, Web Development, Data Science"
              className="mt-1.5 w-full px-3 py-2 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary/40 outline-none resize-none"
            />

            <p className="mt-1 text-xs text-muted-foreground">
              Separate each interest with a comma.
            </p>

          </div>

          {/* BUTTONS */}

          <div className="sm:col-span-2 flex gap-3 justify-end">

            <button
              type="button"
              onClick={cancelChanges}
              className="px-5 h-11 rounded-xl border border-border hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 h-11 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow transition flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save changes
                </>
              )}

            </button>

          </div>

        </form>
      </div>
    </div>
  );
}