const ShortsCard = ({ data, isVisible,isMobile }) => {
  return (
    <div className="  h-full mr-4  overflow-hidden mb-6 w-full">
      {isVisible ? (
        <iframe
          src={`https://www.youtube.com/embed/${data.id}?autoplay=1&controls=0&rel=0&showinfo=0&mute=1`}
          title="YouTube Shorts"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={` h-full ${
            isMobile ? "w-full" : " aspect-[10/18] rounded-xl"
          }`}
        ></iframe>
      ) : (
        <img
          src={`https://img.youtube.com/vi/${data.id}/hqdefault.jpg`}
          alt="Short Thumbnail"
          className={`object-cover h-full  ${
            isMobile ? "w-screen" : " aspect-[10/18] rounded-xl"
          }`}
        />
      )}
    </div>
  );
};

export default ShortsCard;
