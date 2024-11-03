import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";


export default  function createAva() {
  
  const randomSeed = Math.random().toString(36).substring(2, 15);
  
  
  const avatar = createAvatar(pixelArt, {
    seed: randomSeed,
  });

  
  const svg = avatar.toString();

  return {
    svg,randomSeed
  }
}
