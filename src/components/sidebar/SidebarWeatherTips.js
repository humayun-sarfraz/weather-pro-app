const TIPS = [
  "Stay hydrated during heatwaves.",
  "Bring an umbrella if rain is expected.",
  "Check pollen count if you have allergies.",
  "Protect pets from extreme weather.",
];

export default function SidebarWeatherTips() {
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
  return (
    <section>
      <h6 className="sidebar-heading">Weather Tip</h6>
      <div className="alert alert-info p-2 small mb-0">{tip}</div>
    </section>
  );
}
