import { describe, expect, it } from "vitest";
import { SALON, SERVICES, buildBookingMessage, waLink } from "@/lib/salon";

describe("Demonstration booking rules", () => {
  it("routes requests only to the confirmed Convert Studio commercial number", () => {
    const url = new URL(waLink("Pedido de teste") ?? "https://invalid.example");
    expect(url.hostname).toBe("wa.me");
    expect(url.pathname).toBe("/5582991730616");
  });

  it("does not create any recipient URL without a configured number", () => {
    const original = SALON.whatsapp;
    try {
      SALON.whatsapp = "";
      expect(waLink("Pedido de teste")).toBeNull();
    } finally {
      SALON.whatsapp = original;
    }
  });

  it("keeps all eight existing services without invented professionals", () => {
    expect(SERVICES.map((service) => service.id)).toEqual([
      "sobrancelhas", "micropigmentacao", "cilios", "progressiva", "coloracao", "corte", "unhas", "make",
    ]);
    expect(SERVICES.every((service) => service.pros.length === 0)).toBe(true);
  });

  it("preserves chosen booking preferences in the outgoing request", () => {
    const message = buildBookingMessage({ service: "Cílios", date: "2026-11-10", period: "Tarde", notes: "  Depois das 15h  " });
    const url = new URL(waLink(message) ?? "https://invalid.example");
    const request = url.searchParams.get("text");
    expect(request).toContain("Cílios");
    expect(request).toContain("10/11/2026");
    expect(request).toContain("Tarde");
    expect(request).toContain("Depois das 15h");
    expect(request).not.toContain("Profissional:");
  });
});