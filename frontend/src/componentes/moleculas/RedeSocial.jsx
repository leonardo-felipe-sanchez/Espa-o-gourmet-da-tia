import InstagramEmbed from './incorporacao/instagramEmbed';

export const RedeSocial = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {/* Use seu próprio componente InstagramEmbed aqui */}
      <InstagramEmbed url="https://www.instagram.com/p/DRnituklHGq/"/>
    </div>
  );
};
