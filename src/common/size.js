/*
                  width
|--------------------------------------|

+--------------------------------------+  ---          ---
|\ ---\     alpha                      |   |            |
| \    ---\                            |   |            |
|  \       ---\                        |   |            |
|   \  beta    ---\                    |   |            |
|    \             ---\                |   |            |
|     \                ---\            |   |            |
|      \                   ---         |   | y          |
|       \                     +--------+   |            |
|        \                    |        |   |            |
|         \                   |        |   |            | height
|          \                  |        |   |            |
+-----------\-----------------+--------+   |            |
             \                             |            |
              --\                         ---           |
             /   --\                       |            |
           /        --                     |            |
          --        /                      | a          |
            \--   /                        |            |
               \--                        ---          ---
*/

export function getSize(info, layout) {
  try {
    let width = 0;
    let height = 0;
    const keys = info.layouts[layout].layout;
    for (let i = 0; i < keys.length; i++) {
      const w = keys[i].w || 1;
      const h = keys[i].h || 1;
      const r = keys[i].r || 0;
      const rx = keys[i].rx || 0;
      const ry = keys[i].ry || 0;

      const hypotenuse = Math.sqrt(keys[i].x ** 2 + keys[i].y ** 2);
      const tanAlpha = keys[i].y / keys[i].x || 0;  // sohcah[toa]
      const alpha = Math.atan(tanAlpha);
      const absAlpha = Math.abs(alpha);
      const beta = r * Math.PI / 180;  // rotation in gradians

      // NOTE: Evaluate y with r.
      const y = Math.sin(absAlpha + beta) * hypotenuse;  // [soh]cahtoa
      // NOTE: Evaluate w with r (get size of rotated rectangle).
      const a = Math.abs(w * Math.sin(beta)) + Math.abs(h * Math.cos(beta));

      // NOTE: Evaluate x with r.
      const x = Math.cos(absAlpha + beta) * hypotenuse;  // soh[cah]toa
      // NOTE: Evaluate h with r (get size of rotated rectangle).
      const b = Math.abs(w * Math.cos(beta)) + Math.abs(h * Math.sin(beta));

      // TODO: Evaluate rx and ry.

      // if (keys[i].x + w > width) width = keys[i].x + w;
      if (x + b > width) width = x + b;
      // if (keys[i].y + h > height) height = keys[i].y + h;
      if (y + a > height) height = y + a;
    }

    return [width, height];
  } catch (err) {
    // console.warn(err);
    return [0, 0];
  }
}
