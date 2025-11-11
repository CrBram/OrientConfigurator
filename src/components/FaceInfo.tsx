const FaceInfo = () => {
  return (
    <div className="pointer-events-none z-10 max-w-[calc(100vw-3rem)] md:max-w-md">
      <h2
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2"
        style={{ color: "#2B2B2B" }}
      >
        Dial & Case
      </h2>
      <p
        className="text-sm sm:text-base md:text-lg lg:text-xl font-light"
        style={{ color: "#2B2B2B" }}
      >
        Customize your dial color and case size to match your personal style.
        Choose from elegant finishes and case thicknesses.
      </p>
    </div>
  );
};

export default FaceInfo;
