static const char norm_fg[] = "#d0c5b8";
static const char norm_bg[] = "#153739";
static const char norm_border[] = "#918980";

static const char sel_fg[] = "#d0c5b8";
static const char sel_bg[] = "#918E79";
static const char sel_border[] = "#d0c5b8";

static const char urg_fg[] = "#d0c5b8";
static const char urg_bg[] = "#738877";
static const char urg_border[] = "#738877";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
