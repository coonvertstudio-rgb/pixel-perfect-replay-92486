import { useEffect, useMemo, useState } from "react";
import { X, Check, ChevronLeft, MessageCircle } from "lucide-react";
import { SERVICES, PERIODS, NO_PREF, fmtDate, buildBookingMessage, waLink, todayLocal } from "@/lib/salon";

import { Button } from "@/components/ui/button";
import * as DialogPrimitive from "@radix-ui/react-dialog";

type StepKey = "service" | "pro" | "prefs" | "summary";
const LABELS: Record<StepKey, string> = { service: "Serviço", pro: "Profissional", prefs: "Preferências", summary: "Resumo" };

export function BookingModal({ open, initialService, onClose }: { open: boolean; initialService: string | null; onClose: () => void }) {
  const [step, setStep] = useState<StepKey>("service");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [pro, setPro] = useState(NO_PREF);
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const [notes, setNotes] = useState("");

  const service = SERVICES.find((s) => s.id === serviceId);
  const hasPros = (service?.pros.length ?? 0) > 0;
  const steps: StepKey[] = hasPros ? ["service", "pro", "prefs", "summary"] : ["service", "prefs", "summary"];
  const idx = steps.indexOf(step);
  const next = () => { const target = steps[idx + 1]; if (target) setStep(target); };

  useEffect(() => {
    if (!open) return;
    setServiceId(initialService);
    const s = SERVICES.find((x) => x.id === initialService);
    setStep(s ? (s.pros.length ? "pro" : "prefs") : "service");
    setPro(NO_PREF); setDate(""); setPeriod(""); setNotes("");
  }, [open, initialService, onClose]);

  const message = useMemo(() => service ? buildBookingMessage({ service: service.title, pro: hasPros ? pro : null, date, period, notes }) : "", [service, hasPros, pro, date, period, notes]);
  const waUrl = waLink(message);

  if (!open) return null;
  const today = todayLocal();

  const pick = (id: string) => {
    const s = SERVICES.find((x) => x.id === id);
    if (!s) return;
    if (!s.pros.includes(pro)) setPro(NO_PREF);
    setServiceId(id);
    setStep(s.pros.length ? "pro" : "prefs");
  };

  const summary: [string, string][] = service ? [
    ["Serviço", service.title],
    ...(hasPros ? [["Profissional", pro] as [string, string]] : []),
    ["Data preferida", fmtDate(date)],
    ["Período preferido", period || "A combinar"],
    ["Valor", "Sob consulta"],
    ...(notes.trim() ? [["Observação", notes.trim()] as [string, string]] : []),
  ] : [];

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-plum/70 backdrop-blur-sm" />
      <DialogPrimitive.Content aria-describedby="booking-description" className="fixed bottom-0 left-1/2 z-50 flex max-h-[92dvh] w-full max-w-lg -translate-x-1/2 flex-col overflow-hidden rounded-t-3xl bg-card shadow-soft sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-3xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            {idx > 0 && <Button variant="ghost" onClick={() => { const previous = steps[idx - 1]; if (previous) setStep(previous); }} aria-label="Voltar" className="rounded-full p-1.5 hover:bg-muted"><ChevronLeft className="h-5 w-5" /></Button>}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">Solicitação de horário</p>
              <DialogPrimitive.Title className="font-display text-2xl">{LABELS[step]}</DialogPrimitive.Title>
            </div>
          </div>
          <Button variant="ghost" onClick={onClose} aria-label="Fechar" className="rounded-full p-2 hover:bg-muted"><X className="h-5 w-5" /></Button>
        </div>
        <DialogPrimitive.Description id="booking-description" className="px-5 pt-3 text-xs text-muted-foreground">O salão confirmará a disponibilidade pelo WhatsApp.</DialogPrimitive.Description>
        <div className="flex gap-1.5 px-5 pt-4">
          {[...steps, "wa"].map((s, i) => <div key={s} className={`h-1 flex-1 rounded-full ${i <= idx ? "bg-primary" : "bg-muted"}`} />)}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === "service" && (
            <div className="grid gap-2">
              <p className="mb-1 text-sm text-muted-foreground">Escolha o serviço. Data e período são opcionais.</p>
              {SERVICES.map((s) => (
                <Button variant="ghost" key={s.id} onClick={() => pick(s.id)} className={`flex h-auto items-center justify-start gap-3 rounded-2xl border p-2 text-left transition hover:border-primary ${serviceId === s.id ? "border-primary bg-secondary" : ""}`}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-gold"><s.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{s.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{s.category} · Valor sob consulta</p>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {step === "pro" && service && (
            <div className="grid gap-2">
              {[NO_PREF, ...service.pros].map((p) => (
                <Button variant="ghost" key={p} onClick={() => setPro(p)} className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition hover:border-primary ${pro === p ? "border-primary bg-secondary" : ""}`}>
                  <span className="font-medium">{p}</span>{pro === p && <Check className="h-4 w-4 text-primary" />}
                </Button>
              ))}
            </div>
          )}

          {step === "prefs" && service && (
            <div className="grid gap-5">
              <p className="text-sm text-muted-foreground">Para <strong className="text-foreground">{service.title}</strong>. Tudo aqui é opcional — se deixar em branco, fica “A combinar”.</p>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Data preferida <span className="text-muted-foreground">(opcional)</span></span>
                <div className="flex gap-2">
                  <input type="date" min={today} value={date} onChange={(e) => { const v = e.target.value; setDate(v && v < today ? "" : v); }} className="h-11 min-w-0 flex-1 rounded-xl border bg-background px-3" />
                  {date && <Button variant="ghost" onClick={() => setDate("")} className="rounded-xl border px-3 text-sm hover:bg-muted">Limpar</Button>}
                </div>
              </label>
              <div className="grid gap-1.5">
                <span className="text-sm font-medium">Período preferido <span className="text-muted-foreground">(opcional)</span></span>
                <div className="grid gap-2">
                  {PERIODS.map((p) => (
                    <Button variant="ghost" key={p} aria-pressed={period === p} onClick={() => setPeriod(period === p ? "" : p)} className={`rounded-xl border px-4 py-3 text-left text-sm transition hover:border-primary ${period === p ? "border-primary bg-secondary font-medium" : ""}`}>{p}</Button>
                  ))}
                </div>
              </div>
              <label className="grid gap-1.5">
                <span className="text-sm font-medium">Observação <span className="text-muted-foreground">(opcional)</span></span>
                <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ex.: tenho uma foto de referência, prefiro depois das 15h…" className="rounded-xl border bg-background p-3 text-sm" />
              </label>
            </div>
          )}

          {step === "summary" && service && (
            <div className="grid gap-4">
              <dl className="divide-y rounded-2xl border">
                {summary.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                    <dt className="text-muted-foreground">{k}</dt><dd className="break-words text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className="border-t px-5 py-4">
          {(step === "pro" || step === "prefs") && <Button variant="ghost" onClick={next} className="h-12 w-full rounded-full bg-primary font-medium text-primary-foreground hover:opacity-90">{step === "prefs" ? "Ver resumo" : "Continuar"}</Button>}
          {step === "summary" && (
            <div className="grid gap-2">
              {waUrl && <Button asChild className="h-auto min-h-12 w-full whitespace-normal rounded-full bg-brand text-center font-medium text-primary-foreground hover:opacity-90">
                <a href={waUrl} target="_blank" rel="noopener noreferrer" data-testid="wa-link"><MessageCircle className="h-5 w-5" /> Enviar pedido pelo WhatsApp</a>
              </Button>}
              <p className="text-center text-xs text-muted-foreground">{waUrl ? "O salão confirma o horário pelo WhatsApp." : "WhatsApp indisponível no momento."}</p>
            </div>
          )}
          {step === "service" && <p className="text-center text-xs text-muted-foreground">Escolha um serviço para continuar</p>}
        </div>
      </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
