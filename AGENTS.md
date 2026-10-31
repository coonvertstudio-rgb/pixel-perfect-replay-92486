<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep salon identity and contact configuration in `src/lib/salon.ts`; all booking destinations must use its nullable WhatsApp URL helper so an unconfigured demo cannot send requests to third parties.
- Use existing Radix dialog primitives for demonstration dialogs and the booking modal to provide focus containment, Escape handling, and focus restoration without changing the approved layout.
