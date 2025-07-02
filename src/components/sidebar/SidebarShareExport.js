export default function SidebarShareExport({ city, weather }) {
  const handleShare = () => {
    const txt = `Weather in ${city}: ${weather?.main?.temp}°, ${weather?.weather?.[0]?.description || ''}`;
    if (navigator.share) {
      navigator.share({ title: 'Weather Update', text: txt });
    } else {
      navigator.clipboard.writeText(txt);
      alert('Weather copied!');
    }
  };
  return (
    <section>
      <button className="btn btn-outline-success btn-sm w-100" onClick={handleShare}>
        📤 Share Weather
      </button>
    </section>
  );
}
