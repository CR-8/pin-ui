import React, { useState } from "react"

// ─── Design tokens ────────────────────────────────────────────────────────────
const BRAND = "#4F46E5"
const BRAND_HOVER = "#4338CA"

// Mesh gradient: 4 independent radial blobs over a deep indigo base
const MESH_GRADIENT = `
  radial-gradient(ellipse 60% 50% at 80% 10%,  #7DD3FC55 0%, transparent 70%),
  radial-gradient(ellipse 55% 60% at 20% 45%,  #6D28D9AA 0%, transparent 65%),
  radial-gradient(ellipse 50% 55% at 55% 90%,  #7C3AED88 0%, transparent 65%),
  radial-gradient(ellipse 45% 50% at 5%  85%,  #3B27CCBB 0%, transparent 60%),
  #1E1B4B
`.replace(/\n\s*/g, " ").trim()

// ─── All configurable data lives here ────────────────────────────────────────
const AUTH_DATA = {
  left: {
    logo: "*",
    tagline: "You can easily",
    heading: "Get access your personal hub for clarity and productivity",
  },

  right: {
    logo: "*",
    signUp: {
      heading: "Create an account",
      subheading: "Access your tasks, notes, and projects anytime, anywhere - and keep everything flowing in one place.",
      fields: [
        { id: "email",    label: "Your email", type: "email",    placeholder: "farazhaidet786@gmail.com", fullWidth: true },
        { id: "password", label: "Password",   type: "password", placeholder: "••••••••••",               fullWidth: true },
      ],
      submitLabel: "Get Started",
      footerText: "Already have an account?",
      footerLinkLabel: "Sign in",
    },
    signIn: {
      heading: "Welcome back",
      subheading: "Sign in to your personal hub and pick up right where you left off.",
      fields: [
        { id: "email",    label: "Your email", type: "email",    placeholder: "farazhaidet786@gmail.com", fullWidth: true },
        { id: "password", label: "Password",   type: "password", placeholder: "••••••••••",               fullWidth: true },
      ],
      submitLabel: "Sign In",
      footerText: "Don't have an account?",
      footerLinkLabel: "Sign up",
      forgotPassword: { label: "Forgot password?", href: "#" },
    },
    providers: [
      {
        name: "behance",
        label: "Bēhance",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1769FF">
            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.202.836 1.87 1.853 1.87.826 0 1.347-.4 1.605-1.04l2.298.199zM15.973 13h4.823c-.092-1.1-.832-1.84-2.318-1.84-1.366 0-2.275.737-2.505 1.84zM8.516 11.5c.963-.404 1.484-1.035 1.484-2.139C10 7.57 8.796 7 7.008 7H2v10h5.26c1.918 0 3.24-.87 3.24-2.73 0-1.218-.618-2.27-1.984-2.77zM4 9h2.7c.799 0 1.3.3 1.3 1.05 0 .7-.45 1.05-1.3 1.05H4V9zm3.109 6H4v-2.25h3.109c.9 0 1.391.45 1.391 1.125S7.909 15 7.109 15z"/>
          </svg>
        ),
      },
      {
        name: "google",
        label: "Google",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
        ),
      },
      {
        name: "facebook",
        label: "Facebook",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        ),
      },
    ],
  },
}


type Field = { id: string; label: string; type: string; placeholder: string; fullWidth?: boolean }
type SignInForm = typeof AUTH_DATA.right.signIn & { forgotPassword?: { label: string; href: string } }

const ProviderButton = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700 shadow-sm">
    {icon}
    <span>{label}</span>
  </button>
)

const Auth_Screen_2 = () => {
  const [mode, setMode] = useState<"signUp" | "signIn">("signUp")
  const [showPassword, setShowPassword] = useState(false)

  const { left, right } = AUTH_DATA
  const form = right[mode]
  const signInForm = right.signIn as SignInForm

  const switchMode = () => { setMode(m => m === "signUp" ? "signIn" : "signUp"); setShowPassword(false) }

  return (
    <div className="h-full w-full bg-[#F9FAFB] flex items-center justify-center">
      <div className="h-full w-full flex rounded-2xl overflow-hidden shadow-2xl">

        {/* Left Panel — mesh gradient */}
        <div
          className="w-[45%] h-full flex flex-col justify-between p-10"
          style={{ background: MESH_GRADIENT }}
        >
          {/* Top asterisk logo */}
          <span className="text-white text-5xl font-bold leading-none select-none">{left.logo}</span>

          {/* Bottom copy */}
          <div className="flex flex-col gap-3">
            <p className="text-white/70 text-sm font-medium tracking-wide">{left.tagline}</p>
            <h2 className="text-white text-[1.75rem] font-bold leading-snug">{left.heading}</h2>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[60%] h-full bg-white flex items-center justify-center">
          <div className="w-[60%] flex flex-col leading-none justify-center gap-8 h-full">

            {/* Heading block */}
            <div className="flex flex-col gap-2">
              <h2 className="text-gray-900 text-[1.6rem] font-bold leading-tight">{form.heading}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{form.subheading}</p>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-5">
              {(form.fields as Field[]).map(field => (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700 text-sm font-semibold">{field.label}</label>
                    {field.type === "password" && mode === "signIn" && signInForm.forgotPassword && (
                      <a href={signInForm.forgotPassword.href} className="text-xs hover:underline" style={{ color: BRAND }}>
                        {signInForm.forgotPassword.label}
                      </a>
                    )}
                  </div>
                  {field.type === "password" ? (
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder={field.placeholder}
                        className="w-full bg-[#F3F4F6] rounded-xl px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 border border-transparent focus:border-[#4F46E5] focus:bg-white transition-all"
                      />
                      <button
                        onClick={() => setShowPassword(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <span className="material-icons text-[18px]">{showPassword ? "visibility" : "visibility_off"}</span>
                      </button>
                    </div>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="bg-[#F3F4F6] rounded-xl px-4 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 border border-transparent focus:border-[#4F46E5] focus:bg-white transition-all"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              className="w-full text-white font-semibold text-sm rounded-xl py-3 transition-colors"
              style={{ backgroundColor: BRAND }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = BRAND_HOVER)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = BRAND)}
            >
              {form.submitLabel}
            </button>

            {/* Or continue with */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 text-xs font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Provider buttons */}
            <div className="flex gap-3">
              {right.providers.map(p => <ProviderButton key={p.name} icon={p.icon} label={p.label} />)}
            </div>

            {/* Footer */}
            <p className="text-center text-gray-400 text-sm">
              {form.footerText}{" "}
              <button onClick={switchMode} className="font-semibold hover:underline" style={{ color: BRAND }}>
                {form.footerLinkLabel}
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth_Screen_2
