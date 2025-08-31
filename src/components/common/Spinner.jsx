export default function Spinner() {
return (
<div role="status" aria-live="polite" aria-busy="true" style={{ padding: '16px' }}>
<div className="card" style={{ textAlign: 'center' }}>Loading…</div>
</div>
);
}