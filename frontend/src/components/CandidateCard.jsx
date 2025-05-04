export default function CandidateCard({ candidate, onStatusChange, onClick, onDelete }) {
  const isPreviewable = candidate.resumeUrl && candidate.resumeUrl.match(/\.(pdf|docx?|txt)$/i);

  return (
    <div
      className="border rounded-lg p-4 bg-white shadow-md mb-4 flex justify-between items-start"
    >
      <div>
        <h2 className="text-xl font-semibold">{candidate.name}</h2>
        <p className="text-gray-600">{candidate.jobTitle}</p>
        <p className="text-sm text-blue-600">{candidate.status}</p>

        {isPreviewable ? (
          <a
            href={candidate.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            View Resume
          </a>
        ) : (
          <p className="text-gray-500 text-sm">No preview available</p>
        )}
      </div>

      <div className="flex flex-col items-end space-y-2">
        <button
          className="text-red-500 text-sm hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(candidate._id);
          }}
        >
          Delete
        </button>
        <select
          value={candidate.status}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            onStatusChange(candidate._id, e.target.value);
          }}
          className="border px-2 py-1 rounded"
        >
          <option>Pending</option>
          <option>Reviewed</option>
          <option>Hired</option>
        </select>
      </div>
    </div>
  );
}
