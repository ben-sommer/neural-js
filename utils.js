const hexToHsl = hex => {
    // convert HEX color to HSL
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    var HSL = new Object();
    HSL['h'] = h;
    HSL['s'] = s;
    HSL['l'] = l;
    return HSL;
};

const hslToHex = (h, s, l) => {
    // convert HSL color to HEX
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const hexToNum = hex => {
    // convert HEX color to decimal
    const raw = hex.substring(1);
    const colours = raw.match(/.{1,2}/g);
    const decimalColours = colours.map(c => parseInt(c, 16));
    return decimalColours.map(c => c/256);
};

const numToHex = nums => {
    // convert decimal color to HEX
    return "#" + nums.map(x => ("0" + (x*256).toString(16)).slice(-2)).join("")
};

const hslToNum = (h, s, l) => {
    // convert HSL color to decimal
    return hexToNum(hslToHex(h, s, l));
};

const outputAnswer = ans => {
    // return 1 if confident of true result, -1 if confident
    // of false, 0 if unsure
    return ans >= 0.6 ? 1 : ans <= 0.4 ? -1 : 0
};

const titleCase = str => {
    // converts a string to title case e.g. TeSt => Test,
    // abcDEF => Abcdef
    return str.replace(
        /\w\S*/g,
        txt => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

const outputColours = (value, net) => {
    var colourList = document.createElement('div');
    colourList.classList = "colour-list";

    // display colour range based on one HSL property
    var colourList = document.createElement('div');
    colourList.classList = "colour-list";

    var colourListLabel = document.createElement('div');
    colourListLabel.classList = "colour-list-label";
    colourListLabel.innerText = titleCase(value);

    const rangeStart = value === "hue" ? 0 : 1;
    const rangeLimit = value === "hue" ? 256 : 100;
    const rangeStep = value === "hue" ? 8 : 3.1;

    for (i=rangeStart;i<rangeLimit;i+=rangeStep) {
        var colourWrapper = document.createElement('div');

        var colourBlock = document.createElement('div');
        colourBlock.classList = "colour-block";
        const h = value === "hue" ? i : value === "saturation" ? 0 : 0;
        const s = value === "hue" ? 100 : value === "saturation" ? i : 0;
        const l = value === "lightness" ? i : 50;
        colourBlock.style.background = `hsl(${h}, ${s}%, ${l}%)`;

        var colourStatus = document.createElement('div');
        colourStatus.classList = "colour-status";
        const netAnswer = outputAnswer(net.run(hslToNum(h, s, l)));
        colourStatus.style.background = netAnswer > 0 ? "#12941d" : netAnswer < 0 ? "#ba1911" : "#ababab";

        colourWrapper.appendChild(colourBlock);
        colourWrapper.appendChild(colourStatus);
        colourList.appendChild(colourWrapper);
    };

    document.body.appendChild(colourListLabel);
    document.body.appendChild(colourList);
};

const displayColours = colours => {

    var cLikes = document.createElement('div');
    cLikes.classList = "colour-list";

    var cLabelLikes = document.createElement('div');
    cLabelLikes.classList = "colour-list-label";
    cLabelLikes.innerText = "Likes";

    colours.filter(x => x.output[0] == 1).forEach(colour => {
        var c = document.createElement('div');
        c.classList = "colour-block";
        c.style.backgroundColor = numToHex(colour.input);
        console.log(numToHex(colour.input));

        cLikes.appendChild(c);
    });

    document.body.appendChild(cLabelLikes);
    document.body.appendChild(cLikes);


    var cDislikes = document.createElement('div');
    cDislikes.classList = "colour-list";

    var cLabelDislikes = document.createElement('div');
    cLabelDislikes.classList = "colour-list-label";
    cLabelDislikes.innerText = "Dislikes";

    colours.filter(x => x.output[0] == 0).forEach(colour => {
        var c = document.createElement('div');
        c.classList = "colour-block";
        c.style.backgroundColor = numToHex(colour.input);
        console.log(numToHex(colour.input));

        cDislikes.appendChild(c);
    });

    document.body.appendChild(cLabelDislikes);
    document.body.appendChild(cDislikes);
};