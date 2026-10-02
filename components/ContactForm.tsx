"use client";

export function ContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert("Enquiry sent (demo)");
      }}
      className="mt-10 flex flex-col gap-6"
    >
      <h2 className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
        Enquiry
      </h2>

      <div className="grid grid-cols-1 gap-5 min-[810px]:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
            Name
          </span>
          <input
            type="text"
            required
            placeholder="Your name"
            className="rounded-[8px] border border-line bg-transparent px-3 py-2.5 text-[14px] outline-none transition-colors focus:border-ink"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
            Email
          </span>
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="rounded-[8px] border border-line bg-transparent px-3 py-2.5 text-[14px] outline-none transition-colors focus:border-ink"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
          Project type
        </span>
        <input
          type="text"
          placeholder="Identity, Digital, Editorial, etc."
          className="rounded-[8px] border border-line bg-transparent px-3 py-2.5 text-[14px] outline-none transition-colors focus:border-ink"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-[#6b6b6b]">
          Message
        </span>
        <textarea
          rows={4}
          required
          placeholder="Tell me a bit about the project, timing and budget."
          className="rounded-[8px] border border-line bg-transparent px-3 py-2.5 text-[14px] outline-none transition-colors focus:border-ink"
        />
      </label>

      <button
        type="submit"
        className="mt-2 w-fit rounded-[12px] bg-ink px-6 py-3 text-[14px] font-medium text-paper transition-transform active:scale-[0.98]"
      >
        Send enquiry
      </button>
    </form>
  );
}
