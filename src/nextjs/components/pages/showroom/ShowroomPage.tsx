export default function ShowroomPage() {
  return (
    <div>
      <h1 className="text-3xl font-medium text-center p-12">
        ショールーム来店予約
      </h1>
      <iframe
        src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2ERJ8phrh2a-OKm6gh2D_3s56QxnuxseDg3zxgU7qi-9mCsz1CMxt5g2tbKXR6YtmuXTOHY69V?gv=true"
        style={{ border: "none" }}
        width="100%"
        height="600"
      />
    </div>
  );
}
