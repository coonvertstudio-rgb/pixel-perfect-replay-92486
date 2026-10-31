import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { ArrowRight, MapPin, Clock, Star, ChevronDown, Menu, X, MessageCircle, Instagram, Phone } from "lucide-react";
import { SALON, SERVICES, CATEGORIES, MARQUEE, waLink } from "@/lib/salon";
import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import before from "@/assets/hair-before.png";
import after from "@/assets/hair-after.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Império da Beleza by Aline Garrido — Mechas e loiros no Riacho Fundo I" },
      { name: "description", content: "Salão Império da Beleza by Aline Garrido, no Riacho Fundo I (DF): mechas, descoloração saudável, coloração, progressiva, hidratação e micropigmentação labial." },
      { property: "og:title", content: "Império da Beleza by Aline Garrido" },
      { property: "og:description", content: "Sua melhor versão começa aqui. Mechas, loiros e lábios no Riacho Fundo I, Brasília/DF." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [["Serviços", "#servicos"], ["Resultados", "#resultados"], ["Avaliações", "#avaliacoes"], ["Dúvidas", "#faq"]];

function Index() {
  const [modal, setModal] = useState<{ open: boolean; service: string | null }>({ open: false, service: null });
  const book = (service: string | null = null) => setModal({ open: true, service });
  const close = useCallback(() => setModal({ open: false, service: null }), []);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header onBook={() => book()} />
      <Hero onBook={() => book()} />
      <ServiceMarquee />
      <Services onBook={book} />
      <BeforeAfter />
      <Reviews />
      <GoogleReview />
      <Faq />
      <Footer />
      <BookingModal open={modal.open} initialService={modal.service} onClose={close} />
    </div>
  );
}

function Logo() {
  return (
    <a href="#" className="leading-none">
      <span className="block whitespace-nowrap font-script text-3xl leading-none sm:text-4xl">Império <span className="text-brand">da Beleza</span></span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] whitespace-nowrap text-muted-foreground">by Aline Garrido</span>
    </a>
  );
}

function Header({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="text-muted-foreground transition hover:text-primary">{l}</a>)}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={onBook} className="whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:px-5"><span className="sm:hidden">Agendar</span><span className="hidden sm:inline">Solicitar horário</span></button>
          <button className="rounded-full p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open && (
        <nav className="grid border-t px-5 py-2 md:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-sm">{l}</a>)}
        </nav>
      )}
    </header>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blush blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-6 px-5 pb-10 pt-5 md:grid-cols-[1.1fr_1fr] md:gap-10 md:py-20">
        <div className="relative mx-auto w-full max-w-sm md:order-2 md:max-w-md">
          <div className="absolute -inset-2 rotate-2 rounded-[2.2rem] bg-brand opacity-90 md:-inset-3 md:rotate-3" />
          <img src={SALON.heroImg} alt="Cliente com mechas loiras iluminadas feitas no Império da Beleza" width={640} height={640} fetchPriority="high" className="relative aspect-[5/4] w-full rounded-[2.2rem] object-cover object-[50%_30%] shadow-soft md:aspect-[4/5]" />
          <div className="absolute -bottom-4 left-4 rounded-2xl bg-card px-4 py-2.5 shadow-soft">
            <p className="font-display text-base leading-tight sm:text-lg">Especialista em mechas</p>
            <p className="text-xs text-muted-foreground">e descoloração saudável</p>
          </div>
        </div>
        <div className="pt-3 md:order-1 md:pt-0">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-primary">
            <MapPin className="h-3.5 w-3.5" /> Riacho Fundo I · Brasília/DF
          </p>
          <h1 className="font-display text-[2.15rem] leading-[1.05] sm:text-6xl lg:text-7xl">
            Sua melhor versão <em className="text-brand">começa aqui.</em>
          </h1>
          <p className="mt-3 max-w-md text-base text-muted-foreground sm:text-lg">
            Mechas, loiros e lábios com atendimento humanizado da Aline Garrido e equipe.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={onBook} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition hover:opacity-90 sm:px-7 sm:py-3.5 sm:text-base">
              Solicitar horário <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#servicos" className="rounded-full border bg-card px-6 py-3 text-sm font-medium transition hover:border-primary sm:px-7 sm:py-3.5 sm:text-base">Ver serviços</a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 shrink-0 text-accent" /> {SALON.hours}</p>
        </div>
      </div>
    </section>
  );
}

function ServiceMarquee() {
  return (
    <div className="overflow-hidden border-y border-primary-foreground/25 bg-primary py-3.5 text-primary-foreground md:py-[18px]" aria-label="Serviços do Império da Beleza">
      <div className="marquee-track flex w-max font-display text-xl uppercase tracking-[0.14em] sm:text-2xl">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-7 pr-7" aria-hidden={copy === 1}>
            {MARQUEE.map((m) => (
              <span key={m} className="flex shrink-0 items-center gap-7">
                <span>{m}</span><span className="text-gold" aria-hidden="true">♛</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 max-w-xl">
      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Services({ onBook }: { onBook: (id: string) => void }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Todos");
  const list = cat === "Todos" ? SERVICES : SERVICES.filter((s) => s.category === cat);
  return (
    <section id="servicos" className="scroll-mt-20 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Nossos serviços" title={<>Dos loiros <em className="text-brand">aos lábios.</em></>} sub="Escolha o serviço e solicite seu horário pelo WhatsApp." />
        <div className="-mx-5 mb-8 flex snap-x gap-3.5 overflow-x-auto px-5 pb-2 sm:gap-4">
          {CATEGORIES.map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={`shrink-0 snap-start rounded-full border px-5 py-2.5 text-sm transition ${cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary"}`}>{c}</button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s) => (
            <article key={s.id} className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" width={896} height={1120} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-xs font-medium">{s.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.copy}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-primary">Valor sob consulta</p>
                <button onClick={() => onBook(s.id)} className="mt-3 rounded-full border border-primary px-4 py-2.5 text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">{s.cta}</button>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Também fazemos sobrancelhas, manicure e pedicure, alongamento de unhas, depilação e maquiagem.{" "}
          <Button variant="link" onClick={() => onBook("")} className="h-auto p-0 font-medium">Solicitar horário.</Button>
        </p>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <section id="resultados" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
        <SectionTitle eyebrow="Resultados" title={<>Arraste e veja <em className="text-brand">a diferença.</em></>} sub="Mechas, descoloração saudável e hidratação: loiros iluminados com fios macios e brilhantes, do jeito que você sonhou." />
        <div className="relative aspect-square w-full select-none overflow-hidden rounded-3xl shadow-soft">
          <img src={after} alt="Depois" className="absolute inset-0 h-full w-full object-cover" />
          <img src={before} alt="Antes" className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
          <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-card" style={{ left: `${pos}%` }}>
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-primary shadow-soft">⇆</div>
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-plum/80 px-3 py-1 text-xs text-plum-foreground">Antes</span>
          <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">Depois</span>
          <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Amanda Carvalho", text: "Excelente atendimento. A Aline é um amor de pessoa e a manicure Gisele fez minha unha como ninguém havia feito antes. Parabéns pelo excelente trabalho 👏🏻❤️" },
  { name: "Ana Julia Garrido", text: "Foi perfeito, fui tratada muito bem e fiquei muito linda fazem um ótimo serviço, continuem assim!!!" },
  { name: "David Silva", text: "Fui muito bem recepcionado pela Aline, no Salão Império da Beleza By Aline Garrido. Atendimento excelente e um negócio com grande potencial! Atenciosa e cordial ao nos receber." },
];

function Reviews() {
  return (
    <section id="avaliacoes" className="scroll-mt-20 bg-plum py-16 text-plum-foreground md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-gold">Avaliações no Google</p>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">O que dizem <em className="text-gold">as clientes.</em></h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-5xl">{SALON.rating}</span>
            <div>
              <div className="flex text-gold">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-xs opacity-70">{SALON.reviewCount} avaliações no Google</p>
            </div>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="flex flex-col rounded-3xl border border-plum-foreground/15 p-6">
              <div className="mb-4 flex text-gold">{[...Array(5)].map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}</div>
              <blockquote className="flex-1 font-display text-xl italic leading-snug">“{r.text}”</blockquote>
              <figcaption className="mt-5 text-sm font-medium">{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoogleReview() {
  return (
    <section className="px-5 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-3xl border bg-card px-6 py-8 text-center shadow-soft sm:flex-row sm:text-left">
        <div className="flex-1">
          <h3 className="font-display text-3xl">Já foi atendida no Império da Beleza?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Sua avaliação ajuda outras clientes a nos encontrarem.</p>
        </div>
        <Button asChild variant="outline" className="h-auto inline-flex shrink-0 items-center gap-2 rounded-full border border-primary px-6 py-3 font-medium text-primary hover:bg-primary hover:text-primary-foreground">
          <a href={SALON.reviewUrl} target="_blank" rel="noopener noreferrer"><Star className="h-4 w-4" /> Avaliar no Google</a>
        </Button>
      </div>
    </section>
  );
}

const FAQ = [
  ["Quais são os serviços principais?", "Mechas, descoloração saudável, coloração, progressiva, hidratação e micropigmentação labial. Também fazemos sobrancelhas, unhas, depilação e maquiagem."],
  ["A descoloração estraga o cabelo?", "Trabalhamos com descoloração saudável: o clareamento é planejado com cuidado para chegar ao tom desejado preservando os fios."],
  ["Quanto custa?", "O valor depende do serviço e do comprimento do cabelo. Mande sua solicitação pelo WhatsApp que a gente informa."],
  ["Como agendo e onde fica o salão?", "Clique em “Solicitar horário” e envie o pedido pelo WhatsApp. Atendemos de terça a sábado, das 9h às 19h, na QS 12 do Riacho Fundo I."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 pb-16 pt-8 md:pb-24">
      <div className="mx-auto max-w-3xl px-5">
        <SectionTitle eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="divide-y rounded-3xl border bg-card">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium">
                {q}<ChevronDown className={`h-5 w-5 shrink-0 text-primary transition ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && <p className="px-6 pb-5 text-sm text-muted-foreground">{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const wa = waLink(`Olá, ${SALON.owner}! Vim pelo site do ${SALON.name}.`);
  return (
    <footer className="border-t bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">{SALON.tagline}.</p>
        </div>
        <a href={SALON.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 text-sm hover:text-accent"><MapPin className="h-4 w-4 shrink-0 text-accent" /><span>{SALON.address}<span className="mt-1 block font-medium underline underline-offset-4">Ver no Google Maps</span></span></a>
        <div className="grid content-start gap-3 text-sm">
          <p className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-accent" />{SALON.hours}</p>
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="flex gap-3 font-medium hover:text-accent"><MessageCircle className="h-4 w-4 shrink-0 text-accent" />WhatsApp {SALON.phone}</a>}
          <p className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-accent" />{SALON.landline}</p>
        </div>
        <a href={SALON.instagram} target="_blank" rel="noopener noreferrer" className="flex h-fit gap-3 text-sm hover:text-accent"><Instagram className="h-4 w-4 shrink-0 text-accent" />{SALON.instagramHandle}</a>
      </div>
      <p className="border-t py-5 text-center text-xs text-muted-foreground">© {SALON.name} by {SALON.owner} · Riacho Fundo I, Brasília/DF</p>
    </footer>
  );
}
