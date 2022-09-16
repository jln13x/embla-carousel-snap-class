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
    e.on("reInit", onInit);
    e.on("select", onSelect);
    e.on("destroy", onDestroy);
  };

  const getSlidesToScroll = () => {
    const slidesToScroll = embla.internalEngine().options.slidesToScroll;

    // What do we return here?
    if (slidesToScroll === "auto") return 1;

    // Clamp to total number of slides
    return Math.min(slidesToScroll, embla.slideNodes().length);
  };

  const removeClassesFromPreviousSnappedSlides = () => {
    const previousSnapIndex = embla.previousScrollSnap();
    const slidesToScroll = getSlidesToScroll();

    const slideNodes = embla.slideNodes();

    const previousSnapElements = slideNodes.slice(
      previousSnapIndex * slidesToScroll,
      previousSnapIndex * slidesToScroll + slidesToScroll
    );
    previousSnapElements.forEach((element) => removeClass(element));
  };

  const addClassesToSnappedSlides = () => {
    const slideNodes = embla.slideNodes();
    const currentSnapIndex = embla.selectedScrollSnap();
    const slidesToScroll = getSlidesToScroll();

    const currentSnapElements = slideNodes.slice(
      currentSnapIndex * slidesToScroll,
      currentSnapIndex * slidesToScroll + slidesToScroll
    );
    currentSnapElements.forEach((element) => addClass(element));
  };

  const onInit = () => {
    addClassesToSnappedSlides();
  };

  const onSelect = () => {
    removeClassesFromPreviousSnappedSlides();
    addClassesToSnappedSlides();
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
