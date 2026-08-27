/**
 * Decorative grid backdrop used on inner-page banners
 * (Figma node 261:24756 / 261:24578).
 */
export function BannerGrid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute top-[calc(50%+133.98px)] left-[calc(50%-54.92px)] h-[2483.954px] w-[2876.158px] -translate-x-1/2 -translate-y-1/2"
        style={{
          WebkitMaskImage: "url('/figma/services/banner-grid-mask.svg')",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskPosition: "304px 245.523px",
          WebkitMaskSize: "2377px 1825.731px",
          maskImage: "url('/figma/services/banner-grid-mask.svg')",
          maskRepeat: "no-repeat",
          maskPosition: "304px 245.523px",
          maskSize: "2377px 1825.731px",
        }}
      >
        <div className="absolute top-0 left-0 flex h-[2483.954px] w-[2876.158px] items-center justify-center">
          <div className="flex-none -rotate-90">
            <div className="relative h-[2876.158px] w-[2483.954px]">
              <div className="absolute inset-y-0 right-[-2.06%] left-0">
                <img
                  alt=""
                  src="/figma/services/banner-grid-hori.svg"
                  className="block size-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
        <img
          alt=""
          src="/figma/services/banner-grid-verti.svg"
          className="absolute top-[296.2px] left-[75.58px] block h-[1891.564px] w-[2483.954px] max-w-none"
        />
      </div>
    </div>
  );
}
