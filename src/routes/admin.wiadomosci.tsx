import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Search } from "lucide-react";
import { mockMessages, type Message } from "@/lib/admin/mockComms";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/wiadomosci")({
  component: MessagesPage,
});

function MessagesPage() {
  const [selectedId, setSelectedId] = useState<string>(mockMessages[0].id);
  const [reply, setReply] = useState("");
  const [q, setQ] = useState("");

  const filtered = mockMessages.filter((m) =>
    `${m.from} ${m.preview}`.toLowerCase().includes(q.toLowerCase()),
  );
  const selected = mockMessages.find((m) => m.id === selectedId) ?? mockMessages[0];
  const unread = mockMessages.filter((m) => m.unread).length;

  return (
    <div className="mx-auto w-full max-w-[1400px]">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-saiyan-white">Wiadomości</h2>
        <p className="mt-1 text-sm text-saiyan-white/50">
          {mockMessages.length} wątków ·{" "}
          <span className="font-bold text-energy-yellow">{unread} nieprzeczytane</span>
        </p>
      </div>

      <div className="grid h-[640px] grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-navy-mid/60 to-navy-deep md:grid-cols-[340px_1fr]">
        {/* List */}
        <aside className="flex flex-col border-b border-white/5 md:border-b-0 md:border-r">
          <div className="border-b border-white/5 p-3">
            <div className="flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-3 py-2">
              <Search className="h-4 w-4 text-saiyan-white/40" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Szukaj..."
                className="w-full bg-transparent text-sm text-saiyan-white placeholder:text-saiyan-white/40 focus:outline-none"
              />
            </div>
          </div>
          <ul className="flex-1 overflow-y-auto">
            {filtered.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(m.id)}
                  className={cn(
                    "flex w-full items-start gap-3 border-b border-white/5 p-3 text-left transition-colors hover:bg-white/[0.03]",
                    selected.id === m.id && "bg-white/[0.04]",
                  )}
                >
                  <ThreadAvatar text={m.avatar} unread={m.unread} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={cn("truncate text-sm", m.unread ? "font-bold text-saiyan-white" : "font-semibold text-saiyan-white/80")}>
                        {m.from}
                      </p>
                      <span className="shrink-0 text-[10px] text-saiyan-white/40">{m.time}</span>
                    </div>
                    <p className={cn("mt-0.5 truncate text-xs", m.unread ? "text-saiyan-white/80" : "text-saiyan-white/40")}>
                      {m.preview}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Thread */}
        <section className="flex min-w-0 flex-col">
          <header className="flex items-center justify-between border-b border-white/5 p-4">
            <div className="flex items-center gap-3">
              <ThreadAvatar text={selected.avatar} />
              <div>
                <p className="font-display text-base font-bold text-saiyan-white">{selected.from}</p>
                <p className="text-xs text-saiyan-white/50">{selected.email}</p>
              </div>
            </div>
            <span className="text-xs text-saiyan-white/40">{selected.time}</span>
          </header>

          <div className="flex-1 overflow-y-auto p-5">
            <div className="max-w-2xl rounded-2xl rounded-tl-md border border-white/5 bg-white/[0.03] p-4">
              <p className="whitespace-pre-wrap text-sm text-saiyan-white/90">{selected.body}</p>
            </div>
          </div>

          <footer className="border-t border-white/5 p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReply("");
              }}
              className="flex items-end gap-2"
            >
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder={`Odpowiedz do ${selected.from.split(" ")[0]}...`}
                rows={2}
                className="flex-1 resize-none rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-sm text-saiyan-white placeholder:text-saiyan-white/40 focus:border-energy-yellow/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!reply.trim()}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-energy-yellow px-4 font-display text-sm font-bold text-navy-deep transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,214,10,0.4)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <Send className="h-4 w-4" /> Wyślij
              </button>
            </form>
          </footer>
        </section>
      </div>
    </div>
  );
}

function ThreadAvatar({ text, unread }: { text: string; unread?: boolean }) {
  return (
    <div className="relative shrink-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-saiyan-blue to-energy-yellow/60 font-display text-xs font-bold text-navy-deep">
        {text}
      </div>
      {unread && (
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-energy-yellow ring-2 ring-navy-deep" />
      )}
    </div>
  );
}

// silence unused import warning if Message type was kept
export type _M = Message;
