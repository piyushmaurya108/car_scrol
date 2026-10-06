/**
 * Two nested elements on purpose:
 *  - outer [data-car]       → moved by scroll (translateX)
 *  - inner [data-car-inner] → used by the intro animation (opacity / scale)
 * Keeping them separate stops the two animations fighting over `transform`.
 */
export default function Car() {
  return (
    <div
      data-car
      className="absolute left-0 top-0 h-full w-[var(--car-w)] will-change-transform"
    >
      <div data-car-inner className="h-full w-full origin-left">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/car.svg"
          alt="Orange sports car, top view"
          draggable={false}
          className="h-full w-full select-none"
        />
      </div>
    </div>
  );
}
