const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#153739", /* black   */
  [1] = "#738877", /* red     */
  [2] = "#918E79", /* green   */
  [3] = "#AC947A", /* yellow  */
  [4] = "#E08F6D", /* blue    */
  [5] = "#729481", /* magenta */
  [6] = "#A99D83", /* cyan    */
  [7] = "#d0c5b8", /* white   */

  /* 8 bright colors */
  [8]  = "#918980",  /* black   */
  [9]  = "#738877",  /* red     */
  [10] = "#918E79", /* green   */
  [11] = "#AC947A", /* yellow  */
  [12] = "#E08F6D", /* blue    */
  [13] = "#729481", /* magenta */
  [14] = "#A99D83", /* cyan    */
  [15] = "#d0c5b8", /* white   */

  /* special colors */
  [256] = "#153739", /* background */
  [257] = "#d0c5b8", /* foreground */
  [258] = "#d0c5b8",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
