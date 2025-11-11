const CrownInfo = () => {
  return (
    <div className="pointer-events-none z-10 text-left md:text-right max-w-[calc(100vw-3rem)] md:max-w-md">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2"
        style={{ color: "#2B2B2B" }}
      >
        Crown
      </h2>
      <p
        className="text-sm sm:text-base md:text-lg lg:text-xl font-light md:ml-auto"
        style={{ color: "#2B2B2B" }}
      >
        Unique crown design that utilizes the watch's power reserve.
      </p>
    </div>
  );
};

export default CrownInfo;
