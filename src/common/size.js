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
  const {sqrt, sin, cos, atan, abs, max} = Math;

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

      const hypotenuse = sqrt(keys[i].x ** 2 + keys[i].y ** 2);
      const tanAlpha = keys[i].y / keys[i].x || 0;  // sohcah[toa]
      const alpha = atan(tanAlpha);
      const absAlpha = abs(alpha);
      const beta = r * Math.PI / 180;  // rotation in gradians

      // NOTE: Evaluate x with r.
      const x = (cos(absAlpha + beta) * hypotenuse);  // soh[cah]toa
      // NOTE: Evaluate h with r (get size of rotated rectangle).
      const b = beta < 0 && beta > -90 * Math.PI / 180 ?
        abs(w * cos(beta)) + abs(h * sin(beta)) :
        max(abs(w * cos(beta)), abs(h * sin(beta)));

      // NOTE: Evaluate y with r.
      const y = (sin(absAlpha + beta) * hypotenuse);  // [soh]cahtoa
      // NOTE: Evaluate w with r (get size of rotated rectangle).
      const a = beta > 0 && beta < 90 * Math.PI / 180 ?
        abs(w * sin(beta)) + abs(h * cos(beta)) :
        max(abs(w * sin(beta)), abs(h * cos(beta)));

      // FIXME: Evaluate rx and ry.
      // const rx2x = 0.000145 * (beta / Math.PI * 180) ** 2 * rx;  // (0)..(0.25)..(1)
      // const ry2y = beta <= 45 * Math.PI / 180 ? sqrt(sin(beta) * ry) : 0;
      const rx2x = 0;
      const ry2y = ry * sin(beta);

      // const ry2x = sin(beta) * ry;
      // const rx2y = -sin(beta) * rx;
      const ry2x = 0;
      const rx2y = 0;

      console.log(ry2y);

      // if (keys[i].x + w > width) width = keys[i].x + w;
      if (x + b + ry2x + rx2x > width) width = x + b + ry2x + rx2x;
      // if (keys[i].y + h > height) height = keys[i].y + h;
      if (y + a + rx2y + ry2y > height) height = y + a + rx2y + ry2y;
    }


    return [width, height];
  } catch (err) {
    // console.warn(err);
    return [0, 0];
  }
}
