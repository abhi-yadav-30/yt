const ShortsCard = ({ data, isVisible }) => {
  return (
    <div className=" aspect-video h-full mr-4 rounded-xl overflow-hidden mb-6 w-full">
      {isVisible ? (
        <iframe
          src={`https://www.youtube.com/embed/${data.id}?autoplay=1&controls=0&rel=0&showinfo=0`}
          title="YouTube Shorts"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-xl h-full aspect-[10/18]"
        ></iframe>
      ) : (
        <img
          src={`https://img.youtube.com/vi/${data.id}/hqdefault.jpg`}
          alt="Short Thumbnail"
          className=" object-cover h-full aspect-[10/18]"
        />
      )}
    </div>
  );
};

export default ShortsCard;
