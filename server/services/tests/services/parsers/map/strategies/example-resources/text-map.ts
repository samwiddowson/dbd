export default `
    namespace = "dsda";
    thing // 0
    {
    x = -1.0;
    y = -58.0;
    angle = 270;
    type = 1;
    skill1 = true;
    skill2 = true;
    skill3 = true;
    skill4 = true;
    skill5 = true;
    single = true;
    coop = true;
    dm = true;
    }

    vertex // 0
    {
    x = -128.0;
    y = -128.0;
    }

    vertex // 1
    {
    x = -128.0;
    y = 0.0;
    }

    vertex // 2
    {
    x = -128.0;
    y = 128.0;
    }

    vertex // 3
    {
    x = 128.0;
    y = 128.0;
    }

    vertex // 4
    {
    x = 128.0;
    y = 0.0;
    }

    vertex // 5
    {
    x = 128.0;
    y = -256.0;
    }

    vertex // 6
    {
    x = -128.0;
    y = -256.0;
    }

    vertex // 7
    {
    x = 128.0;
    y = -128.0;
    }

    linedef // 0
    {
    v1 = 0;
    v2 = 1;
    sidefront = 0;
    blocking = true;
    }

    linedef // 1
    {
    v1 = 2;
    v2 = 3;
    sidefront = 1;
    blocking = true;
    }

    linedef // 2
    {
    v1 = 3;
    v2 = 4;
    sidefront = 2;
    blocking = true;
    }

    linedef // 3
    {
    v1 = 5;
    v2 = 6;
    sidefront = 3;
    blocking = true;
    }

    linedef // 4
    {
    v1 = 1;
    v2 = 4;
    sidefront = 4;
    sideback = 5;
    twosided = true;
    }

    linedef // 5
    {
    v1 = 1;
    v2 = 2;
    sidefront = 6;
    blocking = true;
    }

    linedef // 6
    {
    v1 = 4;
    v2 = 7;
    sidefront = 7;
    blocking = true;
    }

    linedef // 7
    {
    v1 = 6;
    v2 = 0;
    sidefront = 8;
    blocking = true;
    }

    linedef // 8
    {
    v1 = 7;
    v2 = 0;
    sidefront = 9;
    sideback = 10;
    twosided = true;
    }

    linedef // 9
    {
    v1 = 7;
    v2 = 5;
    sidefront = 11;
    blocking = true;
    }

    sidedef // 0
    {
    sector = 1;
    texturemiddle = "STARTAN2";
    }

    sidedef // 1
    {
    sector = 0;
    texturemiddle = "STARTAN3";
    }

    sidedef // 2
    {
    sector = 0;
    texturemiddle = "STARTAN2";
    }

    sidedef // 3
    {
    sector = 2;
    texturemiddle = "STARTAN2";
    }

    sidedef // 4
    {
    sector = 1;
    texturetop = "ASHWALL3";
    texturebottom = "BIGBRIK1";
    }

    sidedef // 5
    {
    sector = 0;
    }

    sidedef // 6
    {
    sector = 0;
    texturemiddle = "STARTAN2";
    offsetx_mid = 128.0;
    }

    sidedef // 7
    {
    sector = 1;
    texturemiddle = "STARTAN2";
    offsetx_mid = 128.0;
    }

    sidedef // 8
    {
    sector = 2;
    texturemiddle = "STARTAN2";
    }

    sidedef // 9
    {
    sector = 1;
    texturetop = "BIGDOOR3";
    }

    sidedef // 10
    {
    sector = 2;
    texturebottom = "BSTONE1";
    }

    sidedef // 11
    {
    sector = 2;
    texturemiddle = "STARTAN2";
    }

    sector // 0
    {
    heightfloor = 24;
    heightceiling = 96;
    texturefloor = "FLOOR0_1";
    textureceiling = "CEIL1_1";
    lightlevel = 192;
    }

    sector // 1
    {
    heightfloor = 0;
    heightceiling = 128;
    texturefloor = "FLOOR0_1";
    textureceiling = "CEIL1_1";
    lightlevel = 192;
    }

    sector // 2
    {
    heightfloor = -32;
    heightceiling = 96;
    texturefloor = "FLOOR0_1";
    textureceiling = "CEIL1_1";
    lightlevel = 192;
    }
`.replace(/\s/g, "") // strip whitespace (this will happen when extracting real data)
