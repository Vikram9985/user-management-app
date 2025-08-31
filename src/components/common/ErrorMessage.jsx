export default function ErrorMessage({ message }) {
if (!message) return null;
return (
<div className="banner error" role="alert">
⚠️ {message}
</div>
);
}