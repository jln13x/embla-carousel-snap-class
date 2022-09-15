import type { CreatePluginType } from "embla-carousel/components/Plugins";
import type { EmblaCarouselType } from "embla-carousel";

const options = {
  active: true,
  breakpoints: {},
  class: "is-snap",
};

export type SnapClassType = CreatePluginType<{}, typeof options>;

type UserOptions = Partial<Pick<typeof options, "class">>;

const SnapClass = (
  userOptions?: UserOptions
): CreatePluginType<{}, typeof options> => {
  const className = userOptions?.class || options.class;
  let embla: EmblaCarouselType;

  const init = (e: EmblaCarouselType) => {
    // Move instance one level up to handle destroy
    embla = e;
    e.on("init", onInit);
    e.on("select", onSelect);
    e.on("destroy", onDestroy);
  };

  const onInit = () => {
    console.log("foo");
    const curIdx = embla.selectedScrollSnap();
    const curSnapElement = embla.slideNodes()[curIdx];

    if (curSnapElement) {
      addClass(curSnapElement);
    }
  };

  const onSelect = () => {
    const prevIdx = embla.previousScrollSnap();
    const prevSnapElement = embla.slideNodes()[prevIdx];
    const curIdx = embla.selectedScrollSnap();
    const curSnapElement = embla.slideNodes()[curIdx];

    if (prevSnapElement) {
      removeClass(prevSnapElement);
    }
    if (curSnapElement) {
      addClass(curSnapElement);
    }
  };

  const onDestroy = () => {
    embla.slideNodes().forEach((e) => removeClass(e));
  };

  const addClass = (element: HTMLElement) => element.classList.add(className);
  const removeClass = (element: HTMLElement) =>
    element.classList.remove(className);

  return {
    name: "snap-class",
    options,
    init,
    destroy: onDestroy,
  };
};

export default SnapClass;
