import hero from "@/assets/ss-hero.jpg";
import cilios from "@/assets/ss-cilios.jpg";
import micro from "@/assets/ss-micro.jpg";
import liso from "@/assets/ss-liso.jpg";
import coloracao from "@/assets/ss-coloracao.jpg";
import corte from "@/assets/ss-corte.jpg";
import unhas from "@/assets/ss-unhas.jpg";
import make from "@/assets/ss-make.jpg";

export const SALON = {
  name: "Studio Deluxe",
  tagline: "Beleza e cuidado para te deixar ainda mais linda",
  address: "Studio Deluxe · Estúdio demonstrativo",
  hours: "Atendimento com hora marcada",
  whatsapp: "5582991730616",
  contact: "https://convertstudio.com.br/",
  contactLabel: "Convert Studio",
  heroImg: hero,
};

export const waLink = (msg: string) => SALON.whatsapp ? `https://wa.me/${SALON.whatsapp}?text=${encodeURIComponent(msg)}` : null;

export type Category = "Olhar" | "Cabelos" | "Unhas & make";

export type Service = { id: string; title: string; short: string; category: Category; copy: string; cta: string; img: string; pros: string[] };

export const SERVICES: Service[] = [
  { id: "sobrancelhas", title: "Design de sobrancelhas", short: "SOBRANCELHAS", category: "Olhar", copy: "A especialidade da casa: desenho pensado para o formato do seu rosto.", cta: "Quero horário para sobrancelhas", img: hero, pros: [] },
  { id: "micropigmentacao", title: "Micropigmentação", short: "MICROPIGMENTAÇÃO", category: "Olhar", copy: "Procedimento de pigmentação na pele. Tire suas dúvidas com o salão antes de marcar.", cta: "Quero horário para micropigmentação", img: micro, pros: [] },
  { id: "cilios", title: "Cílios", short: "CÍLIOS", category: "Olhar", copy: "Atendimento em cílios para quem quer um olhar mais marcado.", cta: "Quero horário para cílios", img: cilios, pros: [] },
  { id: "progressiva", title: "Progressiva · Liso perfeito", short: "LISO PERFEITO", category: "Cabelos", copy: "“O liso perfeito você encontra aqui” — alisamento para fios lisos e alinhados.", cta: "Quero horário para progressiva", img: liso, pros: [] },
  { id: "coloracao", title: "Coloração & ombré hair", short: "OMBRÉ HAIR", category: "Cabelos", copy: "Mudança de cor ou degradê do escuro ao claro. O tom é combinado com você.", cta: "Quero horário para coloração", img: coloracao, pros: [] },
  { id: "corte", title: "Corte & escova", short: "CORTE & ESCOVA", category: "Cabelos", copy: "Para renovar o formato ou sair com os fios escovados e finalizados.", cta: "Quero horário para corte ou escova", img: corte, pros: [] },
  { id: "unhas", title: "Manicure & pedicure", short: "UNHAS", category: "Unhas & make", copy: "Mãos e pés cuidados, com a cor que você escolher.", cta: "Quero horário para unhas", img: unhas, pros: [] },
  { id: "make", title: "Maquiagem & penteados", short: "MAQUIAGEM", category: "Unhas & make", copy: "Produção para eventos e ocasiões especiais, da make ao penteado.", cta: "Quero horário para maquiagem", img: make, pros: [] },
];

export const CATEGORIES: ("Todos" | Category)[] = ["Todos", "Olhar", "Cabelos", "Unhas & make"];
export const PERIODS = ["Manhã (08h–12h)", "Tarde (12h–16h)", "Fim da tarde (16h–19h)"];
export const NO_PREF = "Sem preferência";

export function fmtDate(d: string) {
  if (!d) return "A combinar";
  const [y, m, dd] = d.split("-");
  return `${dd}/${m}/${y}`;
}

export function buildBookingMessage(o: { service: string; pro?: string | null; date: string; period: string; notes: string }) {
  return [
    `Pedido de demonstração — ${SALON.name}`,
    `Olá! Gostaria de solicitar um horário:`,
    ``,
    `• Serviço: ${o.service}`,
    ...(o.pro ? [`• Profissional: ${o.pro}`] : []),
    `• Data preferida: ${fmtDate(o.date)}`,
    `• Período preferido: ${o.period || "A combinar"}`,
    ...(o.notes.trim() ? [`• Observação: ${o.notes.trim()}`] : []),
    ``,
    `Aguardo a confirmação da disponibilidade.`,
  ].join("\n");
}

/** Local date (YYYY-MM-DD), avoiding UTC shift. */
export function todayLocal() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
