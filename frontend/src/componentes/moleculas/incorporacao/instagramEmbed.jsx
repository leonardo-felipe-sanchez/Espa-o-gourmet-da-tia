import React, { useEffect } from 'react';

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    // 1. Garante que o script do Instagram existe na página
    if (!document.getElementById('instagram-embed-script')) {
      const script = document.createElement('script');
      script.id = 'instagram-embed-script';
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // 2. Função para processar o embed
    const process = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    // Tenta processar após um curto tempo para o DOM renderizar
    const timer = setTimeout(process, 200);

    return () => clearTimeout(timer);
  }, [url]);

  // Este é o HTML que você copiou, mas sem a tag <script> interna
  const instagramHTML = `
    <blockquote class="instagram-media" 
      data-instgrm-captioned 
      data-instgrm-permalink="${url}" 
      data-instgrm-version="14" 
      style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <div style="padding:16px;">
        <a href="${url}" target="_blank" style="text-decoration:none; color:#f0f0f0;">
          <center>Visualizar post no Instagram</center>
        </a>
      </div>
    </blockquote>
  `;

  return (
    <div 
      className='p-5 w-50 flex justify-center items-center h-[90vh]'
      dangerouslySetInnerHTML={{ __html: instagramHTML }} 
    />
  );
};

export default InstagramEmbed;