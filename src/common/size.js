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
|      \                   ---         |   | ySpan      |
|       \                     +--------+   |            |
|        \                    |        |   |            |
|         \                   |        |   |            | height
|          \                  |        |   |            |
+-----------\-----------------+--------+   |            |
             \                             |            |
              --\                         ---           |
             /   --\                       |            |
           /        --                     |            |
          --        /                      | yKeycap    |
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
      const x = keys[i].x || 0;
      const y = keys[i].y || 0;
      const r = keys[i].r || 0;
      const rx = keys[i].rx || 0;
      const ry = keys[i].ry || 0;

      const hypotenuse = sqrt(x ** 2 + y ** 2);
      const tanAlpha = y / x || 0;  // sohcah[toa]
      const alpha = atan(tanAlpha);
      const absAlpha = abs(alpha);
      const beta = r * Math.PI / 180;

      // NOTE: Evaluate x with r.
      const xSpan = (cos(absAlpha + beta) * hypotenuse);  // soh[cah]toa
      // NOTE: Evaluate h with r (get size of rotated rectangle).
      const xKeycap = beta < 0 && beta > -90 * Math.PI / 180 ?
        abs(w * cos(beta)) + abs(h * sin(beta)) :
        max(abs(w * cos(beta)), abs(h * sin(beta)));  // keycap width

      // NOTE: Evaluate y with r.
      const ySpan = (sin(absAlpha + beta) * hypotenuse);  // [soh]cahtoa
      // NOTE: Evaluate w with r (get size of rotated rectangle).
      const yKeycap = beta > 0 && beta < 90 * Math.PI / 180 ?
        abs(w * sin(beta)) + abs(h * cos(beta)) :
        max(abs(w * sin(beta)), abs(h * cos(beta)));

      // NOTE: Evaluate rx and ry.
      const hypotenuseR = sqrt((x - rx) ** 2 + (y - ry) ** 2);
      const tanAlphaR = (y - ry) / (x - rx) || 0;  // sohcah[toa]
      // Add 180 degrees to fix negative tangent.
      const alphaR = x - rx >= 0 ? atan(tanAlphaR) : Math.PI + atan(tanAlphaR);
      const x1 = cos(alphaR + beta) * hypotenuseR;  // soh[cah]toa
      const y1 = sin(alphaR + beta) * hypotenuseR;  // [soh]cahtoa
      const rxDelta = rx + x1 - xSpan;
      const ryDelta = ry + y1 - ySpan;

      if (xSpan + xKeycap + rxDelta > width) width = xSpan + xKeycap + rxDelta;
      if (ySpan + yKeycap + ryDelta > height) height = ySpan + yKeycap + ryDelta;
    }

    return [width, height];
  } catch (err) {
    // console.warn(err);
    return [0, 0];
  }
}
