const ShortsCard = ({ data, isVisible }) => {
  return (
    <div className="w-86 h-150 mr-4 rounded-xl overflow-hidden shadow-md mb-6">
      {isVisible ? (
        <iframe
          width="340px"
          height="600px"
          src={`https://www.youtube.com/embed/${data.id}?autoplay=1&controls=0&rel=0&showinfo=0`}
          title="YouTube Shorts"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl"
        ></iframe>
      ) : (
        <img
          src={`https://img.youtube.com/vi/${data.id}/hqdefault.jpg`}
          alt="Short Thumbnail"
          className="w-[340px] h-full object-cover"
        />
      )}
    </div>
  );
};

export default ShortsCard;
