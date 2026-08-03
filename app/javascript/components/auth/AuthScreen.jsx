import { useRef, useState } from "react";
import api from "../../lib/api";

const AuthScreen = ({ onAuthenticated }) => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("phone");
  const [error, setError] = useState(null);
  const honeypotRef = useRef(null);

  const requestOtp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post("/auth/request_otp", {
        phone_number: phone,
        website: honeypotRef.current.value,
      });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.error || "Could not send code, try again");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post("/auth/verify_otp", {
        phone_number: phone,
        code,
      });
      localStorage.setItem("dabba_token", res.data.token);
      onAuthenticated(res.data.token);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid code");
    }
  };

  return (
    <div className='min-h-screen bg-dabba-bg flex items-center justify-center px-6'>
      <div className='w-full max-w-sm'>
        <div className='text-center mb-8'>
          <div className='text-center mb-8'>
            <p className='font-mono text-[11px] tracking-widest text-dabba-teal uppercase mb-1'>
              Dabba · Local
            </p>
            <h1 className='font-display text-2xl text-dabba-text'>
              a minute to yourself
            </h1>
          </div>
          <p className='font-mono text-[11px] tracking-widest text-dabba-text/50 uppercase mb-6'>
            {step === "phone"
              ? "Ticket · Board to continue"
              : "Verify · Enter your code"}
          </p>

          <div className='ticket-card pt-6 px-7 pb-7'>
            {step === "phone" ? (
              <form onSubmit={requestOtp}>
                <label className='block text-sm text-dabba-text/75 mb-2'>
                  Mobile number
                </label>
                <div className='flex gap-2 mb-5'>
                  <div className='bg-dabba-bg rounded-lg px-3.5 py-3 font-mono text-dabba-text/60 text-sm'>
                    +91
                  </div>
                  <input
                    type='tel'
                    placeholder='98765 43210'
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                    className='flex-1 bg-dabba-bg border border-dabba-text/10 rounded-lg px-3.5 py-3 text-dabba-text text-sm focus:outline-none focus:border-dabba-amber'
                  />
                </div>
                <input
                  type='text'
                  name='website'
                  ref={honeypotRef}
                  style={{ display: "none" }}
                  tabIndex='-1'
                  autoComplete='off'
                />
                <button
                  className='w-full bg-dabba-amber text-dabba-bg font-semibold text-sm rounded-lg py-3.5'
                  type='submit'
                >
                  Send code
                </button>
                <p className='text-center text-[11px] text-dabba-text/40 mt-4'>
                  no spam, no saved contact - just this ride
                </p>
              </form>
            ) : (
              <form onSubmit={verifyOtp}>
                <label className='block text-sm text-dabba-text/75 mb-2'>
                  6-digit code
                </label>
                <input
                  type='text'
                  placeholder='482913'
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className='w-full bg-dabba-bg border border-dabba-text/10 rounded-lg px-3.5 py-3 text-dabba-text text-sm mb-5 -tracking-widest font-mono focus:outline-none focus:border-dabba-amber'
                />
                <button
                  className='w-full bg-dabba-amber text-dabba-bg font-semibold text-sm rounded-lg py-3.5'
                  type='submit'
                >
                  Verify
                </button>
              </form>
            )}
            {error && (
              <p className='text-dabba-alert text-sm text-center mt-4'>
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
