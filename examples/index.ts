import Embla from "embla-carousel";
import SnapClass from "../index";

const Lorem =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam velit modi neque tempore! Repellendus magni minus ullam eligendi incidunt quaerat aliquam atque sunt. Ea quae ad in eum distinctio iste odit eius incidunt delectus repellat vel, placeat sint eaque praesentium id voluptate nobis quia blanditiis fuga iure omnis. Enim, quo. Corporis incidunt quae voluptatum officia rem in ex? Ducimus, ex.";

const emblaNode = document.querySelector<HTMLElement>(".embla");
const emblaContainer = document.querySelector<HTMLElement>(".embla__container");

if (!emblaNode) throw new Error("Embla node not found");
if (!emblaContainer) throw new Error("Embla container not found");

[...Array(5)].forEach((_, idx) => {
  const div = document.createElement("div");
  div.classList.add("embla__slide");
  div.textContent = `${idx}. ${Lorem}`;
  emblaContainer.appendChild(div);
});

Embla(
  emblaNode,
  {
    slidesToScroll: 2,
    containScroll: "trimSnaps",
    loop: true,
  },
  [SnapClass()]
);
