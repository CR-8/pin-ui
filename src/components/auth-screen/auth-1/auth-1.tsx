import React, { useState } from "react"

// ─── All configurable data lives here ────────────────────────────────────────
const AUTH_DATA = {
  left: {
    signUp: {
      heading: "Get Started\nwith Us",
      description: "Complete these easy steps to register your account.",
      steps: [
        { number: 1, text: "Sign up your account", active: true },
        { number: 2, text: "Set up your workspace", active: false },
        { number: 3, text: "Set up your profile", active: false },
      ],
    },
    signIn: {
      heading: "Welcome\nBack",
      description: "Sign in to continue where you left off.",
      steps: [
        { number: 1, text: "Sign in to your account", active: true },
        { number: 2, text: "Access your workspace", active: false },
        { number: 3, text: "Pick up where you left", active: false },
      ],
    },
    gradient: "bg-[#0A2B1C] bg-[radial-gradient(ellipse_at_65%_25%,#2D7A55_0%,#1A5C3E_35%,#0E3D27_60%,#0A2B1C_100%)]",
  },

  providers: [
    {
      name: "google",
      label: "Google",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
      ),
    },
    {
      name: "github",
      label: "Github",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
      ),
    },
  ],

  signUp: {
    heading: "Sign Up Account",
    subheading: "Enter your personal data to create your account.",
    fields: [
      { id: "firstName", label: "First Name",  type: "text",     placeholder: "eg. John" },
      { id: "lastName",  label: "Last Name",   type: "text",     placeholder: "eg. Francisco" },
      { id: "email",     label: "Email",       type: "email",    placeholder: "eg. johnfrans@gmail.com", fullWidth: true },
      { id: "password",  label: "Password",    type: "password", placeholder: "Enter your password", hint: "Must be at least 8 characters.", fullWidth: true },
    ],
    submitLabel: "Sign Up",
    footerText: "Already have an account?",
    footerLinkLabel: "Log in",
  },

  signIn: {
    heading: "Welcome Back",
    subheading: "Enter your credentials to access your account.",
    fields: [
      { id: "email",    label: "Email",    type: "email",    placeholder: "eg. johnfrans@gmail.com", fullWidth: true },
      { id: "password", label: "Password", type: "password", placeholder: "Enter your password", fullWidth: true },
    ],
    submitLabel: "Sign In",
    footerText: "Don't have an account?",
    footerLinkLabel: "Sign up",
    forgotPassword: { label: "Forgot password?", href: "#" },
  },
}
// ─────────────────────────────────────────────────────────────────────────────

type Field = { id: string; label: string; type: string; placeholder: string; hint?: string; fullWidth?: boolean }

const Providerbutton = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm border border-white/10 hover:bg-white/5 transition-colors">
    {icon}
    <span>{text}</span>
  </button>
)

const Detailbox = ({ number, text, active = false }: { number: number; text: string; active?: boolean }) => (
  <div className={`flex-1 rounded-xl p-6 flex flex-col gap-8 ${active ? "bg-white" : "bg-white/10"}`}>
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${active ? "bg-black text-white" : "bg-white/20 text-white"}`}>
      {number}
    </div>
    <span className={`text-sm font-medium leading-tight ${active ? "text-black" : "text-white/60"}`}>
      {text}
    </span>
  </div>
)

const buildFieldRows = (fields: Field[]) => {
  const rows: Field[][] = []
  let i = 0
  while (i < fields.length) {
    const curr = fields[i]
    const next = fields[i + 1]
    if (!curr.fullWidth && next && !next.fullWidth) { rows.push([curr, next]); i += 2 }
    else { rows.push([curr]); i++ }
  }
  return rows
}

const Auth_Screen_1 = () => {
  const [mode, setMode] = useState<"signUp" | "signIn">("signUp")
  const [showPassword, setShowPassword] = useState(false)

  const leftContent = AUTH_DATA.left[mode]
  const formData = AUTH_DATA[mode]
  const fieldRows = buildFieldRows(formData.fields)

  return (
    <div className="h-full w-full bg-black flex items-center justify-center overflow-hidden">
      <div className="h-full w-full flex overflow-hidden">

        {/* Left Panel */}
        <div className={`relative w-[60%] h-full ${AUTH_DATA.left.gradient} flex flex-col justify-end p-8 gap-6 pb-10 transition-all duration-500`}>
          <div className="flex items-end gap-8 py-6">
            <h1 className="text-[3.5cqw] text-white font-semibold tracking-tight leading-none w-[50%]">
              {leftContent.heading.split("\n").map((line, i, arr) => (
                <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
              ))}
            </h1>
            <p className="text-md text-white/70 max-w-[50%] leading-relaxed">{leftContent.description}</p>
          </div>
          <div className="flex gap-4">
            {leftContent.steps.map(s => <Detailbox key={s.number} number={s.number} text={s.text} active={s.active} />)}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[40%] h-full flex items-center justify-center">
          <div className="w-[75%] flex flex-col gap-5">

            <div className="text-center mb-2">
              <h2 className="text-white text-2xl font-semibold">{formData.heading}</h2>
              <p className="text-white/50 text-sm mt-1">{formData.subheading}</p>
            </div>

            <div className="flex gap-3">
              {AUTH_DATA.providers.map(p => <Providerbutton key={p.name} icon={p.icon} text={p.label} />)}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/40 text-sm">Or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {fieldRows.map((row, ri) => (
              <div key={ri} className="flex gap-3">
                {row.map(field => (
                  <div key={field.id} className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <label className="text-white/70 text-xs">{field.label}</label>
                      {field.type === "password" && mode === "signIn" && (AUTH_DATA.signIn as typeof AUTH_DATA.signIn & { forgotPassword?: { label: string; href: string } }).forgotPassword && (
                        <a href={(AUTH_DATA.signIn as typeof AUTH_DATA.signIn & { forgotPassword?: { label: string; href: string } }).forgotPassword!.href} className="text-white/40 text-xs hover:text-white/70 transition-colors">
                          {(AUTH_DATA.signIn as typeof AUTH_DATA.signIn & { forgotPassword?: { label: string; href: string } }).forgotPassword!.label}
                        </a>
                      )}
                    </div>
                    {field.type === "password" ? (
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder={field.placeholder}
                          className="w-full bg-[#1E1E1E] text-white text-sm rounded-lg px-3 py-2.5 outline-none placeholder:text-white/20 border border-transparent focus:border-white/20"
                        />
                        <button onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                          <span className="material-icons text-[18px]">{showPassword ? "visibility" : "visibility_off"}</span>
                        </button>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        className="bg-[#1E1E1E] text-white text-sm rounded-lg px-3 py-2.5 outline-none placeholder:text-white/20 border border-transparent focus:border-white/20"
                      />
                    )}
                    {field.hint && <span className="text-white/30 text-xs mt-0.5">{field.hint}</span>}
                  </div>
                ))}
              </div>
            ))}

            <button className="w-full bg-white text-black font-semibold text-sm rounded-lg py-2.5 hover:bg-white/90 transition-colors">
              {formData.submitLabel}
            </button>

            <p className="text-center text-white/40 text-sm">
              {formData.footerText}{" "}
              <button
                onClick={() => { setMode(mode === "signUp" ? "signIn" : "signUp"); setShowPassword(false) }}
                className="text-white font-semibold hover:underline"
              >
                {formData.footerLinkLabel}
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth_Screen_1
