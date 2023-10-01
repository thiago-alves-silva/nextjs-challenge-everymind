"use client";
import { useEffect } from "react";

interface VLibrasProps {
  forceOnload: boolean;
}

const VLibras = (props: VLibrasProps) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      new window.VLibras.Widget("https://vlibras.gov.br/app");
      if (props.forceOnload) {
        // @ts-ignore
        window.onload();
        console.log("[VLibras] Iniciado");
      }
    };
    document.head.appendChild(script);
  }, [props.forceOnload]);

  return (
    /* @ts-ignore */
    <div vw="true" className="enabled">
      <div vw-access-button="true" className="active" />
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
};

export default VLibras;
