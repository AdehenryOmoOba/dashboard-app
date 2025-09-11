"use client";

import { useEffect } from 'react';

export default function HideNextBadge() {
  useEffect(() => {
    const tryRemove = () => {
      const portal = document.querySelector('nextjs-portal') as HTMLElement & {
        shadowRoot?: ShadowRoot | null;
      };
      if (!portal || !portal.shadowRoot) return;

      const removeFromShadow = () => {
        const root = portal.shadowRoot!;
        const targets = root.querySelectorAll(
          '[data-nextjs-toast], [data-next-badge-root], [data-next-badge]'
        );
        targets.forEach((el) => el.remove());
      };

      // Initial removal
      removeFromShadow();

      // Observe for re-insertion while in dev
      const observer = new MutationObserver(() => removeFromShadow());
      observer.observe(portal.shadowRoot, { childList: true, subtree: true });

      return () => observer.disconnect();
    };

    const cleanup = tryRemove();

    // In case the portal mounts later, poll briefly
    const interval = window.setInterval(() => {
      if (document.querySelector('nextjs-portal')) {
        const c = tryRemove();
        if (c) {
          window.clearInterval(interval);
        }
      }
    }, 300);

    return () => {
      if (cleanup) (cleanup as unknown as () => void)();
      window.clearInterval(interval);
    };
  }, []);

  return null;
}


