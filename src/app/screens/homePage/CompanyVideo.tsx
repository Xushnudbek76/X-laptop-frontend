export default function CompanyVideo() {
  return (
    <div className="video-showcase">
      <video autoPlay loop muted playsInline className="video-showcase__media">
        <source type="video/mp4" src="video/x-laptop.mp4" />
      </video>
    </div>
  );
}
