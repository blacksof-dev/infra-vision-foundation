import Link from "next/link";
import Script from "next/script";

export default function TwitterPost() {
  return (
    <section>
      <div className="flex flex-col lg:flex-row justify-between  pb-3 md:pb-4">
        <div>
          <h4 className="text-black font-medium">
            Posts from @Infra_Vinayak Chatterjee
          </h4>
        </div>
        <div className="md:flex hidden  flex-row gap-3 py-3 lg:py-0 lg:justify-center lg:items-center">
          <Link
            href="https://x.com/Infra_VinayakCh/status/1773515311419191457"
            target="_blank"
          >
            <h5 className="text-pink">View more on</h5>
          </Link>
          <div>
            <svg
              className="w-7 h-7 lg:w-10 lg:h-10"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.65"
                y="0.65"
                width="40.7"
                height="40.7"
                rx="3.35"
                stroke="#C82249"
                strokeWidth="1.3"
              />
              <path
                d="M27.7201 11H31.1702L23.6327 19.4718L32.5 31H25.5569L20.1189 24.0082L13.8965 31H10.4443L18.5065 21.9385L10 11H17.1193L22.0348 17.3908L27.7201 11ZM26.5092 28.9692H28.4209L16.0805 12.9241H14.029L26.5092 28.9692Z"
                fill="#C82249"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-hidden">
        <div
          className="taggbox"
          style={{ width: "100%", height: "30rem" }}
          data-widget-id="2164217"
          data-tags="false"
        ></div>
        <Script
          src="https://widget.taggbox.com/embed-lite.min.js"
          type="text/javascript"
        />
      </div>
    </section>
  );
}
